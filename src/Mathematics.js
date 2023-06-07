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
      
      dois.forEach(doi => {
        axios.get("https://dataverse.lib.virginia.edu/api/datasets/:persistentId/?persistentId=doi:10.18130/"+ doi)
        .then(object => {
          if(object.data.latestVersion.metadataBlocks.citation.fields[4].value === 'Mathematical Sciences'){
            let title = object.data.latestVersion.metadataBlocks.citation.fields[0].value
            let author = object.data.latestVersion.metadataBlocks.citation.fields[1].value[0].authorName.value
            let desc = object.data.latestVersion.metadataBlocks.citation.fields[3].value[0].dsDescriptionValue.value

            let imgID = -1
            let files = object.data.latestVersion.files

            for (let i = 0; i < files.length; i++) {
                if (files[i].label.toLowerCase().slice(-3) === "png" || files[i].label.toLowerCase().slice(-3) === "jpg" || files[i].label.toLowerCase().slice(-4) === "jpeg"){
                    imgID = files[i].dataFile.id
                }
            }

            let imgUrl = "https://dataverse.lib.virginia.edu/api/access/datafile/" + imgID

            setImgUrl(imgUrl);
            setTitle(title);
            setAuthor(author);
            setDesc(desc);
            setMathObjects([{imgUrl: imgUrl, title: title, author: author, desc: desc}, ...mathObjects]);
            setImgUrl("");
            setTitle("");
            setAuthor("");
            setDesc("");
          }
        })
        .catch((error) => console.log("Error: ", error));
      })
      console.log(mathObjects);
    })
    .catch((error) => console.log("Error: ", error))
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