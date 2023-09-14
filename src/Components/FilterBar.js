import React, {useState} from "react";
import '../Styles/FilterBar.css';

const FilterBar = ({filters, subjects, fabEquipment, grades, onFilterChange}) => {

    const [selected, setSelected] = useState(filters);
    
    // console.log("Current filters: " + filters)
    // let i = 0
    // selected.forEach((item) => {
    //     console.log(i)
    //     console.log(item)
    //     i++
    // })

    // console.log("Science filter is selected: " + (selected[1] === "Science"))

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
            <div>
                <h4> Subject </h4>
                {subjects.map((subject) =>
                    <label id="checkbox" key={subject}>
                        <input id="subject-filter" type="checkbox" checked={selected.includes(subject)} onChange={() => handleFilterChange(subject)}>
                        </input>
                        {subject}
                    </label> 
                )}
                <br></br>
            </div>
            

            <div>
                <h4> Fabrication Equipment </h4>
                {fabEquipment.map((equipment) =>
                    <label id="checkbox" key={equipment}>
                        <input id="subject-filter" type="checkbox" checked={selected.includes(equipment)} onChange={() => handleFilterChange(equipment)}>
                        </input>
                        {equipment}
                    </label> 
                )}
                <br></br>
            </div>
            

            <div>
                <h4> Grade Level </h4>
                <div class="grade-checkboxes">
                    {grades.map((grade) =>
                        <label id="checkbox" key={grade}>
                            <input id="subject-filter" type="checkbox" checked={selected.includes(grade)} onChange={() => handleFilterChange(grade)}>
                            </input>
                            {grade}
                        </label> 
                    )}
                </div>
            </div>

            
            


        </div>
    );
};

export default FilterBar;