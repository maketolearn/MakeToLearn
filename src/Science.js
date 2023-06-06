import React from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import CategoryBannerScience from './Components/CategoryBannerScience';
import Search from './Components/Search';
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
          <Search></Search>
        </div>
      </body>
    </div>
    
  );
};

export default Science;