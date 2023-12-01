import React from "react";
import { Link } from 'react-router-dom';
import '../Styles/MainHeader.css';
import '../Styles/Page.css';
import SearchBar from "./SearchBar";

const MainHeader = ({ input, setInput, handleSubmit, subject, showComponent, handleCheckboxChange, showFilter }) => {

    return (
        <div id="page">
            <header id="masthead" class="site-header" role="banner">
                <div>
                    <div class="site-branding">
                        <p class="site-title">
                            <Link to="/">
                                <span>CAD</span> 
                                Library
                                {/* <img src="cadLibrary.png"></img> */}
                            </Link>
                        </p>   
                    </div>

                    <div class="slider-container">
                        {showFilter && <div id="slider-text"> Show Filters</div>}
                        {showFilter && <div><label class="switch">
                            <input type="checkbox" checked={showComponent} onChange={handleCheckboxChange}/>
                            <span class="slider round"></span>
                        </label></div>}
                        {subject != "none" && <div><SearchBar input={input} setInput={setInput} handleSubmit={handleSubmit} subject={subject}></SearchBar></div>}
                    </div>
                </div>

                <div>
                    <nav class="main-navigation"> 
                        <br></br>
                        <div>
                            <ul aria-expanded="false">
                                <li><Link to="/inquire">Inquire</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default MainHeader;