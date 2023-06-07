import React, {useState, useEffect} from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import CategoryBannerMathematics from './Components/CategoryBannerMathematics';
import Search from './Components/Search';
import axios from 'axios';
import './Styles/Page.css';

const Mathematics = () => {

  //pull all objects of subject Mathematical Sciences and display them

  const [imgUrl, setImgUrl] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [dois, setDOIS] = useState([]);
  const [mathObjects, setMathObjects] = useState([]);

  let objects = [];

  useEffect(() => {
    setImgUrl("");
    setTitle("");
    setAuthor("");
    setDesc("");
    setDOIS([]);

    //pull all dois
    axios.get("https://dataverse.lib.virginia.edu/api/dataverses/CADLibrary/contents")
    .then((response) => {
      for(var i = 0; i < response.data.data.length; i += 1){
        dois.push(response.data.data[i].identifier);
      }
      console.log(dois);

      dois.forEach(doi => {
        axios.get("https://dataverse.lib.virginia.edu/api/datasets/:persistentId/?persistentId=doi:10.18130/"+ doi)
        .then(object => {
          objects.push(object.data);
        })
        .catch((error) => console.log("Error: ", error));
      })

      console.log(objects);
    })
    .catch((error) => console.log("Error: ", error))

    console.log("Finished fetching");
  }, [])

  return (
    <div>
      <body>
        <div class="site">
          <MainHeader></MainHeader>
          <CategoryHeader></CategoryHeader>
          <CategoryBannerMathematics></CategoryBannerMathematics>
          <Search></Search>
        </div>
      </body>
    </div>
    
  );
};

export default Mathematics;