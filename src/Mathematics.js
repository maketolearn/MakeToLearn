import React from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import CategoryBannerMathematics from './Components/CategoryBannerMathematics';
import { Link } from 'react-router-dom';
import './Styles/Page.css';

const Mathematics = () => {
  return (
    <div>
      <body>
        <div class="site">
          <MainHeader></MainHeader>
          <CategoryHeader></CategoryHeader>
          <CategoryBannerMathematics></CategoryBannerMathematics>
        </div>
      </body>
    </div>
    
  );
};

export default Mathematics;