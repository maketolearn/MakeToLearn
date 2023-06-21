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
    const [instructionalResourcesUrl, setInstructionalResourcesUrl] = useState(""); //download url for the instructional resources zip file
    const [fabricationGuideUrl, setFabricationGuideUrl] = useState(""); //download url for the fabrication guide zip file

    let doiPieces = [];
    doiPieces.push(doi.substring(0, 2));
    doiPieces.push(doi.substring(2));
    let dataverseDoi = doiPieces[0] + "/" + doiPieces[1];
    
    useEffect(() => {
        axios.get("https://dataverse.lib.virginia.edu/api/datasets/:persistentId/?persistentId=doi:10.18130/"+ dataverseDoi)
        .then(object => {
            setTitle(object.data.data.latestVersion.metadataBlocks.citation.fields[0].value);
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
            
        })
        .catch((error) => console.log("Error: ", error));
    }, [])

    return (
        <div>
            <body>
                <div class="site">
                    <MainHeader></MainHeader>
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
                                <p class="detail"><a>Link to developer</a></p>
                                
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
                                <p> Citation goes here </p>
                        </div>
                    </div>
                </div>
            </body>
        </div>

    )
}

export default Object;