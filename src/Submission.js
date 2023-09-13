import React, {useState, useRef} from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import CategoryBanner from './Components/CategoryBanner';
import { useNavigate } from 'react-router-dom';
import './Styles/Page.css';
import './Styles/Submission.css'

const Submission = () => {

    const navigate = useNavigate();
  
    const [searchTerm, setSearchTerm] = useState("");
    const [searchObjects, setSearchObjects] = useState([]);
    const [subject, setSubject] = useState("Library");

    const [curatorSubject, setCuratorSubject] = useState("");
    const [toName, setToName] = useState("");
    const [toEmail, setToEmail] = useState("");
    const [fromName, setFromName] = useState("");
    const [fromEmail, setFromEmail] = useState("");
    const [message, setMessage] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setSearchObjects([]);
      navigate(`/browse`, {state: searchTerm});
    }

    const handleFormSubmit = async(e) => {
      e.preventDefault();
      const inputVal = await e.target[0].value;
      const token = captchaRef.current.getValue();
      captchaRef.current.reset();
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

              <p>To inquire, contact one of the following CAD Library curators:</p>
              <ul>
                <input type="radio"></input><label id="checkbox-label">Science Curators&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Joshua Ellis & Sumreen Asim</label>
                <br></br>
                <input type="radio"></input><label id="checkbox-label">Technology Curator&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Elizabeth Whitewolf</label>
                <br></br>
                <input type="radio"></input><label id="checkbox-label">Engineering Curator&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ryan Novitski</label>
                <br></br>
                <input type="radio"></input><label id="checkbox-label">Mathematics Curator&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Steven Greenstein </label>
              </ul>

              <p>Provide your name, e-mail address, and a short description of your interest.</p>
              <form onSubmit={handleFormSubmit}>
                <label>Name</label><br></br>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name}></input><br></br><br></br>

                <label>Email</label><br></br>
                <input type="text"></input><br></br><br></br>

                <label>Brief description of your interest or query</label><br></br>
                <textarea name="message" rows="10" cols="100"></textarea><br></br><br></br>

                <button>Submit</button>
              </form>
            </div>
          </div>
        </body>
      </div>
      
    );
  };
  
  export default Submission;