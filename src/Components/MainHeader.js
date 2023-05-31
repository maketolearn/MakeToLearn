import React from "react";
import { Link } from 'react-router-dom';
import '../Styles/MainHeader.css';

const MainHeader = () => {
    return (
        <div>
            <header id="masthead" class="site-header" role="banner">
                <div class="site-branding">
                    <p class="site-title">
                        <Link to="/">
                            <span>CAD</span> 
                            Library
                        </Link>
                    </p>    
                </div>
            </header>
        </div>
    );
};

export default MainHeader;