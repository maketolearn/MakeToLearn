import React, {useState} from "react";
import '../Styles/FilterBar.css';

const FilterBarSubject = ({fabEquipment, grades, onFilterChange}) => {

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

            <h4> Fabrication Equipment </h4>
            {fabEquipment.map((equipment) =>
                <label id="checkbox" key={equipment}>
                    <input id="subject-filter" type="checkbox" checked={selected.includes(equipment)} onChange={() => handleFilterChange(equipment)}>
                    </input>
                    {equipment}
                </label> 
            )}
            <br></br>

            <h4> Grade Level </h4>
            {grades.map((grade) =>
                <label id="checkbox" key={grade}>
                    <input id="subject-filter" type="checkbox" checked={selected.includes(grade)} onChange={() => handleFilterChange(grade)}>
                    </input>
                    {grade}
                </label> 
            )}


        </div>
    );
};

export default FilterBarSubject;