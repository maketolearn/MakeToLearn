import React, {useState, useEffect} from 'react';
import MainHeader from './Components/MainHeader';
import CategoryHeader from './Components/CategoryHeader';
import SearchResultDisplay from './Components/SearchResultDisplay';
import FilterBarSubject from './Components/FilterBarSubject';
import './Styles/Page.css';
import axios from 'axios';
import CategoryBanner from './Components/CategoryBanner';

const Subject = ({ subjectArg }) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchObjects, setSearchObjects] = useState([]);
  const [subject, setSubject] = useState(subjectArg);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [filterObjects, setFilterObjects] = useState([]); // objects to be filtered on
  const [fabEquipment, setFabEquipment] = useState([]);
  const grades = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  // const fabEquipment = ['Scissors', 'Die Cutter', 'Laser Cutter', '3D Printer']

  let imgUrl = "";
  let title = "";
  let author = "";
  let desc = "";
  let dois = [];
  let objects = [];
  let equipmentList = [];
  let subjectCapitalized = subject.charAt(0).toUpperCase() + subject.slice(1);

  useEffect(() => {
    setSearchObjects([]);
    setSearchTerm("");
    pullFacets();
    pullAllCards();
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchObjects([]);
    setSearchPhrase("");
    searchByPhrase();
  }

  const pullFacets = async() => {
    axios.get("https://dataverse.lib.virginia.edu/api/search?q=*&show_facets=true&subtree=CADLibrary")
    .then((response) => {
      let facets = response.data.data.facets[0];
      
      //setting facets for fab equipment
      facets.fabEquipment_ss.labels.forEach(equipment => {
        // console.log(Object.keys(equipment)[0])
        equipmentList =  [Object.keys(equipment)[0], ...equipmentList];
        setFabEquipment(equipmentList);
      })
      console.log(fabEquipment)
    })
    .catch((error) => console.log("Error: ", error));
  }

  const pullAllCards = async() => {
    //pull all dois
    axios.get("https://dataverse.lib.virginia.edu/api/dataverses/CADLibrary/contents")
    .then((response) => {
    for(var i = 0; i < response.data.data.length; i += 1){
        dois.push(response.data.data[i].identifier);
    }

    dois.forEach(doi => {
        axios.get("https://dataverse.lib.virginia.edu/api/datasets/:persistentId/?persistentId=doi:10.18130/"+ doi)
        .then(object => {
            if(object.data.data.latestVersion.metadataBlocks.citation.fields[5].value[0].keywordValue.value === subject){
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

                objects = [{imgUrl: imgUrl, title: title, author: author, desc: desc, doi: doi}, ...objects];
                let sortedObjects = objects.sort((obj1, obj2) => (obj1.title > obj2.title) ? 1 : (obj1.title < obj2.title) ? -1 : 0)
                setSearchObjects(sortedObjects);
                setFilterObjects(sortedObjects);
            }
            else if (subject === "library") {
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

                objects = [{imgUrl: imgUrl, title: title, author: author, desc: desc, doi: doi}, ...objects];
                let sortedObjects = objects.sort((obj1, obj2) => (obj1.title > obj2.title) ? 1 : (obj1.title < obj2.title) ? -1 : 0)
                setSearchObjects(sortedObjects);
                setFilterObjects(sortedObjects);
            }
        })
        .catch((error) => console.log("Error: ", error));
    })
    })
    .catch((error) => console.log("Error: ", error))
  }

  const searchByPhrase = async() => {
    // in case of empty search, return all
    if (searchTerm === "") {
      pullAllCards();
      setSearchPhrase(searchTerm);
      return;
    }
    try {
        axios.get('https://dataverse.lib.virginia.edu/api/search?type=dataset&per_page=30&subtree=CADLibrary&q="' + searchTerm + '"')
        .then((response) => {
          if (response.data.data.count_in_response === 0) {
              objects = [];
              setSearchObjects(objects);
              searchByKeyword();
              return;
          }
          for(var i = 0; i < response.data.data.count_in_response; i += 1){
              dois.push(response.data.data.items[i].global_id);
          }
          dois.forEach(doi => {
            axios.get("https://dataverse.lib.virginia.edu/api/datasets/:persistentId/?persistentId="+ doi)
            .then(object => {
                
              if(object.data.data.latestVersion.metadataBlocks.citation.fields[5].value[0].keywordValue.value === subject){
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

                let doiIdentifier = doi.substring(13);
    
                objects = [{imgUrl: imgUrl, title: title, author: author, desc: desc, doi: doiIdentifier}, ...objects];
                let sortedObjects = objects.sort((obj1, obj2) => (obj1.title > obj2.title) ? 1 : (obj1.title < obj2.title) ? -1 : 0)
                setSearchObjects(sortedObjects);
                setFilterObjects(sortedObjects);
              }
            })
            .catch((error) => console.log("Error: ", error));
          })
        })
    } catch(err) {
        console.log("The following Data had an error")
        console.log(err)
        console.log("")
    }
  }

  const searchByKeyword = async() => {
    // in case of empty search, return all
    if (searchTerm === "") {
      pullAllCards();
      setSearchPhrase(searchTerm);
      return;
    }
    try {
        axios.get('https://dataverse.lib.virginia.edu/api/search?type=dataset&per_page=30&subtree=CADLibrary&q=' + searchTerm)
        .then((response) => {
          if (response.data.data.count_in_response === 0) {
              objects = [];
              setSearchObjects(objects);
              return;
          }
          setSearchPhrase(searchTerm);
          for(var i = 0; i < response.data.data.count_in_response; i += 1){
              dois.push(response.data.data.items[i].global_id);
          }
          dois.forEach(doi => {
            axios.get("https://dataverse.lib.virginia.edu/api/datasets/:persistentId/?persistentId="+ doi)
            .then(object => {
                
              if(object.data.data.latestVersion.metadataBlocks.citation.fields[5].value[0].keywordValue.value === subject){
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

                let doiIdentifier = doi.substring(13);
    
                objects = [{imgUrl: imgUrl, title: title, author: author, desc: desc, doi: doiIdentifier}, ...objects];
                let sortedObjects = objects.sort((obj1, obj2) => (obj1.title > obj2.title) ? 1 : (obj1.title < obj2.title) ? -1 : 0)
                setSearchObjects(sortedObjects);
                setFilterObjects(sortedObjects);
              }
            })
            .catch((error) => console.log("Error: ", error));
          })
        })
    } catch(err) {
        console.log("The following Data had an error")
        console.log(err)
        console.log("")
    }
  }

  const pullAllCardsByFilter = async(filters) => {

    filterObjects.forEach(filterObject => {
      if(filterObject.doi.length >= 13){
        dois.push(filterObject.doi.substring(13));
      } else {
        dois.push(filterObject.doi);
      }

      
    });

    let resultsFound = false;

    dois.forEach(doi => {
      // console.log(doi);
        axios.get("https://dataverse.lib.virginia.edu/api/datasets/:persistentId/?persistentId=doi:10.18130/"+ doi)
        .then(object => {

          //gather all values from filter fields 
          //change the educational cad api response to a dictionary
          let educationalCADBlock = object.data.data.latestVersion.metadataBlocks.educationalcad.fields;
          let educationCADMetadata = {};
          for(let i = 0; i < educationalCADBlock.length; i++){
              let key = educationalCADBlock[i].typeName;
              educationCADMetadata[key] = educationalCADBlock[i].value;
          }
          let filterValues = [];
          filterValues.push(educationCADMetadata['discipline'].primaryDiscipline.value);
          educationCADMetadata['fabEquipment'].forEach((equipment) => {
            filterValues.push(equipment);
          })
          console.log(filterValues);
          filters.every(elem => {
            console.log(elem)
            console.log(filterValues.includes(elem))})

          if(filters.every(elem => filterValues.includes(elem))){
            resultsFound = true;
            console.log("TRUE");
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

            objects = [{imgUrl: imgUrl, title: title, author: author, desc: desc, doi: doi}, ...objects];
            let sortedObjects = objects.sort((obj1, obj2) => (obj1.title > obj2.title) ? 1 : (obj1.title < obj2.title) ? -1 : 0)
            console.log(sortedObjects);
            setSearchObjects(sortedObjects);
            console.log(searchObjects);
          }

          // if(filters.includes(object.data.data.latestVersion.metadataBlocks.citation.fields[5].value[0].keywordValue.value)){
          //   resultsFound = true;
          //   console.log("TRUE");
          //     title = object.data.data.latestVersion.metadataBlocks.citation.fields[0].value;
          //     author = object.data.data.latestVersion.metadataBlocks.citation.fields[1].value[0].authorName.value;
          //     desc = object.data.data.latestVersion.metadataBlocks.citation.fields[3].value[0].dsDescriptionValue.value;

          //     let imgID = -1
          //     let files = object.data.data.latestVersion.files

          //     for (let i = 0; i < files.length; i++) {
          //         if (files[i].label.toLowerCase().slice(-3) === "png" || files[i].label.toLowerCase().slice(-3) === "jpg" || files[i].label.toLowerCase().slice(-4) === "jpeg"){
          //             imgID = files[i].dataFile.id
          //         }
          //     }

          //     imgUrl = "https://dataverse.lib.virginia.edu/api/access/datafile/" + imgID;

          //     objects = [{imgUrl: imgUrl, title: title, author: author, desc: desc, doi: doi}, ...objects];
          //     let sortedObjects = objects.sort((obj1, obj2) => (obj1.title > obj2.title) ? 1 : (obj1.title < obj2.title) ? -1 : 0)
          //     console.log(sortedObjects);
          //     setSearchObjects(sortedObjects);
          //     console.log(searchObjects);
          // }
        })
      .catch((error) => console.log("Error: ", error));
    })

    if(!resultsFound){
      setSearchObjects([]);
    }
  }

  const handleFilterChange = (filters) => {
    console.log(filters);
    if(filters.length === 0){
      searchByPhrase();
    }
    else {
      // let lowercase = [];
      // filters.forEach(filter => {
      //   lowercase.push(filter[0].toLowerCase() + filter.substring(1));
      // })
      pullAllCardsByFilter(filters);
    }
  }

  return (
    <div>
      <body>
        <div class="site">
          <MainHeader input={searchTerm}  setInput={setSearchTerm} handleSubmit={handleSubmit} subject={subjectCapitalized}></MainHeader>
          <CategoryHeader></CategoryHeader>
          <CategoryBanner subject={subjectCapitalized}></CategoryBanner>
          <div id="page">
            <h2>Browse {subjectCapitalized} Objects</h2>
            <div class="results">
                <FilterBarSubject fabEquipment={fabEquipment} grades={grades} onFilterChange={(handleFilterChange)}></FilterBarSubject>
                <SearchResultDisplay searchObjects={searchObjects} searchPhrase={searchPhrase} cardDisplay={"cards"} subject={subjectArg}></SearchResultDisplay>
            </div>
            {/* <SearchResultDisplay searchObjects={searchObjects} searchPhrase={searchPhrase} cardDisplay={"cards-no-filter"} subject={subjectArg} ></SearchResultDisplay> */}
          </div>
        </div>
      </body>
    </div>
    
  );
};

export default Subject;