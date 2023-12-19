// https://github.com/chaoocharles/add-remove-form-field/blob/main/src/App.js

import React, {useState} from 'react';

function DynamicField() {
  const [serviceList, setServiceList] = useState([{ service: "" }]);

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };

  return (
    <form className="App" autoComplete="off">
      <div className="form-field">
        {serviceList.map((singleService, index) => (
          <div key={index} className="services">
            <div>
              <input
                name="service"
                type="text"
                id="service"
                value={singleService.service}
                onChange={(e) => handleServiceChange(e, index)}
                required
              />
              {serviceList.length - 1 === index && (
                <button
                  type="button"
                  onClick={handleServiceAdd}
                  className="add-btn"
                  title="Add"
                >
                  <span><b>+</b></span>
                </button>
              )}
              {serviceList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => handleServiceRemove(index)}
                  className="remove-btn"
                  title="Delete"
                >
                  <span><b>-</b></span>
                </button>
              )}
            </div>
            {/* <div className="second-division">
              {serviceList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => handleServiceRemove(index)}
                  className="remove-btn"
                  title="Delete"
                >
                  <span><b>-</b></span>
                </button>
              )}
            </div> */}
          </div>
        ))}
      </div>
      {/* <div className="output">
        <h2>Output</h2>
        {serviceList &&
          serviceList.map((singleService, index) => (
            <ul key={index}>
              {singleService.service && <li>{singleService.service}</li>}
            </ul>
          ))}
      </div> */}
    </form>
  );
}

export default DynamicField;
