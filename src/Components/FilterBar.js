import React, {useState} from "react";
import '../Styles/FilterBar.css';

const FilterBar = ({subjects, onFilterChange}) => {

    const [selected, setSelected] = useState([]);

    const handleFilterChange = (option) => {

        const isSelected = selected.includes(option);
        let updated = [];

        if(isSelected) {
            updated = selected.filter((filter) => filter !== option);
        } 
        else {
            updated = [...selected, option];
        }

        setSelected(updated);
        onFilterChange(updated);
    }



    return(
        <div id="filter-box">
            <h4> Subject </h4>
            {subjects.map((subject) =>
                <label id="checkbox" key={subject}>
                    <input id="subject-filter" type="checkbox" checked={selected.includes(subject)} onChange={() => handleFilterChange(subject)}>
                    </input>
                    {subject}
                </label> 
            )}

        </div>
    );
};

export default FilterBar;