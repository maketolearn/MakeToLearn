import React, {useState, useEffect} from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import CategoryBannerMathematics from './Components/CategoryBannerMathematics';
import ObjectCard from './Components/ObjectCard';
import Search from './Components/Search';
import axios, { all } from 'axios';
import './Styles/Page.css';

const Mathematics = () => {

  //pull all objects of subject Mathematical Sciences and display them

  let imgUrl = "";
  let title = "";
  let author = "";
  let desc = "";
  let dois = [];

  const [allMathObjects, setAllMathObjects] = useState([]);

  useEffect(() => {
    //pull all dois
    axios.get("https://dataverse.lib.virginia.edu/api/dataverses/CADLibrary/contents")
    .then((response) => {
      for(var i = 0; i < response.data.data.length; i += 1){
        dois.push(response.data.data[i].identifier);
      }
      
      let mathObjects = []; 

      dois.forEach(doi => {
        axios.get("https://dataverse.lib.virginia.edu/api/datasets/:persistentId/?persistentId=doi:10.18130/"+ doi)
        .then(object => {
          // console.log(object.data.data.latestVersion.metadataBlocks.citation.fields[4].value[0]);
          //console.log(object.data.data.identifier);
          if(object.data.data.latestVersion.metadataBlocks.citation.fields[4].value[0] === 'Mathematical Sciences'){
            title = object.data.data.latestVersion.metadataBlocks.citation.fields[0].value;
            author = object.data.data.latestVersion.metadataBlocks.citation.fields[1].value[0].authorName.value;
            desc = object.data.data.latestVersion.metadataBlocks.citation.fields[3].value[0].dsDescriptionValue.value;

            let imgID = -1
            let files = object.data.data.latestVersion.files

            for (let i = 0; i < files.length; i++) {
                if (files[i].label.toLowerCase().slice(-3) === "png" || files[i].label.toLowerCase().slice(-3) === "jpg" || files[i].label.toLowerCase().slice(-4) === "jpeg"){
                    imgID = files[i].dataFile.id
                }
            }

            imgUrl = "https://dataverse.lib.virginia.edu/api/access/datafile/" + imgID;

            mathObjects = [{imgUrl: imgUrl, title: title, author: author, desc: desc}, ...mathObjects];
            setAllMathObjects(mathObjects);
          }
        })
        .catch((error) => console.log("Error: ", error));
      })
    })
    .catch((error) => console.log("Error: ", error))
  }, [])

  console.log(allMathObjects);

  return (
    <div>
      <body>
        <div class="site">
          <MainHeader></MainHeader>
          <CategoryHeader></CategoryHeader>
          <CategoryBannerMathematics></CategoryBannerMathematics>
          <Search></Search>

          <div class="cards" id="page">
            {allMathObjects.map((object, i) => (
                <ObjectCard objImageUrl={object.imgUrl} objTitle={object.title} objAuthor={object.author} objDescription={object.desc} key={i}/>
            ))}
          </div>
        </div>
      </body>
    </div>
    
  );
};

export default Mathematics;