import React from 'react';
import ObjectCard from './ObjectCard';

const SearchResultDisplay = ({ searchObjects, searchPhrase, cardDisplay }) => {

    const noResults = (searchObjects.length === 0);
    const oneResult = (searchObjects.length === 1);

    return (
        <div>
            <div>
                {searchPhrase ? <p>We couldn't find "{searchPhrase}," but you may be interested in these:</p> : <p> </p>}
                {noResults ? <p>No results found</p> : oneResult ? <p>1 result</p>  : <p>{searchObjects.length} results</p>}
                <div class={cardDisplay}>
                    {searchObjects.map((object, i) => (
                        <ObjectCard objImageUrl={object.imgUrl} objTitle={object.title} objAuthor={object.author} objDescription={object.desc} doi={object.doi} key={i} />
                    ))}
                </div>
            </div>
           
        </div>
    );
}

export default SearchResultDisplay;