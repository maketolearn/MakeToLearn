import React from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import CategoryBannerTechnology from './Components/CategoryBannerTechnology';
import Search from './Components/Search';
import './Styles/Page.css';

const Technology = () => {
  return (
    <div>
      <body>
        <div class="site">
          <MainHeader></MainHeader>
          <CategoryHeader></CategoryHeader>
          <CategoryBannerTechnology></CategoryBannerTechnology>
          <Search></Search>
        </div>
      </body>
    </div>
    
  );
};

export default Technology;