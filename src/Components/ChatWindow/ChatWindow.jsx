import ChatForm from "../ChatForm/ChatForm";
import Chats from "../Chats/Chats";
import './ChatWindow.css'; 
import Conversation from "../Conversation/Conversation";
import Query from "../Query/Query";
import Hamburger from "../Hamburger/Hamburger";
import Slider from '../Slider/Slider'
import { useEffect } from "react";

const ChatWindow = ({query, setQuery, displaySlider, setDisplaySlider, flag, setFlag}) =>
{
    useEffect(() => {
        // Update theme here if needed
    },[])

    return(
        <div className="chat-window-container"> 
            <div className="header"> 
                <div onClick={() => setDisplaySlider(true)} className="slider"> 
                    <Hamburger/>
                </div>
                <div className="heading"> 
                    {!flag ? <p className="name">BotAI</p> : <p className="convheader">Conversation History</p>} 
                </div>
                
            </div>
            {displaySlider && <Slider setQuery={setQuery} setDisplaySlider={setDisplaySlider} setFlag={setFlag}/>}
            {flag ? <Conversation/> : (query ? <Chats query={query}/> : <Query setQuery={setQuery}/>)}
            {!flag && <ChatForm setQuery={setQuery}/>}
        </div>
    )
}

export default ChatWindow;