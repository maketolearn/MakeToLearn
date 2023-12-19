import React, {useState} from "react";
import '../Styles/FilterBar.css';

const FilterBarSubject = ({filters, fabEquipment, grades, onFilterChange}) => {

    const [selected, setSelected] = useState(filters);

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
        <div id="filter-box-subject">

            <h4> Fabrication Equipment </h4>
            {fabEquipment.map((equipment) =>
                <label class="filter-bar-labels" id="checkbox" key={equipment}>
                    <input id="subject-filter" type="checkbox" checked={selected.includes(equipment)} onChange={() => handleFilterChange(equipment)}>
                    </input>
                    {equipment}
                </label> 
            )}
            <br></br>

            <h4> Grade Level </h4>
            <div class="grade-checkboxes">
                {grades.map((grade) =>
                    <label class="filter-bar-labels" id="checkbox" key={grade}>
                        <input id="subject-filter" type="checkbox" checked={selected.includes(grade)} onChange={() => handleFilterChange(grade)}>
                        </input>
                        {grade}
                    </label> 
                )}
            </div>
            
        </div>
    );
};

export default FilterBarSubject;