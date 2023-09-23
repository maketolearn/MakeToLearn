import React, {useState, useEffect} from "react";
import "../Styles/Object.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainHeader from './MainHeader';
import { useNavigate } from 'react-router-dom';
import CategoryHeader from './CategoryHeader';
import '../Styles/Page.css';


const Bio = () => {
    const { name } = useParams();

    const [searchTerm, setSearchTerm] = useState("");
    const [searchObjects, setSearchObjects] = useState([]);
    const [subject, setSubject] = useState("Library");
    const [imgLocation, setImgLocation] = useState("")
    const [description, setDescription] = useState([]) // array for easy storage of paragraphs

    const navigate = useNavigate();
    const namePieces = name.split("-");
    const firstName = namePieces[0];
    const lastName =  namePieces[1];

    const [isAllison, setIsAllison] = useState(false)

    useEffect(() => {
        let paragraphs = []
        if(firstName === "Steven" && lastName === "Greenstein"){
            setImgLocation("/Steven.png")
            paragraphs.push("Steven Greenstein is an Associate Professor at Montclair State University in New Jersey. He earned his PhD in Mathematics Education from The University of Texas at Austin after serving as a high school mathematics teacher in Georgia and Texas for seven years. Steven teaches undergraduate mathematics methods and content courses as well as graduate courses in mathematics education.")
            paragraphs.push("Through his teaching and research, Steven seeks to determine and support the tools and practices with which educators can democratize access to authentic mathematical activity that honors the diversity of learner’s mathematical thinking and that is guided by self-directed and agentive inquiry, mathematical play, and the pursuit of wonder-ful ideas.")
            setDescription(paragraphs)
        }
        else if(firstName === "Allison" && lastName === "McCulloch"){
            setIsAllison(true)
            setImgLocation("https://citejournal.org/wp-content/uploads/2022/05/Allison-McCulloch.jpg")
            paragraphs.push("Allison McCulloch is a professor of mathematics education in the Department of Mathematics and Statistics at University of North Carolina at Charlotte. She earned her Ph.D. in Mathematics Education from Rutgers University after serving as a middle and high school mathematics teacher in Texas and California for twelve years. She teaches undergraduate mathematics methods and content courses as well as graduate courses in mathematics education.")
            setDescription(paragraphs)
            console.log(isAllison)
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchObjects([]);
        navigate(`/browse`, {state: searchTerm});
    }

    return (
        <div>
            <body>
                <div class="site">
                <MainHeader input={searchTerm}  setInput={setSearchTerm} handleSubmit={handleSubmit} subject={subject} showFilter={false}></MainHeader>
                    <CategoryHeader></CategoryHeader>
                    <div id="page">
                        <h2>{firstName} {lastName}</h2>
                        <br></br>
                        <div class="desktop-object">
                            <img id="img-single" src={imgLocation} alt="Object Thumbnail Not Found" align="left"></img>
                            {description.map((paragraph, i) => (
                                <p> {paragraph} </p>
                            ))} 
                            {isAllison && <p>She has been an editorial panel member for the <em>Contemporary Issues in Technology and Teacher Education</em>, a long time AMTE member, and she served as president-elect, president, and past-president of the North Carolina chapter of AMTE (AMTE-NC). She has also served as a reviewer for various mathematics education journals. Her research focuses on understanding the development of students’ mathematical understandings in technology-mediated learning environments and preparing prospective and practicing teachers to incorporate technology in instruction in mathematically meaningful and equitable ways. </p>}
                         
                        </div>

                        <div class="mobile-object">
                            <div class="centered"><img id="img-single" src={imgLocation} alt="Object Thumbnail Not Found" align="center"></img></div>
                            {description.map((paragraph, i) => (
                                <p> {paragraph} </p>
                            ))} 
                         
                        </div>
                    </div>
                </div>
            </body>
        </div>

    )
}

export default Bio;