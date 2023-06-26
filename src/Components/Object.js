import React, {useState, useEffect} from "react";
import "../Styles/Object.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainHeader from './MainHeader';
import CategoryHeader from './CategoryHeader';
import '../Styles/Page.css';


const Object = () => {
    const { doi } = useParams();

    const [imgUrl, setImgUrl] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [introSentence, setIntroSentence] = useState("");
    const [developerName, setDeveloperName] = useState("");
    const [developerLink, setDeveloperLink] = useState("");
    const [instructionalResourcesUrl, setInstructionalResourcesUrl] = useState(""); //download url for the instructional resources zip file
    const [fabricationGuideUrl, setFabricationGuideUrl] = useState(""); //download url for the fabrication guide zip file

    //citation fields
    const [authorsFormmated, setAuthorsFormatted] = useState("");
    const [year, setYear] = useState("");
    const [depositDate, setDepositDate] = useState("");

    let doiPieces = [];
    doiPieces.push(doi.substring(0, 2));
    doiPieces.push(doi.substring(2));
    let dataverseDoi = doiPieces[0] + "/" + doiPieces[1];
    
    useEffect(() => {
        axios.get("https://dataverse.lib.virginia.edu/api/datasets/:persistentId/?persistentId=doi:10.18130/"+ dataverseDoi)
        .then(object => {
            console.log(object.data.data.latestVersion);
            setTitle(object.data.data.latestVersion.metadataBlocks.citation.fields[0].value);
            let author = object.data.data.latestVersion.metadataBlocks.citation.fields[1].value[0].authorName.value;
            formatAuthors(author);
            let description = object.data.data.latestVersion.metadataBlocks.citation.fields[3].value[0].dsDescriptionValue.value;

            setIntroSentence(description.substring(0, description.indexOf(".")) + ".");
            setDesc(description.substring(description.indexOf(".")+1));
    
            let imgID = -1
            let instructionalID = -1
            let fabricationID = -1
            let files = object.data.data.latestVersion.files
    
            for (let i = 0; i < files.length; i++) {
                if (files[i].label.toLowerCase().slice(-3) === "png" || files[i].label.toLowerCase().slice(-3) === "jpg" || files[i].label.toLowerCase().slice(-4) === "jpeg"){
                    imgID = files[i].dataFile.id
                }
                if (files[i].label.toLowerCase().substring(0, 11) === "fabrication"){
                    fabricationID = files[i].dataFile.id
                }
                if (files[i].label.toLowerCase().substring(0, 11) === "instruction"){
                    instructionalID = files[i].dataFile.id
                }
            }
    
            setImgUrl("https://dataverse.lib.virginia.edu/api/access/datafile/" + imgID);
            setInstructionalResourcesUrl("https://dataverse.lib.virginia.edu/api/access/datafile/" + instructionalID);
            setFabricationGuideUrl("https://dataverse.lib.virginia.edu/api/access/datafile/" + fabricationID);

            //setting link to developer
            let developer = object.data.data.latestVersion.metadataBlocks.citation.fields[7].value;
            if(developer.includes("https")){
                setDeveloperName(developer.substring(0, developer.indexOf(",")));
                setDeveloperLink(developer.substring(developer.indexOf("https")));
            }
            
            let depositDate = object.data.data.latestVersion.metadataBlocks.citation.fields[9].value;
            setYear(depositDate.substring(0, 4));
            formatDepositDate(depositDate);

            
        })
        .catch((error) => console.log("Error: ", error));
    }, [])

    const formatAuthors = (author) => {
        //two authors
        if(author.includes("&")){
            let authors = [];
            authors = author.split(" & ");
            let authorLastName1 = authors[0].substring(0, authors[0].indexOf(","));
            let authorFirstInitial1 = authors[0].charAt(authorLastName1.length + 2);
            let authorLastName2 = authors[1].substring(0, authors[1].indexOf(","));
            let authorFirstInitial2 = authors[1].charAt(authorLastName2.length + 2);
            setAuthorsFormatted(authorLastName1 + ", " + authorFirstInitial1 + ". & " + authorLastName2 + ", " + authorFirstInitial2 + ".")
        }
        else {
            let authorLastName = author.substring(0, author.indexOf(","));
            let authorFirstInitial = author.charAt(authorLastName.length + 2);
            setAuthorsFormatted(authorLastName + ", " + authorFirstInitial + ".");
        }
    }

    const formatDepositDate = (depositDate) => {
        let date = depositDate.split("-");
        let year = date[0];
        let month = date[1];
        if(date[1].includes("0")){
            month = month[1];
        }
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        month = months[month - 1]
        let day = date[2];
        if(day[0] === "0"){
            day = day[1];
        }
        setDepositDate(month + " " + day + ", " + year);

    }

    return (
        <div>
            <body>
                <div class="site">
                    <MainHeader subject="home"></MainHeader>
                    <CategoryHeader></CategoryHeader>
                    <div id="page">
                        <h2>{title}</h2>
                        <br></br>
                        <div id="details">

                            <div>
                                <img id="img-single" src={imgUrl} alt="Object Thumbnail Not Found" align="left"></img>
                                {introSentence}
                                <br></br>
                                <br></br>

                                <h4> Big Idea </h4>
                                {desc}
                            </div>
                            
                            <div id="box">
                                <b>Developer</b>
                                <br></br>
                                <p class="detail"><a href={developerLink} target="_blank">{developerName}</a></p>
                                
                                <b>Subject</b>
                                <br></br>
                                <p class="detail">Subject(s)</p>
                              
                                <b>Grade Levels</b>
                                <p></p>
                                
                                <b>Download</b>
                                <ul>
                                    <li>
                                        <a href={instructionalResourcesUrl}>Instructional Resources</a>
                                    </li>
                                    <li>
                                        <a href={fabricationGuideUrl}>Fabrication Guide</a>
                                    </li>
                                </ul>

                                <p class="detail">Discuss</p>
                            </div>
                        </div>
                        
                        <div>
                            <h4> Sample Learning Goals </h4>
                                <ul>
                                    <li> Sample learning goal </li>
                                </ul>
                                
                            <h4> Citation </h4>
                                <p>{authorsFormmated} ({year}). <em>{title}</em> [Educational Object]. <em>Educational CAD Model Library</em>. Published {depositDate}. NTLS Coalition. doi:10.18130/{dataverseDoi} </p>
                        </div>
                    </div>
                </div>
            </body>
        </div>

    )
}

export default Object;