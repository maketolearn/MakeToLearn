import React from "react";
import '../Styles/CategoryBanner.css';

const CategoryBanner= ({subject}) => {   

    const id = subject.toLowerCase() + "-banner";

    return (
        <div>
            <container id={id}>
                {subject}
            </container> 
        </div>
    
    )
}

export default CategoryBanner;