import React, {useState, useEffect} from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import SearchResultDisplay from './Components/SearchResultDisplay';
import FilterBar from './Components/FilterBar';
import './Styles/Page.css';
import axios from 'axios';
import CategoryBanner from './Components/CategoryBanner';
import { useParams } from 'react-router-dom';

const Subject = ({ subjectArg }) => {

  const isLibrary = (subjectArg === "library")

  const [searchTerm, setSearchTerm] = useState("");
  const [searchObjects, setSearchObjects] = useState([]);
  const [subject, setSubject] = useState(subjectArg);
  const [searchPhrase, setSearchPhrase] = useState("");
  const subjects = ['science', 'technology', 'engineering', 'mathematics']

  let imgUrl = "";
  let title = "";
  let author = "";
  let desc = "";
  let dois = [];
  let objects = [];
  let subjectCapitalized = subject.charAt(0).toUpperCase() + subject.slice(1);

  useEffect(() => {
    setSearchObjects([]);
    setSearchTerm("");
    pullAllCards();
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchObjects([]);
    setSearchPhrase("");
    searchByPhrase();
  }

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
            if(object.data.data.latestVersion.metadataBlocks.citation.fields[5].value[0].keywordValue.value === subject){
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
            else if (subject === "library") {
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

  const searchByPhrase = async() => {
    // in case of empty search, return all
    if (searchTerm === "") {
      pullAllCards();
      setSearchPhrase(searchTerm);
      return;
    }
    try {
        axios.get('https://dataverse.lib.virginia.edu/api/search?type=dataset&per_page=30&subtree=CADLibrary&q="' + searchTerm + '"')
        .then((response) => {
          if (response.data.data.count_in_response === 0) {
              objects = [];
              setSearchObjects(objects);
              searchByKeyword();
              return;
          }
          for(var i = 0; i < response.data.data.count_in_response; i += 1){
              dois.push(response.data.data.items[i].global_id);
          }
          dois.forEach(doi => {
            axios.get("https://dataverse.lib.virginia.edu/api/datasets/:persistentId/?persistentId="+ doi)
            .then(object => {
                
              if(object.data.data.latestVersion.metadataBlocks.citation.fields[5].value[0].keywordValue.value === subject){
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
              else if (subject === "library") {
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
    } catch(err) {
        console.log("The following Data had an error")
        console.log(err)
        console.log("")
    }
  }

  const searchByKeyword = async() => {
    // in case of empty search, return all
    if (searchTerm === "") {
      pullAllCards();
      setSearchPhrase(searchTerm);
      return;
    }
    try {
        axios.get('https://dataverse.lib.virginia.edu/api/search?type=dataset&per_page=30&subtree=CADLibrary&q=' + searchTerm)
        .then((response) => {
          if (response.data.data.count_in_response === 0) {
              objects = [];
              setSearchObjects(objects);
              return;
          }
          setSearchPhrase(searchTerm);
          for(var i = 0; i < response.data.data.count_in_response; i += 1){
              dois.push(response.data.data.items[i].global_id);
          }
          dois.forEach(doi => {
            axios.get("https://dataverse.lib.virginia.edu/api/datasets/:persistentId/?persistentId="+ doi)
            .then(object => {
                
              if(object.data.data.latestVersion.metadataBlocks.citation.fields[5].value[0].keywordValue.value === subject){
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
              else if (subject === "library") {
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
    } catch(err) {
        console.log("The following Data had an error")
        console.log(err)
        console.log("")
    }
  }

  const pullAllCardsByFilter = async(filters) => {
    //pull all dois
    axios.get("https://dataverse.lib.virginia.edu/api/dataverses/CADLibrary/contents")
    .then((response) => {
    for(var i = 0; i < response.data.data.length; i += 1){
        dois.push(response.data.data[i].identifier);
    }

    dois.forEach(doi => {
        axios.get("https://dataverse.lib.virginia.edu/api/datasets/:persistentId/?persistentId=doi:10.18130/"+ doi)
        .then(object => {
            if(filters.includes(object.data.data.latestVersion.metadataBlocks.citation.fields[5].value[0].keywordValue.value)){
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

  const handleFilterChange = (filters) => {
    console.log(filters);
    if(filters.length === 0){
      pullAllCards();
    }
    else {
      pullAllCardsByFilter(filters);
    }
  }

  return (
    <div>
      <body>
        <div class="site">
          <MainHeader input={searchTerm}  setInput={setSearchTerm} handleSubmit={handleSubmit} subject={subjectCapitalized}></MainHeader>
          <CategoryHeader></CategoryHeader>
          {!isLibrary && <CategoryBanner subject={subjectCapitalized}></CategoryBanner>}
          <div id="page">
            <h2>Browse {subjectCapitalized} Objects</h2>
            <div class="results">
              <FilterBar subjects={subjects} onFilterChange={(handleFilterChange)}></FilterBar>
              <SearchResultDisplay searchObjects={searchObjects} searchPhrase={searchPhrase}></SearchResultDisplay>
            </div>
          </div>
        </div>
      </body>
    </div>
    
  );
};

export default Subject;