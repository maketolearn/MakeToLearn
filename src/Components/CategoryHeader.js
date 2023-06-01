import React from "react";
import { Link } from 'react-router-dom';
import '../Styles/CategoryHeader.css';

const CategoryHeader = () => {
    return (
        <div id="cats-header">
            <ul class="cats-menu" aria-expanded="false">
                <li class="cat-item cat-item-home cat-item-9">Home
                </li>
                <li class="cat-item cat-item-science cat-item-9">Science</li>
                <li class="cat-item cat-item-technology cat-item-9">Technology</li>
                <li class="cat-item cat-item-engineering cat-item-9">Engineering</li>
                <li class="cat-item cat-item-mathematics cat-item-9">Mathematics</li>
                <li class="cat-item cat-item-cross-disciplinary cat-item-9">Cross Disciplinary</li>
                <li class="cat-item cat-item-forum cat-item-9">Forum</li>
            </ul>
        </div>
    );
};

export default CategoryHeader;