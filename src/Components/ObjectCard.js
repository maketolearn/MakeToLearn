import React from "react";
import "../Styles/ObjectCard.css";
import { Link }from 'react-router-dom';


const ObjectCard = (props) => {

    let doiPieces = props.doi.split("/");
    console.log(doiPieces);
    const doi = (props.doi === "00000C144" ? "00000C144" : (doiPieces[0] + doiPieces[1]));

    // This dataset of fossil horse teeth published on Morphosource has been selected by Florida Museum scientists to help K12 students understand concepts related to horse evolution and climate change. Three lessons have been developed in collaboration with science teachers that can be used with the 3D files provided.

    let link = `/objects/${doi}`;
    

    return (
        <div class="card">
            <Link to={link} id="link">
                <div class="card-image">
                    <img id="img" src={props.objImageUrl} alt="Object Thumbnail Not Found"></img>
                </div>
                <div class="card-desc">
                    <div class="card-title">
                        <h5><b id="object">{props.objTitle}</b></h5>
                    </div>
                    <div>
                        {/* <h4 id="author">{props.objAuthor}</h4> */}
                        {doi === "00000C144" ? 
                        <p id="Description">This dataset of fossil horse teeth published on  <a href="https://www.morphosource.org/" target="_blank"> Morphosource </a> has been selected by Florida Museum scientists to help K12 students understand concepts related to horse evolution. <button>See More</button></p> 
                        // the .match function finds the next space after the number of characters input 
                        : <p id="Description">{props.objDescription.match(/^.{150}\w*/)}</p>}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ObjectCard;