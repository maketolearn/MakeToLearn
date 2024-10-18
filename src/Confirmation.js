import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import MainHeader from './Components/MainHeader'
import CategoryHeader from './Components/CategoryHeader'
import CategoryBanner from './Components/CategoryBanner'
import './Styles/Page.css'

const Confirmation = () => {
    const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState("")
    const [searchObjects, setSearchObjects] = useState([])
    const [subject, setSubject] = useState("Library")

    const handleSubmit = (event) => {
        event.preventDefault()
        setSearchObjects([])
        navigate(`/browse`, {state: searchTerm})
    }

    const handleButtonSubmit = (event) =>{
        event.preventDefault()
        navigate(`/`)
    }

    return (
        <div>
            <body>
                <div class="site">
                    <MainHeader input={searchTerm}  setInput={setSearchTerm} handleSubmit={handleSubmit} subject={subject} showFilter={false}></MainHeader>
                    <CategoryHeader></CategoryHeader>
                    <CategoryBanner subject=""></CategoryBanner>
                    <div id="page">
                        <p>You have successfully submitted. Please click the button below to return to home.</p>
                        <button type='button' onClick={handleButtonSubmit}>Return Home</button>
                    </div>
                </div>
            </body>
        </div>
    )
}

export default Confirmation