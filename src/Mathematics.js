import React from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import CategoryBanner from './Components/CatgeoryBannerScience';
import { Link } from 'react-router-dom';
import './Styles/Page.css';

const Mathematics = () => {
  return (
    <div>
      <body>
        <div class="site">
          <MainHeader></MainHeader>
          <CategoryHeader></CategoryHeader>
          <CategoryBanner name={"Mathematics"}></CategoryBanner>
        </div>
      </body>
    </div>
    
  );
};

export default Mathematics;