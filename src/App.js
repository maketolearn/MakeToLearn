import React, {useState} from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import CategoryBanner from './Components/CategoryBanner';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import './Styles/Page.css';

//Home page
const App = () => {

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchObjects, setSearchObjects] = useState([]);
  const [subject, setSubject] = useState("Library");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchObjects([]);
    navigate(`/browse`, {state: searchTerm});
  }

  return (
    <div>
      <body>
        <div class="site">
          <MainHeader input={searchTerm}  setInput={setSearchTerm} handleSubmit={handleSubmit} subject={subject} showFilter={false}></MainHeader>
          <CategoryHeader></CategoryHeader>
          <CategoryBanner subject="Home"></CategoryBanner>

          <div id="page">
            <p>
            The <em>Educational CAD Model Library</em> is an extension of the <a href="https://citejournal.org/">CITE Journal</a>. In the same way that a peer-reviewed journal is a repository of peer-reviewed academic manuscripts, the <em>CAD Library</em> is a repository of peer-reviewed educational objects. The <em>CITE Journal</em> and the <em>CAD Library</em> are sponsored by the <a href="https://ntls.info/">NTLS Coalition</a> and affiliated professional associations. Each sponsoring association selects the editors, curators, and review boards for its area of expertise. The educational objects on this site are licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
            </p>

            <p>
              We welcome <Link to="/submission">submission</Link> of educational objects designed for K-12 teaching and learning for review and publication in the <em>CAD Library</em>.
            </p>

            <ul>
              <li>Curator-in-Chief - <Link to="/people/Glen-Bull">Glen Bull</Link></li>
              <li>Curator, Mathematics Education Collection - <Link to="/people/Steven-Greenstein">Steven Greenstein</Link> and <Link to="/people/Allison-McCulloch">Allison McCulloch</Link></li>
              <li>Curator, Science Education Collection - <Link to="/people/Joshua-Ellis">Joshua Ellis</Link> and <Link to="/people/Sumreen-Asim">Sumreen Asim</Link></li>
              <li>Curator, Technology Collection - <Link to="/people/Elizabeth-Whitewolf">Elizabeth Whitewolf</Link></li>
              <li>Curator, Engineering Education Collection - Ryan Novitski</li>
            </ul>
            
          </div>
        </div>
      </body>
    </div>
    
  );
};

export default App;