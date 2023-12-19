import React, {useState, useEffect} from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import CategoryBanner from './Components/CategoryBanner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import JSZip from 'jszip';
import './Styles/Page.css';
import './Styles/Submission.css'

const Submission = () => {

    const navigate = useNavigate();
  
    const [searchTerm, setSearchTerm] = useState("");
    const [searchObjects, setSearchObjects] = useState([]);
    const [subject, setSubject] = useState("Library");

    const [fabGuidePackage, setFabGuidePackage] = useState();
    const [instructResourcePackage, setInstructResourcePackage] = useState();
    const [thumbnailImage, setThumbnailImage] = useState();
    const [grades, setGrades] = useState(["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"])
    const [gradesSelected, setGradesSelected] = useState([]);

    const [doi, setDoi] = useState("");

    useEffect(() => {
      if (doi != "") {
        console.log(doi);
        uploadFiles(doi);
        // if file upload success --> submit Review
        // submitReview(doi);
      }
    }, [doi]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setSearchObjects([]);
      navigate(`/browse`, {state: searchTerm});
    }

    const replaceSpacesWithUnderscores = (string) => {
      // Use a regular expression to replace spaces with underscores
      var resultString = string.replace(/ /g, '_');
      return resultString;
    }

    function addFileToZip(fabricationZip, file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
    
        // Read the content of the file
        reader.onload = function (event) {
          // Add the file to the fabricationZip folder
          fabricationZip.file(file.name, event.target.result);
    
          // Resolve the promise once the file has been added
          resolve();
        };
    
        reader.readAsArrayBuffer(file);
      });
    }

    const handleFabGuide = (event) => {
      console.log("Handling Fab guide")
      console.log(event.target.files)
      let selectedFabFiles = event.target.files
      let folderName = "Fabrication_" + replaceSpacesWithUnderscores(document.getElementById("title").value)
      // zip the files
      var zip = new JSZip();
      var fabricationZip = zip.folder(folderName)

      // Array to store promises for each file
      var promises = [];

      // Iterate over selected files and add them to the fabricationZip folder
      for (let i = 0; i < selectedFabFiles.length; i++) {
        promises.push(addFileToZip(fabricationZip, selectedFabFiles[i]));
      }

      Promise.all(promises).then(() => {
        // Generate the main zip file
        zip.generateAsync({ type: "blob" }).then(function (mainZipContent) {
          // Create a new instance of JSZip for the nested zip
          var nestedZip = new JSZip();
      
          // Add the main zip file to the nested zip with the desired folder name
          nestedZip.file(folderName + ".zip", mainZipContent);
      
          // Generate the nested zip file
          nestedZip.generateAsync({ type: "blob" }).then(function (nestedZipContent) {
            // Call the provided callback function with the nested zip content
            setFabGuidePackage(nestedZipContent);
          });
        });
      });
    }

    const handleInstructResource = (event) => {
      // setInstructResourcePackage(event.target.files[0])
      // console.log(instructResourcePackage.name)
      console.log("Handling Instruct Resource")
      console.log(event.target.files)
      let selectedInstructionFiles = event.target.files
      let folderName = "Instruction_" + replaceSpacesWithUnderscores(document.getElementById("title").value)
      // zip the files
      var zip = new JSZip();
      var instructionZip = zip.folder(folderName)

      // Array to store promises for each file
      var promises = [];

      // Iterate over selected files and add them to the instructionZip folder
      for (let i = 0; i < selectedInstructionFiles.length; i++) {
        promises.push(addFileToZip(instructionZip, selectedInstructionFiles[i]));
      }

      Promise.all(promises).then(() => {
        // Generate the main zip file
        zip.generateAsync({ type: "blob" }).then(function (mainZipContent) {
          // Create a new instance of JSZip for the nested zip
          var nestedZip = new JSZip();
      
          // Add the main zip file to the nested zip with the desired folder name
          nestedZip.file(folderName + ".zip", mainZipContent);
      
          // Generate the nested zip file
          nestedZip.generateAsync({ type: "blob" }).then(function (nestedZipContent) {
            // Call the provided callback function with the nested zip content
            setInstructResourcePackage(nestedZipContent);
          });
        });
      });
    }

    const handleThumbnailImage = (event) => {
      setThumbnailImage(event.target.files[0])
    }

    async function createDataset() {
      const API_TOKEN = "04c00114-fb2e-4f0f-9066-bb9bf497db57";
      const SERVER_URL = 'https://dataverse.lib.virginia.edu';
      const PARENT = 'CADLibrary';

      const headers = {
        'Content-Type': 'application/json',
        'X-Dataverse-key': API_TOKEN,
      };

      // console.log(inputValues["title"])
      const discipline = document.getElementById("discipline").value;
      let curator = "";
      if (discipline === "Science") {
        curator = "Joshua Ellis";
      } else if (discipline === "Technology") {
        curator = "Elizabeth Whitewolf";
      } else if (discipline === "Engineering") {
        curator = "Ryan Novitski";
      } else if (discipline === "Mathematics") {
        curator = "Steven Greenstein";
      }

      const dataset = {
          "datasetVersion": {
            "license": {
              "name": "CC0 1.0",
              "uri": "http://creativecommons.org/publicdomain/zero/1.0",
              "iconUri": "https://licensebuttons.net/p/zero/1.0/88x31.png"
            },
            "metadataBlocks": {
              "citation": {
                "fields": [
                  {
                    "typeName": "title",
                    "typeClass": "primitive",
                    "multiple": false,
                    "value": document.getElementById("title").value
                  },
                  {
                    "typeName": "author",
                    "typeClass": "compound",
                    "multiple": true,
                    "value": [
                      {
                        "authorName": {
                          "typeName": "authorName",
                          "typeClass": "primitive",
                          "multiple": false,
                          "value": document.getElementById("authorName").value
                        },
                      }
                    ]
                  },
                  {
                    "typeName": "datasetContact",
                    "typeClass": "compound",
                    "multiple": true,
                    "value": [ 
                      { 
                        "datasetContactName": {
                          "typeClass": "primitive",
                          "multiple": false,
                          "typeName": "datasetContactName",
                          "value": document.getElementById("authorName").value
                        },
                        "datasetContactEmail": {
                          "typeName": "datasetContactEmail",
                          "typeClass": "primitive",
                          "multiple": false,
                          "value" : document.getElementById("contactEmail").value
                        },
                      }
                    ]
                  },
                  {
                    "typeName": "dsDescription",
                    "typeClass": "compound",
                    "multiple": true,
                    "value": [ 
                      {
                        "dsDescriptionValue": {
                          "typeName": "dsDescriptionValue",
                          "multiple": false,
                          "typeClass": "primitive",
                          "value":  document.getElementById("description").value
                        }
                      },
                    ]
                  },
                  {
                    "typeName": "subject",
                    "typeClass": "controlledVocabulary",
                    "multiple": true,
                    "value": ["Other"],
                  },
                  {
                    "typeName": "keyword",
                    "multiple": true,
                    "typeClass": "compound",
                    "value": [
                      {
                        "keywordValue": {
                          "typeName": "keywordValue",
                          "multiple": false,
                          "typeClass": "primitive",
                          "value": document.getElementById("keywordTerm").value
                        }
                      }
                    ]
                  },
                  {
                    "typeName": "publication",
                    "multiple": true,
                    "typeClass": "compound",
                    "value": [
                      {
                        "publicationCitation": {
                          "typeName": "publicationCitation",
                          "multiple": false,
                          "typeClass": "primitive",
                          "value": document.getElementById("citation").value
                        },
                        "publicationURL": {
                          "typeName": "publicationURL",
                          "multiple": false,
                          "typeClass": "primitive",
                          "value": document.getElementById("relatedWorkUrl").value
                        }
                      }
                    ]
                  },
                  {
                    "typeName": "productionDate",
                    "multiple": false,
                    "typeClass": "primitive",
                    "value": "2023-11-03"
                  },
                  {
                    "typeName": "contributor",
                    "multiple": true,
                    "typeClass": "compound",
                    "value": [
                      {
                        "contributorType": {
                          "typeName": "contributorType",
                          "multiple": false,
                          "typeClass": "controlledVocabulary",
                          "value": "Data Curator"
                        },
                        "contributorName": {
                          "typeName": "contributorName",
                          "multiple": false,
                          "typeClass": "primitive",
                          "value": curator // should depend on the curator
                        }
                      },
                    ]
                  },
                ],
                "displayName": "Citation Metadata"
              },
              "educationalcad":{
                "fields": [
                  {
                    "typeName": "sampleLearningGoals",
                    "multiple": true,
                    "typeClass": "primitive",
                    "value": [document.getElementById("sampleLearningGoals").value]
                  }, 
                  {
                    "typeName": "contentStandards",
                    "multiple": true,
                    "typeClass": "primitive",
                    "value": [document.getElementById("contentAlignment").value]
                  },
                  {
                    "typeName": "gradeLevel",
                    "multiple": true,
                    "typeClass": "controlledVocabulary",
                    "value": gradesSelected
                  }, 
                  {
                    "typeName": "disciplines",
                    "multiple": true,
                    "typeClass": "compound",
                    "value": [
                      {
                        "discipline": {
                          "typeName": "discipline",
                          "multiple": false,
                          "typeClass": "controlledVocabulary",
                          "value": document.getElementById("discipline").value
                        },
                      }
                    ]
                  },
                  {
                    "typeName": "CADFormat",
                    "multiple": true,
                    "typeClass": "primitive",
                    "value": [document.getElementById("cadFormat").value]
                  },
                  {
                    "typeName": "fabEquipment",
                    "multiple": true,
                    "typeClass": "primitive",
                    "value": [document.getElementById("equipment").value]
                  },
                  {
                    "typeName": "fabTime",
                    "multiple": false,
                    "typeClass": "primitive",
                    "value": document.getElementById("fabricationTime").value
                  },
                  {
                    "typeName": "assemTime",
                    "multiple": false,
                    "typeClass": "primitive",
                    "value": document.getElementById("assemblyTime").value
                  },
                  {
                    "typeName": "externalContrib",
                    "multiple": true,
                    "typeClass": "compound",
                    "value": [
                      {
                        "externalAgency": {
                          "typeName": "externalAgency",
                          "multiple": false,
                          "typeClass": "primitive",
                          "value": document.getElementById("agency").value
                        },
                        "externalIdValue": {
                          "typeName": "externalIdValue",
                          "multiple": false,
                          "typeClass": "primitive",
                          "value": document.getElementById("identifier").value
                        }
                      }
                    ]
                  },
                  {
                    "typeName": "objectType",
                    "multiple": false,
                    "typeClass": "controlledVocabulary",
                    "value": document.getElementById("objectType").value
                  },
                  {
                    "typeName": "bigIdea",
                    "multiple": false,
                    "typeClass": "primitive",
                    "value":  document.getElementById("bigIdea").value
                  },
                  {
                    "typeName": "forumLink",
                    "multiple": false,
                    "typeClass": "primitive",
                    "value": document.getElementById("discourseLink").value
                  }
                ],
                "displayName": "Educational CAD Model Metadata"
              }
            }
          }
      }

      console.log(dataset)

      const res = await axios.post(`${SERVER_URL}/api/dataverses/${PARENT}/datasets`, dataset, {
        headers: headers
      })
      .then(data => {
          console.log(data);
          const doi = data.data.data.persistentId;
          setDoi(doi);
          console.log(doi);
      })
      .catch(error => {
          console.error(error);
      });
    }

    async function checkForThread() {
      const link = document.getElementById("discourseLink").value;
      const segments = link.split('/');
      const id = segments[segments.length-1];
      console.log("id", id);

      const url = `https://forum.cadlibrary.org/t/${id}.json`;

      // Axios GET request
      axios.get(url)
        .then(response => {
          // Handle the successful response here
          if (response.data.title != null) {
            console.log("Discourse Article Title: ", response.data.title);
            const title = document.getElementById("title").value;
            if (title === response.data.title) {
              createDataset();
            } else {
              console.log("Object name doesn't match forum link object.");
            }
          }
        })
        .catch(error => {
          // Handle errors here
          console.log(error.response)
          if (error.response.status === 404) {
            console.error("Invalid Link");
          } else {
            console.error('Error fetching data:', error);
          }
        });
    }

    async function submitReview(doi) {
      const API_TOKEN = process.env.DATAVERSE_API_KEY;
      const SERVER_URL = 'https://dataverse.lib.virginia.edu';

      const headers = {
        'Content-Type': 'application/json',
        'X-Dataverse-key': API_TOKEN,
      };

      const res = await axios.post(`${SERVER_URL}/api/datasets/:persistentId/submitForReview?persistentId=${doi}`, {}, {
        headers: headers
      })
      .then(data => {
          console.log(data);
      })
      .catch(error => {
          console.error(error);
      });
    }
    
    async function uploadFiles(doi) {
      const API_TOKEN = "04c00114-fb2e-4f0f-9066-bb9bf497db57";
      const SERVER_URL = 'https://dataverse.lib.virginia.edu';
      const headers = {
        'X-Dataverse-key': API_TOKEN,
      };

      if (fabGuidePackage) {
        const formData = new FormData()
        formData.append('file', fabGuidePackage)
        formData.append('fileName', fabGuidePackage.name)

        const res = await axios.post(`${SERVER_URL}/api/datasets/:persistentId/add?persistentId=${doi}`, formData, {
          headers: headers
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
      }

      if (instructResourcePackage) {
        const formData2 = new FormData()
        formData2.append('file', instructResourcePackage)
        formData2.append('filename', instructResourcePackage.name)
        const res2 = await axios.post(`${SERVER_URL}/api/datasets/:persistentId/add?persistentId=${doi}`, formData2, {
          headers: headers
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
      }
      
      if (thumbnailImage) {
        const formData3 = new FormData()
        formData3.append('file', thumbnailImage)
        formData3.append('filename', thumbnailImage.name)
        const res3 = await axios.post(`${SERVER_URL}/api/datasets/:persistentId/add?persistentId=${doi}`, formData3, {
          headers: headers
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
      }

    }

    const tooltips = {
      "discourseLink": "A link to a thread on the CAD Library Forum that corresponds to the object.",

      "title": "The main title of the dataset.",

      "author": "The entity, e.g. a person or organization, that created the Dataset.",

      "authorName": "The author's Last Name, First Name or the name of the organization responsible for this Dataset.",

      "authorDepartment": "The UVa Department or organization (if not UVa) with which the author is affiliated.",

      "contact": "The entity, e.g. a person or organization, that users of the Dataset can contact with questions",

      "contactName": "The name of the point of contact, e.g. the person's name or the name of an organization",

      "affiliation": "The name of the entity affiliated with the point of contact, e.g. an organization's name",

      "contactEmail": "The point of contact's email address",

      "description": "A summary describing the purpose, nature, and scope of the Dataset. Can also be an abstract of the dataset, not the paper.",

      "descriptionText": "A summary describing the purpose, nature, and scope of the Dataset",

      "descriptionDate": "The date when the description was added to the Dataset. If the Dataset contains more than one description, e.g. the data producer supplied one description and the data repository supplied another, this date is used to distinguish between the descriptions",

      "bigIdea": "Description of the big idea underlying the lesson",

      "keyword": "A key term that describes an important aspect of the Dataset and information about any controlled vocabulary used",

      "keywordTerm": "A key term that describes important aspects of the Dataset",

      "controlledVocabName": "The controlled vocabulary used for the keyword term (e.g. LCSH, MeSH)",

      "controlledVocabUrl": "The URL where one can access information about the term's controlled vocabulary",

      "relatedWork": "Article in UVA Libra or published elsewhere that use the data from this dataset.",

      "citation": "The full bibliographic citation for the related publication",

      "relatedWorkIdentifierType": "The type of identifier that uniquely identifies a related publication",

      "relatedWorkIdentifier": "The identifier for a related publication",

      "relatedWorkUrl": "The URL form of the identifier entered in the Identifier field, e.g. the DOI URL if a DOI was entered in the Identifier field. Used to display what was entered in the ID Type and ID Number fields as a link. If what was entered in the Identifier field has no URL form, the URL of the publication webpage is used, e.g. a journal article webpage",

      "notes": "Additional information about the Dataset",

      "creationDate": "Date when the data collection or other materials were produced/created (NOT distributed, published or deposited).",

      "contributor": "The entity, such as a person or organization, responsible for collecting, managing, or otherwise contributing to the development of the Dataset",

      "contributionType": "Indicates the type of contribution made to the dataset",

      "contributorName": "The name of the contributor, e.g. the person's name or the name of an organization",

      "depositor": "The entity, such as a person or organization, that deposited the Dataset in the repository",

      "depositDate": "Current Date: The Date that the Dataset was deposited into THIS repository.",

      "": "",

      "": "",

      "": "",

      "sampleLearningGoals": "Describes the learning objective; e.g., The Fraction Orange manipulative is a tool for exploring the measurement meaning of division.",

      "contentAlignment": "Identifies relevant educational standards addressed: e.g., CCSS.MATH.CONTENT.6.NS.A.1 Interpret and compute quotients of fractions, and solve word problems involving division of fractions by fractions, e.g., by using visual fraction models and equations to represent the problem. The content standards will also include an associated field that describes the grade level(s) for which the content standard applies.",

      "gradeLevels": "Select all grade levels from K through 12 for which this object may be used.",

      "disciplines": "The discipline field identifies the discipline(s) taught. Multiple discipline and subdiscipline fields may be added for objects that touch on more than one content area.",

      "discipline": "Identifies the discipline taught. (In most cases, this corresponds to the area of teacher licensure and accreditation.) The primary discipline in the case of the Fraction Orange would be mathematics. The subdiscipline would be arithmetic.",

      "subdiscipline": "Identifies a sub discipline that may be addressed.",

      "cadFormat": "The file type of CAD files associated with this object (e.g., SVG, STL, etc...)",

      "consumableCost": "The estimated cost of non-reusable materials needed to fabricate this object. This value should be entered as a numerical value in USD (e.g., 10.5, 20, etc...).",

      "reusableCost": "The estimated cost of reusable materials needed to fabricate this object. This value should be entered as a numerical value in USD (e.g., 10.5, 20, etc...).",

      "equipment": "Equipment needed for fabricate this object (e.g., scissors, 3D printer, etc...)",

      "fabricationTime": "Time required to 3D print, laser-cut, etc. the components of the object and assemble them. Estimated time requirements should be listed to the nearest tenth of an hour. For example, one and one-half hours would be entered as 1.5 hours.",

      "assemblyTime": "Time required to assemble and test the components and install software. Estimated time requirements should be listed to the nearest tenth of an hour. For example, one and one-half hours would be entered as 1.5 hours.",

      "externalContributor": "The external developer site or contributor web site.",

      "agency": "The name of the Contributor where the objects are from",

      "identifier": "The URL where the object is from ",

      "provenanceRemixed": "When an object is remixed, the DOI(s) of the remixed object(s) are listed in this field. This field will provide a sense of objects that spark innovation and invention. This will also ensure that authors of such objects receive appropriate credit.",

      "incorporatingMechanisms": "In cases in which an object such as a solenoid or a linear motor has been incorporated into another mechanism, the DOI(s) of the object(s) are listed in this field.  This field will provide a sense of objects that often serve as building blocks for creation of other mechanisms.",

      "objectType": "Used to classify objects as (a) static, (2) dynamic, or (3) interactive",

      "": "",

      "": "",

      "": "",

      "": "",

      "fabGuidePackage": "The build details package includes the information needed to replicate a physical artifact, including the bill of materials, supplies, and equipment required to fabricate the object",

      "instructionalResourcesPackage": "The instructional resources package includes descriptions and links to instructional resources that may be available to support instruction",

      "instructionalVideosPackage": "The instructional videos package includes associated video files that may be available to support instruction",

      "thumbnailImage": "Upload a thumbnail image for your object as a .png, .jpg, or .jpeg file"
    }
  
    return (
      <div>
        <body>
          <div className="site">
            <MainHeader input={searchTerm}  setInput={setSearchTerm} handleSubmit={handleSubmit} subject={subject} showFilter={false}></MainHeader>
            <CategoryHeader></CategoryHeader>
            <CategoryBanner subject="Submissions"></CategoryBanner>
  
            <div id="page">
              <p>Submit your educational object to the CAD Library:</p>
              {/* <b className="req">Asterisks indicate required fields</b> */}
              <br />
              <b>Hover over question marks for more information</b><span className="toolTip" title="Just like that!">?</span>
              <br />
              <br />

              <form>
                <table>
                  <tbody>
                    <h4><u>Object Information</u></h4>
                    <br></br>
                    <tr>
                      <td>
                          <label for="title"> <b className="req">Name of Object</b><span className="toolTip" title={tooltips.title}>?</span></label>
                        </td>
                        <td><input id="title" cols="40" rows="1" type="text"/></td>
                    </tr>
                    <br></br>

                    <tr>
                      <td>
                          <label for="discourseLink"> <b className="req">Link to Discourse Thread</b><span className="toolTip" title={tooltips.discourseLink}>?</span></label>
                      </td>
                      <td><input id="discourseLink" cols="40" rows="1" type="text"/></td>
                    </tr>
                    <br></br>

                    <tr>
                      <td> 
                        <b className="req">Author</b><span className="toolTip" title={tooltips.author}>?</span>
                      </td>
                      <td><input id="authorName" type="text"/></td>
                    </tr>
                    <br></br>

                    <tr>
                      <td> 
                        <b className="req">Email Address</b><span className="toolTip" title={tooltips.contactEmail}>?</span>
                      </td>
                      <td><input id="contactEmail" type="email"/></td>
                    </tr>
                    <br></br>

                    <tr>
                      <td> 
                        <b className="req">Description</b><span className="toolTip" title={tooltips.description}>?</span>
                      </td>
                      <td><textarea name="description" id="description" cols="40" rows="4"></textarea></td>
                    </tr>
                    <br></br>

                    <tr>
                      <td> 
                        <b className="req">Big Idea</b><span className="toolTip" title={tooltips.bigIdea}>?</span>
                      </td>
                      <td><textarea name="bigIdea" id="bigIdea" cols="40" rows="4"></textarea></td>
                    </tr>
                    <br></br>

                    <tr>
                      <td>
                        <b>Keyword</b><span className="toolTip" title={tooltips.keyword}>?</span>
                      </td>
                      <td><input id="keywordTerm" type="text"/></td>
                    </tr>
                    <br></br>

                    <tr>
                      <td> <b>Related Work/Article</b><span className="toolTip" title={tooltips.relatedWork}>?</span></td>
                      <td><label for="citation"><b>Citation</b><span className="toolTip" title={tooltips.citation}>?</span></label></td>
                      
                    </tr>
                    <tr>
                      <td></td>
                      <td><textarea name="citation" id="citation" cols="40" rows="4"></textarea></td>
                      
                    </tr>
                    <tr>
                      <td></td>
                      <td><label for="relatedWorkUrl"><b>URL</b><span className="toolTip" title={tooltips.relatedWorkUrl}>?</span></label></td>
                      
                    </tr>
                    <tr>
                      <td></td>
                      <td><input id="relatedWorkUrl" placeholder="https://"/></td>
                    </tr>
                    <br></br>

                    {/* !!!!!!!!!!!!!!!!!!!!!CAD METADATA!!!!!!!!!!!!!!!!!!!!! */}
            
                    <tr>
                      <td>
                        <b>
                          <label className="req" for="sampleLearningGoals">Sample Learning Goal<span className="toolTip" title={tooltips.sampleLearningGoals}>?</span> </label>
                        </b>
                      </td>
                      <td><input id="sampleLearningGoals" type="text" placeholder="Sample learning goal"/></td>
                    </tr>
                    <br></br>

                    <tr>
                      <td>
                        <b>
                          <label className="req" for="contentAlignment">Content Standard<span className="toolTip" title={tooltips.contentAlignment}>?</span> </label>
                        </b>
                      </td>
                      <td><input id="contentAlignment" type="text" placeholder="e.g. CCSS.MATH.CONTEXT.6.NS.A.1"/></td>
                    </tr>
                    <br></br>


                    <tr>
                      <td>
                        <b>
                          <label className="req" for="gradeLevels">Grade Levels<span className="toolTip" title={tooltips.gradeLevels}>?</span> </label>
                        </b>
                      </td>
                      <td>
                        <div class="grade-checkboxes">
                          {grades.map((grade) =>
                          <label id="checkbox" key={grade}>
                              <input className="subject-filter" type="checkbox" onChange={() => setGradesSelected([...gradesSelected, grade], console.log(gradesSelected))}>
                              </input>
                              {grade}
                          </label> 
                          )}
                        </div>
                      </td>
                    </tr>
                    <br></br>

                    <tr>
                      <td> <b className="req">Discipline</b><span className="toolTip" title={tooltips.disciplines}>?</span> </td>
                      <td><label for="discipline"><b>Discipline</b><span className="toolTip" title={tooltips.discipline}>?</span> </label></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <select name="Discipline" id="discipline">
                          <option value=""></option>
                          <option value="Science">Science</option>
                          <option value="Technology">Technology</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Mathematics">Mathematics</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><label for="subdiscipline"><b>Subdiscipline</b><span className="toolTip" title={tooltips.subdiscipline}>?</span> </label></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><input id="subdiscipline" type="text"/></td>
                    </tr>
                    <br></br>

                    <tr>
                      <td>
                        <b>
                          <label for="cadFormat">CAD Format<span className="toolTip" title={tooltips.cadFormat}>?</span> </label>
                        </b>
                      </td>
                      <td><input id="cadFormat" type="text"/></td>
                    </tr>
                    <br></br>

                    <tr>
                      <td>
                        <b>
                          <label for="consumableCost">Estimated Material Cost (Consumable)<span className="toolTip" title={tooltips.consumableCost}>?</span> </label>
                        </b>
                      </td>
                      <td><input id="consumableCost" type="text" placeholder="e.g., 10.5, 20, etc"/></td>
                    </tr>
                    <br></br>

                    <tr>
                      <td>
                        <b>
                          <label for="reusableCost">Estimated Material Cost (Reusable)<span className="toolTip" title={tooltips.reusableCost}>?</span> </label>
                        </b>
                      </td>
                      <td><input id="reusableCost" type="text" placeholder="e.g., 10.5, 20, etc"/></td>
                    </tr>
                    <br />

                    <tr>
                      <td>
                        <b>
                          <label for="equipment">Fabrication Equipment<span className="toolTip" title={tooltips.equipment}>?</span> </label>
                        </b>
                      </td>
                      <td><input id="equipment" type="text"/></td>
                    </tr>
                    <br></br>

                    <tr>
                      <td>
                        <b>
                          <label for="fabricationTime">Fabrication Time<span className="toolTip" title={tooltips.fabricationTime}>?</span> </label>
                        </b>
                      </td>
                      <td><textarea id="fabricationTime" cols="40" rows="2" type="text" placeholder="to the nearest tenth of an hour; i.e., 1.5 hours"/></td>
                    </tr>
                    <br></br>


                    <tr>
                      <td>
                        <b>
                          <label for="assemblyTime">Assembly Time<span className="toolTip" title={tooltips.assemblyTime}>?</span> </label>
                        </b>
                      </td>
                      <td><textarea id="assemblyTime" cols="40" rows="2" type="text" placeholder="to the nearest tenth of an hour; i.e., 1.5 hours"/></td>
                    </tr>
                    <br />


                    <tr>
                      <td> <b>Developer (Institution)</b><span className="toolTip" title={tooltips.externalContributor}>?</span> </td>

                      <td><label for="agency"><b>Institution</b><span className="toolTip" title={tooltips.agency}>?</span> </label></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><input id="agency" type="text"/></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><label for="identifier"><b>URL</b><span className="toolTip" title={tooltips.identifier}>?</span> </label></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><input id="identifier" type="text"/></td>
                    </tr>
                    <br />


                    <tr>
                      <td>
                        <b>
                          <label for="objectType">Object Type<span className="toolTip" title={tooltips.objectType}>?</span> </label>
                        </b>
                      </td>
                      <td>
                        <select name="Object Type" id="objectType">
                          <option value=""></option>
                          <option value="static">static</option>
                          <option value="dynamic">dynamic</option>
                          <option value="interactive">interactive</option>
                        </select>
                      </td>
                    </tr>
                    <br></br>
                    <br></br>

                    <h4><u>Files</u> </h4>
                    <br></br>
                    <tr>
                        <td>
                            <label for="fabGuidePackage"> <b className="req">Fabrication Guide</b><span className="toolTip" title={tooltips.fabGuidePackage}>?</span></label>
                        </td>
                        <td><input type="file" onChange={handleFabGuide} multiple></input></td>
                    </tr>
                    <br />

                    <tr>
                        <td>
                            <label for="instructionalResourcesPackage"> <b className="req">Instructional Resources</b><span className="toolTip" title={tooltips.instructionalResourcesPackage}>?</span></label>
                        </td>
                        <td><input type="file" onChange={handleInstructResource} multiple></input></td>
                    </tr>
                    <br />

                    <h4> <u>Image Upload</u> </h4>
                    <br></br>
                    <p> 
                      Please upload a thumbnail image for your object as a .png, .jpg, or .jpeg file.  
                    </p>
                    <tr>
                        <td>
                            <label for="thumbnailImage"> <b className="req">Thumbnail Image</b><span className="toolTip" title={tooltips.thumbnailImage}>?</span></label>
                        </td>
                        <td><input type="file" onChange={handleThumbnailImage}></input></td>
                    </tr>
                    <br />

                  </tbody>
                </table>
                <button type='button' onClick={createDataset}>Submit Object for Review</button> 
              </form>
            </div>
          </div>
        </body>
      </div>
      
    );
  };
  
  export default Submission;