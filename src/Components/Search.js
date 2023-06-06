import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../Styles/SearchBar.css';

const Search = () => {

    const [input, setInput] = useState("");

    //TO DO: search function
    const fetchDataset = async() => {
        const serverUrl = "https://dataverse.lib.virginia.edu";
        let doi = input;
        let objUrl = serverUrl + '/api/datasets/:persistentId/?persistentId=' + doi
        const res = await fetch(
                objUrl, {
                method: "GET",
                headers: {"X-Dataverse-key": "d24255ea-8956-47c3-acf5-a75274aa68bc"}
        })
    
        const data = await res.json()
        try {
            let title = data.data.latestVersion.metadataBlocks.citation.fields[0].value
            let author = data.data.latestVersion.metadataBlocks.citation.fields[1].value[0].authorName.value
            let desc = data.data.latestVersion.metadataBlocks.citation.fields[3].value[0].dsDescriptionValue.value

            let imgID = -1
            let files = data.data.latestVersion.files

            for (let i = 0; i < files.length; i++) {
                if (files[i].label.toLowerCase().slice(-3) === "png" || files[i].label.toLowerCase().slice(-3) === "jpg" || files[i].label.toLowerCase().slice(-4) === "jpeg"){
                    imgID = files[i].dataFile.id
                }
            }

            let imgUrl = serverUrl + "/api/access/datafile/" + imgID

            let object = {imgURL: imgUrl, title: title, author: author, desc: desc}
            console.log(object)

        } catch(err) {
            console.log("The following Data had an error")
            console.log(data)
            console.log(err)
            console.log("")
        }
    }


    return (
        <div id="page">
            <div id="form">
                <input type="search" placeholder="Search" onChange={(e) => setInput(e.target.value)} value={input}/>
                <button type="submit" onClick={fetchDataset}>Search</button>
            </div>
        </div>
    )
}

export default Search;