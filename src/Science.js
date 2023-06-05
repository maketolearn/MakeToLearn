import React from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import CategoryBannerScience from './Components/CatgeoryBannerScience';
import { Link } from 'react-router-dom';
import './Styles/Page.css';

const Science = () => {
  return (
    <div>
      <body>
        <div class="site">
          <MainHeader></MainHeader>
          <CategoryHeader></CategoryHeader>
          <CategoryBannerScience></CategoryBannerScience>
        </div>
      </body>
    </div>
    
  );
};

export default Science;