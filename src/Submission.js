import React, {useState, useEffect, useRef} from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import CategoryBanner from './Components/CategoryBanner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import './Styles/Page.css';
import './Styles/Submission.css'

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
      submitReview(doi);
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

  
    return (
      <div>
        <body>
          <div class="site">
            <MainHeader input={searchTerm}  setInput={setSearchTerm} handleSubmit={handleSubmit} subject={subject} showFilter={false}></MainHeader>
            <CategoryHeader></CategoryHeader>
            <CategoryBanner subject="Submissions"></CategoryBanner>
  
            <div id="page">
              <p>Publish your educational object in the CAD Library:</p>
              <ul>
                <li> Do you use physical objects in your teaching?  Would you be interested in publishing an educational object that you have developed in the <em>CAD Library</em>? </li>
                <li>Do you have other questions about the <em>CAD Library</em> or the submission process?</li>
              </ul>


              <form>
                <label for="title">Title</label>
                <input id="title" type="text"/>

                <label for="author">Author</label>
                <input id="author" type="text"/>
              </form>

              <div>
                <br />
                <button onClick={createDataset}> Create Dataset </button>
              </div>
            </div>
          </div>
        </body>
      </div>
      
    );
  };
  
  export default Submission;