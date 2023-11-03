import React, {useState, useEffect, useRef} from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import CategoryBanner from './Components/CategoryBanner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import './Styles/Page.css';
import './Styles/Submission.css'
import DynamicField from './Components/DynamicField';


const Submission = () => {

    const navigate = useNavigate();
    const form = useRef();
  
    const [searchTerm, setSearchTerm] = useState("");
    const [searchObjects, setSearchObjects] = useState([]);
    const [subject, setSubject] = useState("Library");

    const [objectSubject, setObjectSubject] = useState("");
    const [fromName, setFromName] = useState("");
    const [fromEmail, setFromEmail] = useState("");
    const [message, setMessage] = useState("");

    const [showMessage, setShowMessage] = useState(false);

    const [fabGuidePackage, setFabGuidePackage] = useState();
    const [instructResourcePackage, setInstructResourcePackage] = useState();
    const [thumbnailImage, setThumbnailImage] = useState();
    const [grades, setGrades] = useState(["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"])

    const [doi, setDoi] = useState("");

    useEffect(() => {
      if (doi != "") {
        console.log(doi);
        uploadFiles(doi);
        // if file upload success --> submit Review
        // submitReview(doi);
      }
    }, [doi]);

    const handleSubjectSelect = (event) => {
      setObjectSubject(event.target.value);
    }

    const resetForm = () => {
      setObjectSubject("");
      setFromName("");
      setFromEmail("");
      setMessage("");
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setSearchObjects([]);
      navigate(`/browse`, {state: searchTerm});
    }

    const handleFabGuide = (event) => {
      setFabGuidePackage(event.target.files[0])
    }

    const handleInstructResource = (event) => {
      setInstructResourcePackage(event.target.files[0])
      console.log(instructResourcePackage.name)
    }

    const handleThumbnailImage = (event) => {
      setThumbnailImage(event.target.files[0])
    }

    const sendEmail = (e) => {
      e.preventDefault();
      
      emailjs.sendForm('service_41f3fg5', 'template_nprqnh3', form.current, 'MIqeZxkpcd7inecb4')
      .then((result) => {
          setShowMessage(true);
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

      resetForm();
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
                        "authorAffiliation": {
                          "typeName": "authorAffiliation",
                          "typeClass": "primitive",
                          "multiple": false,
                          "value": document.getElementById("authorDepartment").value
                        }
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
                          "value": document.getElementById("contactName").value
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
                      {
                        "dsDescriptionValue": {
                          "typeName": "dsDescriptionValue",
                          "multiple": false,
                          "typeClass": "primitive",
                          "value":  document.getElementById("bigIdea").value
                        }
                      }
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
                    "value": Array.from(document.getElementById("gradeLevels").selectedOptions, option => option.value)
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
      "title": "The main title of the dataset",

      "author": "The entity, e.g. a person or organization, that created the Dataset",

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
              <b>Hover over question marks for more information </b> <span className="toolTip" title="Just like that!">?</span>
              <br />
              <br />

              <form>
                <table>
                  <tbody>
                    {/* 1 column */}
                    <h4> <u>Object Information</u> </h4>
                    <br></br>
                    <tr>
                      <td>
                          <label for="title"> <b className="req">Name of Object</b><span className="toolTip" title={tooltips.title}>?</span></label>
                      </td>
                      <td><textarea id="title" cols="30" rows="1" type="text"/></td>
                    </tr>
                    <br />


                    {/* 2 columns */}
                    <tr>
                      <td> <b className="req">Author</b><span className="toolTip" title={tooltips.author}>?</span></td>
                      {/* <td><label for="authorName"> <b className="req">Name</b><span className="toolTip" title={tooltips.authorName}>?</span></label></td>
                      <td><label for="authorDepartment"> <b className="req">Department/Affiliation</b><span className="toolTip" title={tooltips.authorDepartment}>?</span></label></td> */}
                    </tr>
                    <tr>
                      <td></td>
                      <td><input id="authorName" type="text"/></td>
                      {/* <td><input id="authorDepartment" type="text"/></td> */}
                    </tr>
                    {/* <tr>
                      <td></td>
                      <td><label for="authorIdentifierType"><b>Identifier Type</b></label></td>
                      <td><label for="authorIdentifier"><b>Identifier</b></label></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <select name="Identifier Type" id="authorIdentifierType">
                          <option value=""></option>
                          <option value="ORCID">ORCID</option>
                          <option value="ISNI">ISNI</option>
                          <option value="LCNA">LCNA</option>
                          <option value="VIAF">VIAF</option>
                          <option value="GND">GND</option>
                          <option value="DAI">DAI</option>
                          <option value="ResearcherID">ResearcherID</option>
                          <option value="ScopusID">ScopusID</option>
                        </select>
                      </td>
                      <td><input id="authorIdentifier" type="text"/></td>
                    </tr> */}
                    <br />


                    <tr>
                      <td> <b className="req"> Email Address </b><span className="toolTip" title={tooltips.contactEmail}>?</span></td>
                    </tr>
                    {/* <tr>
                      <td></td>
                      <td><label for="contactEmail"> <b className="req">Email</b><span className="toolTip" title={tooltips.contactEmail}>?</span></label></td>
                      <td></td>
                    </tr> */}
                    <tr>
                      <td></td>
                      <td><input id="contactEmail" type="email"/></td>
                      <td></td>
                    </tr>
                    <br />
                    

                    <tr>
                      <td> <b className="req"> Description </b><span className="toolTip" title={tooltips.description}>?</span></td>
                      {/* <td><label for="descriptionText"> <b className="req">Text </b><span className="toolTip" title={tooltips.descriptionText}>?</span></label></td> */}
                      {/* <td><label for="descriptionDate"><b>Date of Description </b><span className="toolTip" title={tooltips.descriptionDate}>?</span></label></td> */}
                    </tr>
                    <tr>
                      <td></td>
                      <td><textarea name="description" id="description" cols="30" rows="3"></textarea></td>
                      {/* <td><input id="descriptionDate" type="date"/></td> */}
                    </tr>
                    <br />

                    <tr>
                      <td> <b className="req">Big Idea </b><span className="toolTip" title={tooltips.bigIdea}>?</span></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><textarea name="bigIdea" id="bigIdea" cols="30" rows="3"></textarea></td>
                    </tr>
                    <br />

                    <tr>
                      <td><b>Keyword </b><span className="toolTip" title={tooltips.keyword}>?</span></td>
                      <td><label for="keywordTerm"><b>Term </b><span className="toolTip" title={tooltips.keywordTerm}>?</span></label></td>
                      {/* <td><label for="controlledVocabName"><b>Controlled Vocabulary Name </b><span className="toolTip" title={tooltips.controlledVocabName}>?</span></label></td> */}
                    </tr>
                    <tr>
                      <td></td>
                      <td><input id="keywordTerm" type="text"/></td>
                      {/* <td><input id="controlledVocabName" type="text"/></td> */}
                    </tr>
                    {/* <tr>
                      <td></td>
                      <td><label for="controlledVocabUrl"><b>Controlled Vocabulary URL </b><span className="toolTip" title={tooltips.controlledVocabUrl}>?</span></label></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><input id="controlledVocabUrl" placeholder="https://"/></td>
                      <td></td>
                    </tr> */}
                    <br />

                    <tr>
                      <td> <b>Related Work/Article </b><span className="toolTip" title={tooltips.relatedWork}>?</span></td>
                      <td><label for="citation"><b>Citation </b><span className="toolTip" title={tooltips.citation}>?</span></label></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><textarea name="citation" id="citation" cols="30" rows="3"></textarea></td>
                      <td></td>
                    </tr>
                   {/* <tr>
                      <td></td>
                      <td><label for="relatedWorkIdentifierType"><b>Identifier Type </b><span className="toolTip" title={tooltips.relatedWorkIdentifierType}>?</span></label></td>
                      <td><label for="relatedWorkIdentifier"><b>Identifier </b><span className="toolTip" title={tooltips.relatedWorkIdentifier}>?</span></label></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <select name="Identifier Type" id="relatedWorkIdentifierType">
                          <option value=""></option>
                          <option value="ark">ark</option>
                          <option value="arXiv">arXiv</option>
                          <option value="bibcode">bibcode</option>
                          <option value="cstr">cstr</option>
                          <option value="doi">doi</option>
                          <option value="ean13">ean13</option>
                          <option value="eissn">eissn</option>
                          <option value="handle">handle</option>
                          <option value="isbn">isbn</option>
                          <option value="issn">issn</option>
                          <option value="istc">istc</option>
                          <option value="lissn">lissn</option>
                          <option value="lsid">lsid</option>
                          <option value="pmid">pmid</option>
                          <option value="purl">purl</option>
                          <option value="upc">upc</option>
                          <option value="url">url</option>
                          <option value="urn">urn</option>
                          <option value="DASH-NRS">DASH-NRS</option>
                        </select>
                      </td>
                      <td><input id="relatedWorkIdentifier" type="text"/></td>
                    </tr> */}
                    <tr>
                      <td></td>
                      <td><label for="relatedWorkUrl"><b>URL </b><span className="toolTip" title={tooltips.relatedWorkUrl}>?</span></label></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><input id="relatedWorkUrl" placeholder="https://"/></td>
                      <td></td>
                    </tr>
                    <br />


                    {/* <tr>
                      <td>
                          <label for="notes"> <b>Notes </b> <span className="toolTip" title={tooltips.notes}>?</span></label>
                      </td>
                      <td><textarea id="notes" cols="30" rows="3" type="text"/></td>
                    </tr>
                    <br /> */}

                    {/* <tr>
                      <td>
                          <label for="creationDate"> <b className="req">Data Creation Date </b> <span className="toolTip" title={tooltips.creationDate}>?</span></label>
                      </td>
                      <td><input id="creationDate" type="date"/></td>
                    </tr>
                    <br /> */}


                    {/* <tr>
                      <td><b className="req">Contributor</b><span className="toolTip" title={tooltips.contributor}>?</span></td>
                      <td><label for="contributionType"> <b className="req">Type</b> <span className="toolTip" title={tooltips.contributionType}>?</span></label></td>
                      <td><label for="contributorName"> <b className="req">Department/Affiliation</b> <span className="toolTip" title={tooltips.contributorName}>?</span></label></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><input id="contributionType" type="text"/></td>
                      <td><input id="contributorName" type="text"/></td>
                    </tr>
                    <br /> */}


                    {/* <tr>
                      <td>
                          <label for="depositor"> <b>Depositor </b> <span className="toolTip" title={tooltips.depositor}>?</span></label>
                      </td>
                      <td><input id="depositor" type="text"/></td>
                    </tr>
                    <br />


                    <tr>
                      <td>
                          <label for="depositDate"> <b>Deposit Date </b> <span className="toolTip" title={tooltips.depositDate}>?</span></label>
                      </td>
                      <td><input id="depositDate" type="date"/></td>
                    </tr>
                    <br /> */}
                    


                    <br />
                    {/* !!!!!!!!!!!!!!!!!!!!!CAD METADATA!!!!!!!!!!!!!!!!!!!!! */}
                    <br />


                    <tr>
                      <td>
                        <b>
                          <label className="req" for="sampleLearningGoals">Sample Learning Goal <span className="toolTip" title={tooltips.sampleLearningGoals}>?</span> </label>
                        </b>
                      </td>
                      <td><textarea id="sampleLearningGoals" cols="30" rows="1" type="text" placeholder="Sample learning goal"/></td>
                    </tr>
                    <br />


                    <tr>
                      <td>
                        <b>
                          <label className="req" for="contentAlignment">Content Standard <span className="toolTip" title={tooltips.contentAlignment}>?</span> </label>
                        </b>
                      </td>
                      <td><textarea id="contentAlignment" cols="30" rows="1" type="text" placeholder="e.g. CCSS.MATH.CONTEXT.6.NS.A.1"/></td>
                    </tr>
                    <br />


                    <tr>
                      <td>
                        <b>
                          <label className="req" for="gradeLevels">Grade Levels <span className="toolTip" title={tooltips.gradeLevels}>?</span> </label>
                        </b>
                      </td>
                      <td>
                        {/* <select style={{width:'100px', textAlign: 'center'}} name="Grade Levels" id="gradeLevels" multiple>
                          <option value="K">K</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select> */}
                        <div class="grade-checkboxes">
                          {grades.map((grade) =>
                          <label id="checkbox" key={grade}>
                              <input className="subject-filter" type="checkbox" onChange={() => setGrades([...grades, grade])}>
                              </input>
                              {grade}
                          </label> 
                          )}
                        </div>
          
                      </td>
                      <td><p>Hold down the Ctrl (Windows) or Command (Mac) button to select multiple options.</p></td>
                    </tr>
                    <br />


                    <tr>
                      <td> <b className="req">Discipline </b><span className="toolTip" title={tooltips.disciplines}>?</span> </td>
                      <td><label for="discipline"><b>Discipline </b><span className="toolTip" title={tooltips.discipline}>?</span> </label></td>
                      <td><label for="subdiscipline"><b>Subdiscipline </b><span className="toolTip" title={tooltips.subdiscipline}>?</span> </label></td>
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
                      <td><input id="subdiscipline" type="text"/></td>
                    </tr>
                    <br />


                    <tr>
                      <td>
                        <b>
                          <label for="cadFormat">CAD Format <span className="toolTip" title={tooltips.cadFormat}>?</span> </label>
                        </b>
                      </td>
                      <td><textarea id="cadFormat" cols="30" rows="1" type="text"/></td>
                    </tr>
                    <br />


                    <tr>
                      <td>
                        <b>
                          <label for="consumableCost">Estimated Material Cost (Consumable) <span className="toolTip" title={tooltips.consumableCost}>?</span> </label>
                        </b>
                      </td>
                      <td><textarea id="consumableCost" cols="30" rows="1" type="text" placeholder="e.g., 10.5, 20, etc"/></td>
                    </tr>
                    <br />


                    <tr>
                      <td>
                        <b>
                          <label for="reusableCost">Estimated Material Cost (Reusable) <span className="toolTip" title={tooltips.reusableCost}>?</span> </label>
                        </b>
                      </td>
                      <td><textarea id="reusableCost" cols="30" rows="1" type="text" placeholder="e.g., 10.5, 20, etc"/></td>
                    </tr>
                    <br />


                    <tr>
                      <td>
                        <b>
                          <label for="equipment">Fabrication Equipment <span className="toolTip" title={tooltips.equipment}>?</span> </label>
                        </b>
                      </td>
                      <td><textarea id="equipment" cols="30" rows="1" type="text"/></td>
                    </tr>
                    <br />


                    <tr>
                      <td>
                        <b>
                          <label for="fabricationTime">Fabrication Time <span className="toolTip" title={tooltips.fabricationTime}>?</span> </label>
                        </b>
                      </td>
                      <td><textarea id="fabricationTime" cols="30" rows="2" type="text" placeholder="to the nearest tenth of an hour; i.e., 1.5 hours"/></td>
                    </tr>
                    <br />


                    <tr>
                      <td>
                        <b>
                          <label for="assemblyTime">Assembly Time <span className="toolTip" title={tooltips.assemblyTime}>?</span> </label>
                        </b>
                      </td>
                      <td><textarea id="assemblyTime" cols="30" rows="2" type="text" placeholder="to the nearest tenth of an hour; i.e., 1.5 hours"/></td>
                    </tr>
                    <br />


                    <tr>
                      <td> <b>Developer (Institution) </b><span className="toolTip" title={tooltips.externalContributor}>?</span> </td>
                      
                      <td><label for="agency"><b>Institution</b><span className="toolTip" title={tooltips.agency}>?</span> </label></td>

                      <td><label for="identifier"><b>URL</b><span className="toolTip" title={tooltips.identifier}>?</span> </label></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><input id="agency" type="text"/></td>
                      <td><input id="identifier" type="text"/></td>
                    </tr>
                    <br />


                    {/* <tr>
                      <td>
                        <b>
                          <label for="provenanceRemixed">Provenance Remixed Objects <span className="toolTip" title={tooltips.provenanceRemixed}>?</span> </label>
                        </b>
                      </td>
                      <td><textarea id="provenanceRemixed" cols="30" rows="1" type="text" placeholder="https://"/></td>
                    </tr>
                    <br />


                    <tr>
                      <td>
                        <b>
                          <label for="incorporatingMechanisms">Object Incorporated into Other Mechanisms <span className="toolTip" title={tooltips.incorporatingMechanisms}>?</span> </label>
                        </b>
                      </td>
                      <td><textarea id="incorporatingMechanisms" cols="30" rows="1" type="text" placeholder="https://"/></td>
                    </tr>
                    <br /> */}


                    <tr>
                      <td>
                        <b>
                          <label for="objectType">Object Type <span className="toolTip" title={tooltips.objectType}>?</span> </label>
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
                    <br />
                    <br></br>

                    <h4> <u>Files</u> </h4>
                    <br></br>
                    <p> 
                      Related Instructional Resource files should be combined into a single .zip file. Related Fabrication Guide files should also be combined into a second .zip file.  The file name of the instructional resources .zip file should be, “Instruction_[Object name]” with “_” used instead of spaces. The filename of the fabrication guide .zip file should be, “Fabrication_[Object name]” with “_” used instead of spaces. These two .zip files should be combined into a single .zip file before uploading. 
                    </p>
                    <tr>
                        <td>
                            <label for="fabGuidePackage"> <b className="req">Fabrication Guide</b> <span className="toolTip" title={tooltips.fabGuidePackage}>?</span></label>
                        </td>
                        <td><input type="file" onChange={handleFabGuide}></input></td>
                    </tr>
                    <br />

                    <tr>
                        <td>
                            <label for="instructionalResourcesPackage"> <b className="req">Instructional Resources</b> <span className="toolTip" title={tooltips.instructionalResourcesPackage}>?</span></label>
                        </td>
                        <td><input type="file" onChange={handleInstructResource}></input></td>
                    </tr>
                    <br />

                    <h4> <u>Image Upload</u> </h4>
                    <br></br>
                    <p> 
                      Please upload a thumbnail image for your object as a .png, .jpg, or .jpeg file.  
                    </p>
                    <tr>
                        <td>
                            <label for="thumbnailImage"> <b className="req">Thumbnail Image</b> <span className="toolTip" title={tooltips.thumbnailImage}>?</span></label>
                        </td>
                        <td><input type="file" onChange={handleThumbnailImage}></input></td>
                    </tr>
                    <br />

                    {/* <tr>
                        <td>
                            <label for="instructionalVideosPackage"> <b>Instructional Videos Package</b> <span className="toolTip" title={tooltips.instructionalVideosPackage}>?</span></label>
                        </td>
                        <td><input type="file"></input></td>
                    </tr> */}
                    <br />

                    {/* <tr>
                      <td></td>
                      <td><DynamicField></DynamicField></td>
                      <td></td>
                    </tr> */}

                  </tbody>
                </table>

                
                <button type='button' onClick={createDataset}>Submit Object for Review</button> 
              </form>

              <div>
                <br />
                {/* <button id="createDataset" onClick={createDataset}> Create Dataset </button> */}
              </div>
            </div>
          </div>
        </body>
      </div>
      
    );
  };
  
  export default Submission;