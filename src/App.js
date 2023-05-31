import React from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import './Styles/MainHeader.css';

const App = () => {
  return (
    <div id="page" class="site">
      <MainHeader></MainHeader>
      <CategoryHeader></CategoryHeader>
    </div>
  );
};

export default App;