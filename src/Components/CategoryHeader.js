import React from "react";
import { NavLink, Link } from 'react-router-dom';
import '../Styles/CategoryHeader.css';

const CategoryHeader = () => {
    return (
        <div id="page">
            <div id="cats-header">
                <ul class="cats-menu" aria-expanded="false">
                    <li class="cat-item cat-item-home cat-item-9">
                        <NavLink to="/" style={({ isActive }) => ({
                            background: isActive ? '#c1c1c1' : '',
                            textDecoration: "none",
                        })}>Home</NavLink>
                    </li>
                    <li class="cat-item cat-item-science cat-item-9">
                        <NavLink to="/science" style={({ isActive }) => ({
                            background: isActive ? '#c1c1c1' : '',
                            textDecoration: "none",
                        })}>Science</NavLink>
                    </li>
                    <li class="cat-item cat-item-technology cat-item-9">
                        <NavLink to="/technology" style={({ isActive }) => ({
                            background: isActive ? '#c1c1c1' : '',
                            textDecoration: "none",
                        })}>Technology</NavLink>
                    </li>
                    <li class="cat-item cat-item-engineering cat-item-9">
                        <NavLink to="/engineering" style={({ isActive }) => ({
                            background: isActive ? '#c1c1c1' : '',
                            textDecoration: "none",
                        })}>Engineering</NavLink>
                    </li>
                    <li class="cat-item cat-item-mathematics cat-item-9">
                        <NavLink to="/mathematics" style={({ isActive }) => ({
                            background: isActive ? '#c1c1c1' : '',
                            textDecoration: "none",
                        })}>Mathematics</NavLink>
                    </li>
                    <li class="cat-item cat-item-forum cat-item-9">Forum</li>
                </ul>
            </div>
        </div>
    );
};

export default CategoryHeader;