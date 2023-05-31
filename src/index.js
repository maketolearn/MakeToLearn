import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
