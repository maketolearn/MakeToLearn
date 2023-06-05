import React from "react";
import { Link } from 'react-router-dom';
import '../Styles/CategoryHeader.css';

const CategoryHeader = () => {
    return (
        <div id="page">
            <div id="cats-header">
                <ul class="cats-menu" aria-expanded="false">
                    <li class="cat-item cat-item-home cat-item-9"><Link to="/">Home</Link></li>
                    <li class="cat-item cat-item-science cat-item-9"><Link to="/science">Science</Link></li>
                    <li class="cat-item cat-item-technology cat-item-9"><Link to="/technology">Technology</Link></li>
                    <li class="cat-item cat-item-engineering cat-item-9"><Link to="/engineering">Engineering</Link></li>
                    <li class="cat-item cat-item-mathematics cat-item-9"><Link to="/mathematics">Mathematics</Link></li>
                    <li class="cat-item cat-item-forum cat-item-9">Forum</li>
                </ul>
            </div>
        </div>
    );
};

export default CategoryHeader;