import React from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import CategoryBannerTechnology from './Components/CategoryBannerTechnology';
import { Link } from 'react-router-dom';
import './Styles/Page.css';

const Technology = () => {
  return (
    <div>
      <body>
        <div class="site">
          <MainHeader></MainHeader>
          <CategoryHeader></CategoryHeader>
          <CategoryBannerTechnology></CategoryBannerTechnology>
        </div>
      </body>
    </div>
    
  );
};

export default Technology;