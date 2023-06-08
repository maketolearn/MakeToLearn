import React from "react";
import useCollapse from 'react-collapsed';
import "../Styles/ObjectCard.css";


const ObjectCard = (props) => {

    return (
        <div class="card" >
            <img id="img" src={props.objImageUrl} alt="Object Thumbnail Not Found"></img>
            <div class="container">
                <h3><b id="object">{props.objTitle}</b></h3>
                <h4 id="author">{props.objAuthor}</h4>
                <p id="Description">{props.objDescription}</p>
            </div>
        </div>
    )
}

export default ObjectCard;