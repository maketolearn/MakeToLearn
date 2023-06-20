import React from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import CategoryBannerForum from './Components/CategoryBannerForum';
import './Styles/Page.css';

const Forum = () => {
  return (
    <div>
      <body>
        <div class="site">
          <MainHeader></MainHeader>
          <CategoryHeader></CategoryHeader>
          <CategoryBannerForum></CategoryBannerForum>

          <div id="page">
            <p>An open-source discussion tool, Discourse, is used to support discussions related to the CAD Library. You can access the CAD Library forum hosted by Discourse through this link:</p>

            <a href="https://forum.cadlibrary.org/" target='_blank'>CAD Library Forum</a>

         
            
          </div>
        </div>
      </body>
    </div>
    
  );
};

export default Forum;