import React from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import CategoryBannerMathematics from './Components/CategoryBannerMathematics';
import SearchBar from './Components/SearchBar';
import './Styles/Page.css';

const Mathematics = () => {
  return (
    <div>
      <body>
        <div class="site">
          <MainHeader></MainHeader>
          <CategoryHeader></CategoryHeader>
          <CategoryBannerMathematics></CategoryBannerMathematics>
          <SearchBar></SearchBar>
        </div>
      </body>
    </div>
    
  );
};

export default Mathematics;