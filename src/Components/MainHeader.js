import React from "react";
import { Link } from 'react-router-dom';
import '../Styles/MainHeader.css';
import '../Styles/Page.css';

const MainHeader = () => {

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
            
            </header>
        </div>
    );
};

export default MainHeader;