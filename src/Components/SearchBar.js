import React, {useState, createContext, useEffect} from 'react';
import '../Styles/SearchBar.css';
import axios from 'axios';

const SearchBar = ({ input, setInput, handleSubmit, subject }) => {

    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {  
        setPlaceholderText("Search " + subject + "...")
    }, []);

    return (
        <div>
            <div id="page">
                {/* <div id="form">
                    <input type="search" placeholder={placeholderText} onChange={(e) => setInput(e.target.value)} value={input}/>
                    <button type="submit" onClick={handleSubmit}>Search</button>
                </div> */}
                <form id="form" onSubmit={handleSubmit}>
                    <input type="search" placeholder={placeholderText} onChange={(e) => setInput(e.target.value)} value={input}/>
                    <button type="submit">Search</button>
                </form>
            </div>
        </div>
    )

}

export default SearchBar;