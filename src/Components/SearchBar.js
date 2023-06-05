import React, {useState} from 'react';

const SearchBar = () => {

    const [input, setInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };

    //TO DO: search function

    return (
        <div id="page">
            <input type="search" placeholder="Search" onChange={handleChange} value={input}/>
        </div>
    )
}

export default SearchBar;