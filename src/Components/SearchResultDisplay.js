import React from 'react';
import ObjectCard from './ObjectCard';

const SearchResultDisplay = ({ searchObjects, searchPhrase }) => {

    const noResults = (searchObjects.length === 0);
    const oneResult = (searchObjects.length === 1);

    return (
        <div>
            <div id="page">
                {searchPhrase ? <p>We couldn't find "{searchPhrase}," but you may be interested in these:</p> : <p> </p>}
                {noResults ? <p>No results found</p> : oneResult ? <p>1 result</p>  : <p>{searchObjects.length} results</p>}
                <div class="cards">
                    {searchObjects.map((object, i) => (
                        <ObjectCard objImageUrl={object.imgUrl} objTitle={object.title} objAuthor={object.author} objDescription={object.desc} doi={object.doi} key={i} />
                    ))}

                    <ObjectCard objImageUrl={"horseevolution.jpg"} objTitle={"Horse Evolution"} objDescription={"These set of fossil horse teeth have been selected by Florida Museum scientists to help K12 students understand concepts related to horse evolution and climate change. Three lessons have been developed in collaboration with science teachers that can be used with the 3D files provided."} doi={"00000C144"}/>
                </div>
            </div>
           
        </div>
    );
}

export default SearchResultDisplay;