import React from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import CategoryBannerEngineering from './Components/CategoryBannerEngineering';
import { Link } from 'react-router-dom';
import './Styles/Page.css';

const Engineering = () => {
  return (
    <div>
      <body>
        <div class="site">
          <MainHeader></MainHeader>
          <CategoryHeader></CategoryHeader>
          <CategoryBannerEngineering></CategoryBannerEngineering>
        </div>
      </body>
    </div>
    
  );
};

export default Engineering;