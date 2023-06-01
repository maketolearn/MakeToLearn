import React from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import CategoryBanner from './Components/CatgeoryBanner';
import { Link } from 'react-router-dom';
import './Styles/Page.css';

const App = () => {
  return (
    <div>
      <body>
        <div id="page" class="site">
          <MainHeader></MainHeader>
          <CategoryHeader></CategoryHeader>
          <CategoryBanner name={"ObjectsToThinkWith"}></CategoryBanner>
        </div>
      </body>
    </div>
    
  );
};

export default App;