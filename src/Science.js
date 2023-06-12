import React from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import CategoryBannerScience from './Components/CategoryBannerScience';
import Search from './Components/Search';
import './Styles/Page.css';

const Science = () => {
  return (
    <div>
      <body>
        <div class="site">
          <MainHeader></MainHeader>
          <CategoryHeader></CategoryHeader>
          <CategoryBannerScience></CategoryBannerScience>
          <Search subject='Science'></Search>
        </div>
      </body>
    </div>
    
  );
};

export default Science;