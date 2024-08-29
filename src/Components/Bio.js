import React, {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import parser from 'html-react-parser'
import MainHeader from "./MainHeader"
import CategoryHeader from "./CategoryHeader"
import "../Styles/Page.css"
import "../Styles/Object.css"

const Bio = () => {
    const {name} = useParams()
    
    const [searchTerm, setSearchTerm] = useState("")
    const [searchObjects, setSearchObjects] = useState([])
    const [subject, setSubject] = useState("Library")
    const [imageLocation, setImageLocation] = useState("")
    const [biography, setBiography] = useState([])

    const navigate = useNavigate()
    const firstName = name.split("-")[0]
    const lastName = name.split("-")[1]

    useEffect(() => {
        if(firstName === "Steven" && lastName === "Greenstein") {
            setImageLocation("/Steven.png")
            setBiography("<p> Steven Greenstein is an Associate Professor at Montclair State University in New Jersey. He earned his PhD in Mathematics Education from The University of Texas at Austin after serving as a high school mathematics teacher in Georgia and Texas for seven years. Steven teaches undergraduate mathematics methods and content courses as well as graduate courses in mathematics education. <br></br> Through his teaching and research, Steven seeks to determine and support the tools and practices with which educators can democratize access to authentic mathematical activity that honors the diversity of learner’s mathematical thinking and that is guided by self-directed and agentive inquiry, mathematical play, and the pursuit of wonder-ful ideas. </p>")
        } else if(firstName === "Allison" && lastName === "McCulloch") {
            setImageLocation("https://citejournal.org/wp-content/uploads/2022/05/Allison-McCulloch.jpg")
            setBiography("<p> Allison McCulloch is a professor of mathematics education in the Department of Mathematics and Statistics at University of North Carolina at Charlotte. She earned her Ph.D. in Mathematics Education from Rutgers University after serving as a middle and high school mathematics teacher in Texas and California for twelve years. She teaches undergraduate mathematics methods and content courses as well as graduate courses in mathematics education. <br></br> She has been an editorial panel member for the <i> Contemporary Issues in Technology and Teacher Education </i>, a long time AMTE member, and she served as president-elect, president, and past-president of the North Carolina chapter of AMTE (AMTE-NC). She has also served as a reviewer for various mathematics education journals. Her research focuses on understanding the development of students’ mathematical understandings in technology-mediated learning environments and preparing prospective and practicing teachers to incorporate technology in instruction in mathematically meaningful and equitable ways.</p>")
        } else if(firstName === "Sumreen" && lastName === "Asim") {
            setImageLocation("https://citejournal.org/wp-content/uploads/2023/01/Sumreen_Asim_web.jpg")
            setBiography("<p> Dr. Sumreen Asim is an associate professor of science and technology education at Indiana University Southeast (IUS). She currently teaches science, mathematics, and educational technology courses to both elementary and special education majors at the undergraduate and graduate student level. She earned her doctorate from the University of North Texas in Curriculum and Instruction. Over the last two decades she has focused her work to share, love and grow with fellow educators. Her work includes supporting preservice and in-service teachers in implementing inquiry-based instructional approaches. Her research interests are in collaborative efforts STEM education, culturally responsive teaching, inclusive pedagogy, and educational technology. She has managed several internal and external grants during her tenure at IUS. Additionally, she is an active member of several professional organization and loves to serve the science education community. She is the current co-chair for the Critical Theory in Teaching and Technology SIG for the Society for Informational Technology and Teacher Education and previously co-chaired the SITE Science SIG. </p>")
        } else if(firstName === "Elizabeth" && lastName === "Whitewolf") {
            setImageLocation("https://static.wixstatic.com/media/754ec7_7f0197c3d9c447e0b85661ff870f9a39~mv2.webp")
            setBiography("<p> Dr. Liz Whitewolf earned her Ed.D. in STEM Education from the University of Pittsburgh where she researched digital makerspace integration in K-12 education, her dissertation is titled 'Activating Digital Makerspaces for Authentic Student Learning: Supporting K-12 Teachers in Digital Technology Integration.' She is passionate about integrating digital fabrication technologies equitably in schools for students, teachers, and other stakeholders in education and founded eduFAB in 2021 to focus on this work internationally. <br></br> Previously the K-12 Education Director for Fab Foundation, Liz now consults with districts for strategic and sustainable digital makerspace development and integration through eduFAB. A 2016 graduate of FAB Academy, Liz opened an educational Fab Lab in Pittsburgh, eventually expanding the program to include two mobile fab lab units in addition to the museum-based makerspace. Liz served as Senior Director of STEM Education at Carnegie Science Center and previously was a classroom teacher and out of school time educator in robotics, computer programming, and engineering. <br></br> In addition to her eduFAB work, Liz manages the International Fab Educators Academy project for global teacher credentialing through school-based Fab Labs and is lead educational consultant to the STEM School Fab Lab project through USAID in Egypt. She is on the editorial board of the Objects to Think With: Digital Design and Fabrication Journal. Liz and her family are all makers and spend time experimenting and creating projects in their garage-based Fab Lab in their Pittsburgh home. </p>")
        } else if(firstName === "Ryan" && lastName === "Novitski") {
            setImageLocation("/Novitski.png")
            setBiography("<p> Ryan Novitski is the Director of STEM Learning at the International Technology and Engineering Education Association (ITEEA). This role involves development and delivery of integrative STEM courseware. He also ensures that all content is based on research and aligned with professional standards. He has served as a technology and engineering education instructor and as vice principal in a secondary school setting. He is currently serving as the Co-P.I. on three National Science Foundation grants related to STEM education, including the Educational CAD Model Library initiative. </p>")
        } else if(firstName === "Glen" && lastName === "Bull") {
            setImageLocation("/GlenBull.png")
            setBiography("<p> Glen Bull is a professor of education in the School of Education and Human Development at the University of Virginia. He taught the first educational computing course in the School of Education and established its educational computing program. He was a founder of the Virginia Society for Technology in Education, served as its president, and is a recipient of its lifetime achievement award. He subsequently was co-founder of the Society for Information Technology and Teacher Education (SITE), served as its president, and is a recipient of SITE’s award for <i> Outstanding Lifetime Achievement in Technology and Teacher Education </i>. He served as principal investigator for an initiative that established one of the nation’s first statewide K-12 internet systems. Virginia’s Public Education Network linked all 2,000 of Virginia’s schools. He is the founder of the <a href='https://ntls.info'> National Technology Leadership Summit </a>. He is the founding editor of <a href='https://citejournal.org'> <i> Contemporary Issues in Technology and Teacher Education </i> </a>. He is currently director of the Make to Learn Laboratory at the University of Virginia. He is a recipient of the Virginia Technology and Engineering Education Association (VTEEA) <i> Lynn P. Barrier Engineering Leadership Award </i> for 'state and national leadership that advances the study of design and engineering in K-12 education.' The NTLS Educational CAD Model Library is an extension of prior work related to hands-on learning. </p>")
        }
    }, [])

    // Function to handle searching in the search bar
    const handleSubmit = (event) => {
        event.preventDefault()
        setSearchObjects([])
        navigate(`browse`, {state: searchTerm});
    }

    return (
        <div>
            <body>
                <div class="site">
                    <MainHeader input={searchTerm}  setInput={setSearchTerm} handleSubmit={handleSubmit} subject={subject} showFilter={false}></MainHeader>
                    <CategoryHeader></CategoryHeader>
                    <div id="page">
                        <h2> {firstName} {lastName} </h2>
                        <br></br>
                        <div class="desktop-object">
                            <img id="img-profile" src={imageLocation} alt="Profile Picture Not Found" align="left"></img>
                            {parser(`${biography}`)}
                        </div>

                        <div class="mobile-object">
                            <div class="centered">
                                <img id="img-profile" src={imageLocation} alt="Profile Picture Not Found" align="center"></img>
                                {parser(`${biography}`)}
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    )
}

export default Bio