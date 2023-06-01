import React from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import './Styles/Page.css';

const App = () => {
  return (
    <div>
      <body>
        <div id="page" class="site">
          <MainHeader></MainHeader>
          <CategoryHeader></CategoryHeader>
        </div>
      </body>
    </div>
    
  );
};

export default App;