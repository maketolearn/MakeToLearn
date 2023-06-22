import React from 'react';
import ObjectCard from './ObjectCard';

const SearchResultDisplay = ({ searchObjects }) => {
    return (
        <div>
            <div id="page">
                {searchObjects.length} results
                <div class="cards">
                    {searchObjects.map((object, i) => (
                        <ObjectCard objImageUrl={object.imgUrl} objTitle={object.title} objAuthor={object.author} objDescription={object.desc} doi={object.doi} key={i} />
                    ))}
                    {searchObjects.length === 0 && 
                        <p>No results found.</p>
                    }
                </div>
            </div>
           
        </div>
    );
}

export default SearchResultDisplay;