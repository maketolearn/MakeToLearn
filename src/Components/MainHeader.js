import React from "react";
import '../Styles/MainHeader.css';

const MainHeader = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        CAD Library
                        <img src="https://citejournal.org/wp-content/themes/cite/images/logo.png"></img>
                    </a>
                </div>
            </nav>
        </div>
    );
};

export default MainHeader;