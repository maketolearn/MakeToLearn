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
                        </Link>
                    </p>    
                </div>

                <nav id="site-navigation" class="main-navigation"> 
                    <div class="menu-toggle">
                        <ul id="primary-menu" class="menu nav-menu" aria-expanded="false">
                            <li id="menu-item-2572" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2572">
                                <a>About</a>
                            </li>
                            <li id="menu-item-2573" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2573">
                                <a>Submissions</a>
                            </li>
                            <li id="menu-item-2575" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-2575">
                                <a>Subscribe</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default MainHeader;