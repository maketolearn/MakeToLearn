import React, {useState, useEffect} from "react";
import "../Styles/Object.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainHeader from './MainHeader';
import { useNavigate } from 'react-router-dom';
import CategoryHeader from './CategoryHeader';
import '../Styles/Page.css';


const Object = () => {
    const { doi } = useParams();

    const [searchTerm, setSearchTerm] = useState("");
    const [searchObjects, setSearchObjects] = useState([]);
    const [subject, setSubject] = useState("Library");

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchObjects([]);
        navigate(`/browse`, {state: searchTerm});
    }


    //metadata fields
    const [imgUrl, setImgUrl] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [introSentence, setIntroSentence] = useState("");
    const [developerName, setDeveloperName] = useState("");
    const [developerLink, setDeveloperLink] = useState("");
    const [instructionalResourcesUrl, setInstructionalResourcesUrl] = useState(""); //download url for the instructional resources zip file
    const [fabricationGuideUrl, setFabricationGuideUrl] = useState(""); //download url for the fabrication guide zip file
    const [primaryDiscipline, setPrimaryDiscipline] = useState("");
    const [secondaryDiscipline, setSecondaryDiscipline] = useState("");
    const [gradeLevels, setGradeLevels] = useState("");
    const [forumLink, setForumLink] = useState("https://forum.cadlibrary.org/");
    const [sampleLearningGoals, setSampleLearningGoals] = useState([]);
    const [hasDeveloper, setHasDeveloper] = useState(false);

    //citation fields
    const [authorsFormmated, setAuthorsFormatted] = useState("");
    const [year, setYear] = useState("");
    const [pubDate, setPubDate] = useState("");

    let doiPieces = [];
    doiPieces.push(doi.substring(0, 2));
    doiPieces.push(doi.substring(2));
    let dataverseDoi = doiPieces[0] + "/" + doiPieces[1];
    
    useEffect(() => {
        if(doi === "00000C144undefined") {
            setImgUrl("https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQI543PLIQIc4To-7vEaHXFBFHwChFBBbEOpQCI1saa02QuDiWz");
            // console.log(imgUrl);
            setTitle("Horse Evolution");
            setIntroSentence("This dataset of fossil horse teeth published on Morphosource (https://www.morphosource.org/) has been selected by Florida Museum scientists to help K12 students understand concepts related to horse evolution and climate change. ");
            setDesc("Three lessons have been developed in collaboration with science teachers that can be used with the 3D files provided.");
            setInstructionalResourcesUrl("http://www.paleoteach.org/chewing-on-change-exploring-the-evolution-of-horses-in-response-to-climate-change/");
            setDeveloperName("Center for Precollegiate Education and Training, University of Florida");
            setDeveloperLink("https://www.cpet.ufl.edu/");
            setFabricationGuideUrl("https://www.morphosource.org/projects/00000C144");
            setPrimaryDiscipline("Science -  Biology");
            setGradeLevels("10, 11, 12")
            setForumLink("https://forum.cadlibrary.org/t/horse-evolution/24");
        } else {
            axios.get("https://dataverse.lib.virginia.edu/api/datasets/:persistentId/?persistentId=doi:10.18130/"+ dataverseDoi)
            .then(object => {

                //file metadata
                let imgID = -1
                let files = object.data.data.latestVersion.files
        
                for (let i = 0; i < files.length; i++) {
                    if (files[i].label.toLowerCase().slice(-3) === "png" || files[i].label.toLowerCase().slice(-3) === "jpg" || files[i].label.toLowerCase().slice(-4) === "jpeg"){
                        imgID = files[i].dataFile.id
                    }
                }
        
                setImgUrl("https://dataverse.lib.virginia.edu/api/access/datafile/" + imgID);

                // console.log(object.data.data)

                //change the citation api response to a dictionary
                let citationBlock = object.data.data.latestVersion.metadataBlocks.citation.fields;
                let citationMetadata = {};

                for(let i = 0; i < citationBlock.length; i++){
                    let key = citationBlock[i].typeName;
                    citationMetadata[key] = citationBlock[i].value;
                }

                // console.log(citationMetadata);

                //change the educational cad api response to a dictionary
                let educationalCADBlock = object.data.data.latestVersion.metadataBlocks.educationalcad.fields;
                let educationCADMetadata = {};
                for(let i = 0; i < educationalCADBlock.length; i++){
                    let key = educationalCADBlock[i].typeName;
                    educationCADMetadata[key] = educationalCADBlock[i].value;
                }
                
                // console.log(educationCADMetadata);

                //set the citation metadata fields
                setTitle(citationMetadata["title"]);
                let author = citationMetadata["author"][0].authorName.value;
                formatAuthors(author);

                setIntroSentence(citationMetadata["dsDescription"][0].dsDescriptionValue.value);
                setDesc(citationMetadata["dsDescription"][1].dsDescriptionValue.value);

                let publicationDate = object.data.data.latestVersion.lastUpdateTime.substring(0,10);
                setYear(publicationDate.substring(0, 4));
                formatPubDate(publicationDate);

                //set the educational cad metadata fields
                //setting link to developer
                if("externalContrib" in educationCADMetadata){
                    setDeveloperName(educationCADMetadata["externalContrib"][0].externalAgency.value);
                    setDeveloperLink(educationCADMetadata["externalContrib"][0].externalIdValue.value);
                    setHasDeveloper(true);
                }
        
                //set disciplines (secondary discipline may be optional)
                setPrimaryDiscipline(educationCADMetadata['disciplines'][0].discipline.value)
                // if(educationCADMetadata["discipline"].secondaryDiscipline != null){
                //     setSecondaryDiscipline(educationCADMetadata["discipline"].secondaryDiscipline.value);
                // }
                
                //set grade levels
                let gradeLevels = educationCADMetadata["gradeLevel"];
                let gradeLevelsStr = "";
                let i;
                for(i = 0; i < gradeLevels.length - 1; i++ ){
                    gradeLevelsStr += (gradeLevels[i] + ", ");
                }
                gradeLevelsStr += gradeLevels[gradeLevels.length-1];
                setGradeLevels(gradeLevelsStr);
                
                //set sample learning goals
                setSampleLearningGoals(educationCADMetadata["sampleLearningGoals"]);

                //fabrication and learning packages
                let instructionalID = -1
                let fabricationID = -1

                for (let i = 0; i < files.length; i++) {
                    if (files[i].label.toLowerCase().substring(0, 11) === "fabrication"){
                        fabricationID = files[i].dataFile.id
                    }
                    if (files[i].label.toLowerCase().substring(0, 11) === "instruction"){
                        instructionalID = files[i].dataFile.id
                    }
                }
                setInstructionalResourcesUrl("https://dataverse.lib.virginia.edu/api/access/datafile/" + instructionalID);
                setFabricationGuideUrl("https://dataverse.lib.virginia.edu/api/access/datafile/" + fabricationID);
                
            })
            .catch((error) => console.log("Error: ", error));
        }
       
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

    const formatPubDate = (publicationDate) => {
        
        let date = publicationDate.split("-");
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
        setPubDate(month + " " + day + ", " + year);

    }

    return (
        <div>
            <body>
                <div class="site">
                <MainHeader input={searchTerm}  setInput={setSearchTerm} handleSubmit={handleSubmit} subject={subject} showFilter={false}></MainHeader>
                    <CategoryHeader subject={primaryDiscipline}></CategoryHeader>
                    <div id="page">
                        <h2>{title}</h2>
                        <br></br>
                        <div id="details">

                            <div class="desktop-object">
                                <img id="img-single" src={imgUrl} alt="Object Thumbnail Not Found" align="left"></img>
                                {introSentence}
                                <br></br>
                                <br></br>

                                <h4> Big Idea </h4>
                                {desc}
                            </div>

                            <div class="mobile-object">
                                <div class="centered"><img id="img-single" src={imgUrl} alt="Object Thumbnail Not Found" align="center"></img></div>
                                {introSentence}
                            </div>
                            
                            <div id="box">
                                {hasDeveloper && 
                                <div>
                                    <b>Developer</b>
                                <br></br>
                                <p class="detail"><a href={developerLink} target="_blank">{developerName}</a></p>
                                </div>}
                                
                                <b>Subject</b>
                                <br></br>
                                <p class="detail">{primaryDiscipline}</p>
                              
                                <b>Grade Levels</b>
                                <p class="detail"> {gradeLevels} </p>
                                
                                <b>Download</b>
                                <ul>
                                    <li>
                                        <a href={instructionalResourcesUrl}>Instructional Resources</a>
                                    </li>
                                    <li>
                                        <a href={fabricationGuideUrl}>Fabrication Guide</a>
                                    </li>
                                </ul>

                                <a class="detail" href={forumLink}>Discuss</a>
                            </div>

                            <div class="mobile-object">
                                <h4> Big Idea </h4>
                                {desc}
                            </div>

                        </div>
                        
                        <div>
                            <br />
                            <h4> Sample Learning Goals </h4>
                                <ul>
                                    {sampleLearningGoals.map((goal) => (
                                        <li> {goal} </li>
                                    ))}
                                </ul>
                                
                                
                            <h4> Citation </h4>
                                <p>{authorsFormmated} ({year}). <em>{title}</em> [Educational Object]. <em>Educational CAD Model Library</em>. Published {pubDate}. NTLS Coalition. doi:10.18130/{dataverseDoi} </p>
                        </div>
                    </div>
                </div>
            </body>
        </div>

    )
}

export default Object;