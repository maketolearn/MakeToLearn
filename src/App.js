import React from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import CategoryBannerHome from './Components/CategoryBannerHome';
import './Styles/Page.css';

const App = () => {
  return (
    <div>
      <body>
        <div class="site">
          <MainHeader></MainHeader>
          <CategoryHeader></CategoryHeader>
          <CategoryBannerHome></CategoryBannerHome>
        </div>
      </body>
    </div>
    
  );
};

export default App;