import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Science from './Science';
import Technology from './Technology';
import Engineering from './Engineering';
import Mathematics from './Mathematics';
import Forum from './Forum';
import Object from './Components/Object';

import { HashRouter} from "react-router-dom";
import { Routes, Route} from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App/>}></Route>
      <Route path="/science" element={<Science/>}></Route>
      <Route path="/technology" element={<Technology/>}></Route>
      <Route path="/engineering" element={<Engineering/>}></Route>
      <Route path="/mathematics" element={<Mathematics/>}></Route>
      <Route path="/forum" element={<Forum/>}></Route>
      <Route path="/objects/:doi" element={<Object/>}></Route>
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);
