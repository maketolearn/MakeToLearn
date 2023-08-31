import React from "react";
import { Link } from 'react-router-dom';
import '../Styles/MainHeader.css';
import '../Styles/Page.css';
import SearchBar from "./SearchBar";

const MainHeader = ({ input, setInput, handleSubmit, subject }) => {

    return (
        <div id="page">
            <header id="masthead" class="site-header" role="banner">
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
                    <div id="slider-text"> Show Filters</div>
                    <label class="switch">
                        <input type="checkbox"/>
                        <span class="slider round"></span>
                    </label>
                    {subject != "none" && <SearchBar input={input} setInput={setInput} handleSubmit={handleSubmit} subject={subject}></SearchBar>}
                </div>
            </header>
        </div>
    );
};

export default MainHeader;