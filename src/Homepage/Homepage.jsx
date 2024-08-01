import { useState } from "react";
import ChatWindow from "../Components/ChatWindow/ChatWindow";
import Sidebar from "../Components/Sidebar/Sidebar";
import './Homepage.css'

const Home = () =>
{
    const [query, setQuery] = useState(null);
    const [flag, setFlag] = useState(false);
    const [displaySlider, setDisplaySlider] = useState(false);

    return(
        <div className='home-container'>
            <div className='home-sidebar'>
                <Sidebar 
                    setFlag={setFlag} 
                    setQuery={setQuery}
                />
            </div>

            <ChatWindow 
                query={query} 
                setQuery={setQuery} 
                displaySlider={displaySlider} 
                setDisplaySlider={setDisplaySlider} 
                flag={flag} 
                setFlag={setFlag}/>
        </div>
    )
}

export default Home;