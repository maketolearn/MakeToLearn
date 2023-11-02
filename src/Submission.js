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

    const [doi, setDoi] = useState("");

    useEffect(() => {
      if (doi != "") {
        console.log(doi);
        submitReview(doi);
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
      const API_TOKEN = '04c00114-fb2e-4f0f-9066-bb9bf497db57';
      const SERVER_URL = 'https://dataverse.lib.virginia.edu';
      const PARENT = 'CADLibrary';

      const headers = {
        'Content-Type': 'application/json',
        'X-Dataverse-key': API_TOKEN,
      };

      const dataset = {
          "datasetVersion": {
            "metadataBlocks": {
              "citation": {
                "fields": [
                  {
                    "value": "Darwin's Newest Finches",
                    "typeClass": "primitive",
                    "multiple": false,
                    "typeName": "title"
                  },
                  {
                    "value": [
                      {
                        "authorName": {
                          "value": "Finch, Fiona",
                          "typeClass": "primitive",
                          "multiple": false,
                          "typeName": "authorName"
                        },
                        "authorAffiliation": {
                          "value": "Birds Inc.",
                          "typeClass": "primitive",
                          "multiple": false,
                          "typeName": "authorAffiliation"
                        }
                      }
                    ],
                    "typeClass": "compound",
                    "multiple": true,
                    "typeName": "author"
                  },
                  {
                    "value": [ 
                        { "datasetContactEmail" : {
                            "typeClass": "primitive",
                            "multiple": false,
                            "typeName": "datasetContactEmail",
                            "value" : "finch@mailinator.com"
                        },
                        "datasetContactName" : {
                            "typeClass": "primitive",
                            "multiple": false,
                            "typeName": "datasetContactName",
                            "value": "Finch, Fiona"
                        }
                    }],
                    "typeClass": "compound",
                    "multiple": true,
                    "typeName": "datasetContact"
                  },
                  {
                    "value": [ {
                       "dsDescriptionValue":{
                        "value":   "Darwin's finches (also known as the Galápagos finches) are a group of about fifteen species of passerine birds.",
                        "multiple":false,
                       "typeClass": "primitive",
                       "typeName": "dsDescriptionValue"
                    }}],
                    "typeClass": "compound",
                    "multiple": true,
                    "typeName": "dsDescription"
                  },
                  {
                    "value": [
                      "Medicine, Health and Life Sciences"
                    ],
                    "typeClass": "controlledVocabulary",
                    "multiple": true,
                    "typeName": "subject"
                  },
                  {
                    "typeName": "productionDate",
                    "multiple": false,
                    "typeClass": "primitive",
                    "value": "1003-01-01"
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
                          "value": "Data Collector"
                        },
                        "contributorName": {
                          "typeName": "contributorName",
                          "multiple": false,
                          "typeClass": "primitive",
                          "value": "LastContributor1, FirstContributor1"
                        }
                      },
                    ]
                  }
                ],
                "displayName": "Citation Metadata"
              }
            }
          }
      }

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
      const API_TOKEN = '04c00114-fb2e-4f0f-9066-bb9bf497db57';
      const SERVER_URL = 'https://dataverse.lib.virginia.edu';
      const PARENT = 'CADLibrary';

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

    const tooltips = {
      "title": "The main title of the dataset",

      "": "",

      "": "",

      "": "",

      "": "",

      "": "",

      "creationDate": "Date when the data collection or other materials were produced/created (NOT distributed, published or deposited).",

      "contributor": "The entity, such as a person or organization, responsible for collecting, managing, or otherwise contributing to the development of the Dataset",

      "contributionType": "Indicates the type of contribution made to the dataset",

      "contributorName": "The name of the contributor, e.g. the person's name or the name of an organization",

      "": "",

      "": "",

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
    }

    function printInputs() {
      const inputElements = document.querySelectorAll('input[type="text"]');
      const textElements = document.querySelectorAll('textarea');
      const selectElements = document.querySelectorAll('select');
      const inputValues = {};

      // Loop through the input elements and populate the inputValues object
      inputElements.forEach((input) => {
        const id = input.id;
        inputValues[id] = input.value;
      });

      textElements.forEach((input) => {
        const id = input.id;
        inputValues[id] = input.value;
      });

      selectElements.forEach((input) => {
        let object = input.options[input.selectedIndex]
        if (object == undefined) {
          inputValues[input.id] = "";
        } else {
          inputValues[input.id] = object.value;
        }
      });


      console.log(JSON.stringify(inputValues, null, 2));
    }
  
    return (
      <div>
        <body>
          <div className="site">
            <MainHeader input={searchTerm}  setInput={setSearchTerm} handleSubmit={handleSubmit} subject={subject} showFilter={false}></MainHeader>
            <CategoryHeader></CategoryHeader>
            <CategoryBanner subject="Submissions"></CategoryBanner>
  
            <div id="page">
              <p>Publish your educational object in the CAD Library:</p>
              <b className="req">Asterisks indicate required fields</b>
              <br />
              <b>Hover over question marks for more information </b> <span className="toolTip" title="Just like that!">?</span>
              <br />
              <br />


              <form>
                <table>
                  <tbody>
                    {/* 1 column */}
                    <tr>
                      <td>
                          <label for="title"> <b className="req">Title</b> <span className="toolTip" title={tooltips.title}>?</span></label>
                      </td>
                      <td><textarea id="title" cols="30" rows="1" type="text"/></td>
                    </tr>
                    <br />


                    {/* 2 columns */}
                    <tr>
                      <td> <b className="req">Author</b> </td>
                      <td><label for="authorName"> <b className="req">Name</b> </label></td>
                      <td><label for="department"> <b className="req">Department/Affiliation</b> </label></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><input id="authorName" type="text"/></td>
                      <td><input id="department" type="text"/></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><label for="identifierType"><b>Identifier Type</b></label></td>
                      <td><label for="identifier"><b>Identifier</b></label></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <select name="Identifier Type" id="identifierType">
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
                      <td><input id="identifier" type="text"/></td>
                    </tr>
                    <br />


                    <tr>
                      <td> <b className="req">Point of Contact</b> </td>
                      <td><label for="contactName"><b>Name</b></label></td>
                      <td><label for="affiliation"><b>Affiliation</b></label></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><input id="contactName" type="text"/></td>
                      <td><input id="affiliation" type="text"/></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><label for="contactEmail"> <b className="req">Email</b> </label></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><input id="contactEmail" type="text"/></td>
                      <td></td>
                    </tr>
                    <br />
                    

                    <tr>
                      <td> <b className="req">Dataset Description</b> </td>
                      <td><label for="descriptionText"> <b className="req">Text</b> </label></td>
                      <td><label for="descriptionDate"><b>Date of Description</b></label></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><textarea name="description" id="description" cols="30" rows="3"></textarea></td>
                      <td><input id="descriptionDate" type="text"/></td>
                    </tr>
                    <br />


                    <tr>
                      <td>
                          <label for="creationDate"> <b className="req">Data Creation Date </b> <span className="toolTip" title={tooltips.creationDate}>?</span></label>
                      </td>
                      <td><textarea id="creationDate" cols="30" rows="1" type="text" placeholder="YYYY-MM-DD"/></td>
                    </tr>
                    <br />


                    <tr>
                      <td><b className="req">Contributor</b><span className="toolTip" title={tooltips.contributor}>?</span></td>
                      <td><label for="contributionType"> <b className="req">Type</b> <span className="toolTip" title={tooltips.contributionType}>?</span></label></td>
                      <td><label for="contributorName"> <b className="req">Department/Affiliation</b> <span className="toolTip" title={tooltips.contributorName}>?</span></label></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><input id="contributionType" type="text"/></td>
                      <td><input id="contributorName" type="text"/></td>
                    </tr>


                    <br />
                    {/* !!!!!!!!!!!!!!!!!!!!!CAD METADATA!!!!!!!!!!!!!!!!!!!!! */}
                    <br />


                    <tr>
                      <td>
                        <b>
                          <label for="sampleLearningGoals">Sample Learning Goals <span className="toolTip" title={tooltips.sampleLearningGoals}>?</span> </label>
                        </b>
                      </td>
                      <td><textarea id="sampleLearningGoals" cols="30" rows="1" type="text" placeholder="Learning Objective - one per line"/></td>
                    </tr>
                    <br />


                    <tr>
                      <td>
                        <b>
                          <label for="contentAlignment">Alignment with Content Standards <span className="toolTip" title={tooltips.contentAlignment}>?</span> </label>
                        </b>
                      </td>
                      <td><textarea id="contentAlignment" cols="30" rows="1" type="text" placeholder="e.g. CCSS.MATH.CONTEXT.6.NS.A.1"/></td>
                    </tr>
                    <br />


                    <tr>
                      <td>
                        <b>
                          <label for="gradeLevels">Grade Levels <span className="toolTip" title={tooltips.gradeLevels}>?</span> </label>
                        </b>
                      </td>
                      <td>
                        <select style={{width:'100px', textAlign: 'center'}} name="Grade Levels" id="gradeLevels" multiple>
                          <option value="k">K</option>
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
                        </select>
                      </td>
                      <td><p>Hold down the Ctrl (Windows) or Command (Mac) button to select multiple options.</p></td>
                    </tr>
                    <br />


                    <tr>
                      <td> <b>Disciplines </b><span className="toolTip" title={tooltips.disciplines}>?</span> </td>
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
                      <td> <b>External Contributor </b><span className="toolTip" title={tooltips.externalContributor}>?</span> </td>
                      
                      <td><label for="agency"><b>Agency </b><span className="toolTip" title={tooltips.agency}>?</span> </label></td>

                      <td><label for="identifier"><b>Identifier </b><span className="toolTip" title={tooltips.identifier}>?</span> </label></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><input id="agency" type="text"/></td>
                      <td><input id="identifier" type="text"/></td>
                    </tr>
                    <br />


                    <tr>
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
                    <br />


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

                    {/* <tr>
                      <td></td>
                      <td><DynamicField></DynamicField></td>
                      <td></td>
                    </tr> */}

                  </tbody>
                </table>

                
                <button type='button' onClick={printInputs}>Print Input Values</button> 
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