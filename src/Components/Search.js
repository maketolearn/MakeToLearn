import React, {useState, createContext, useEffect} from 'react';
import '../Styles/SearchBar.css';
import axios from 'axios';
import ObjectCard from './ObjectCard';


const SearchResults = createContext();

const Search = (props) => {

    const [input, setInput] = useState("");
    const [placeholderText, setPlaceholderText] = useState("");
    const [searchObjects, setSearchObjects] = useState([]);

    let imgUrl = "";
    let title = "";
    let author = "";
    let desc = "";
    let doi = "";
    let dois = [];
    let objects = [];
    
    useEffect(() => {  
        pullAllCards()
        setInput("");
        setSearchObjects([]);
        setPlaceholderText("Search " + props.subject + "...")
    }, [])

    const pullAllCards = async() => {
        //pull all dois
        axios.get("https://dataverse.lib.virginia.edu/api/dataverses/CADLibrary/contents")
        .then((response) => {
        for(var i = 0; i < response.data.data.length; i += 1){
            dois.push(response.data.data[i].identifier);
        }

        dois.forEach(doi => {
            axios.get("https://dataverse.lib.virginia.edu/api/datasets/:persistentId/?persistentId=doi:10.18130/"+ doi)
            .then(object => {
                if(object.data.data.latestVersion.metadataBlocks.citation.fields[5].value[0].keywordValue.value === props.subject){
                    title = object.data.data.latestVersion.metadataBlocks.citation.fields[0].value;
                    author = object.data.data.latestVersion.metadataBlocks.citation.fields[1].value[0].authorName.value;
                    desc = object.data.data.latestVersion.metadataBlocks.citation.fields[3].value[0].dsDescriptionValue.value;

                    let imgID = -1
                    let files = object.data.data.latestVersion.files

                    for (let i = 0; i < files.length; i++) {
                        if (files[i].label.toLowerCase().slice(-3) === "png" || files[i].label.toLowerCase().slice(-3) === "jpg" || files[i].label.toLowerCase().slice(-4) === "jpeg"){
                            imgID = files[i].dataFile.id
                        }
                    }

                    imgUrl = "https://dataverse.lib.virginia.edu/api/access/datafile/" + imgID;

                    objects = [{imgUrl: imgUrl, title: title, author: author, desc: desc, doi: doi}, ...objects];
                    let sortedObjects = objects.sort((obj1, obj2) => (obj1.title > obj2.title) ? 1 : (obj1.title < obj2.title) ? -1 : 0)
                    setSearchObjects(sortedObjects);
                }
            })
            .catch((error) => console.log("Error: ", error));
        })
        })
        .catch((error) => console.log("Error: ", error))
    }

    //TO DO: search function
    const searchByTerm = async() => {
        // in case of empty search, return all
        if (input === "") {
            pullAllCards();
            return;
        }
        try {
            axios.get("https://dataverse.lib.virginia.edu/api/search?type=dataset&per_page=30&subtree=CADLibrary&q=" + input)
			.then((response) => {
                if (response.data.data.count_in_response === 0) {
                    objects = [];
                    setSearchObjects(objects);
                }
                for(var i = 0; i < response.data.data.count_in_response; i += 1){
                    dois.push(response.data.data.items[i].global_id);
                }
                dois.forEach(doi => {
                    axios.get("https://dataverse.lib.virginia.edu/api/datasets/:persistentId/?persistentId="+ doi)
                    .then(object => {
                        
                      if(object.data.data.latestVersion.metadataBlocks.citation.fields[5].value[0].keywordValue.value === props.subject){
                        title = object.data.data.latestVersion.metadataBlocks.citation.fields[0].value;
                        author = object.data.data.latestVersion.metadataBlocks.citation.fields[1].value[0].authorName.value;
                        desc = object.data.data.latestVersion.metadataBlocks.citation.fields[3].value[0].dsDescriptionValue.value;
            
                        let imgID = -1
                        let files = object.data.data.latestVersion.files
            
                        for (let i = 0; i < files.length; i++) {
                            if (files[i].label.toLowerCase().slice(-3) === "png" || files[i].label.toLowerCase().slice(-3) === "jpg" || files[i].label.toLowerCase().slice(-4) === "jpeg"){
                                imgID = files[i].dataFile.id
                            }
                        }
            
                        imgUrl = "https://dataverse.lib.virginia.edu/api/access/datafile/" + imgID;
            
                        objects = [{imgUrl: imgUrl, title: title, author: author, desc: desc, doi: doi}, ...objects];
                        let sortedObjects = objects.sort((obj1, obj2) => (obj1.title > obj2.title) ? 1 : (obj1.title < obj2.title) ? -1 : 0)
                        setSearchObjects(sortedObjects);
                        // console.log(sortedObjects);
                      }
                    })
                    .catch((error) => console.log("Error: ", error));
                  })
			})
        } catch(err) {
            console.log("The following Data had an error")
            console.log(err)
            console.log("")
        }
    }

    return (
        <div>
            <div id="page">
                <div id="form">
                    <input type="search" placeholder={placeholderText} onChange={(e) => setInput(e.target.value)} value={input}/>
                    <button type="submit" onClick={searchByTerm}>Search</button>
                </div>
            </div>
            <div class="cards" id="page">
            {searchObjects.map((object, i) => (
                <ObjectCard objImageUrl={object.imgUrl} objTitle={object.title} objAuthor={object.author} objDescription={object.desc} doi={object.doi} key={i} />
            ))}
            {searchObjects.length === 0 && 
                <p>No results found.</p>
            }
            </div>
        </div>
    )
}

export default Search;
export {SearchResults}