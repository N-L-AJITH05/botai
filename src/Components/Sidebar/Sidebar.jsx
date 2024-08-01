import './Sidebar.css'
import logo from '../../Assets/logo.png'
import newchat from '../../Assets/newchat.png'
import { useChat } from '../../Api/ChatContext'
import { useEffect, useState } from 'react'
import Ratings from '../../Components/Ratings/Ratings'
import up from '../../Assets/up.png'
import down from '../../Assets/down.png'
import { enqueueSnackbar } from 'notistack'


const Sidebar = ({ setQuery, setFlag, setDisplaySlider, type }) => {
    const { getCurrentChat, getChatHistory, chatHistory, selectedChatHistory } = useChat();
    const [displayRatings, setDisplayRatings] = useState(false);
    const [displayConvList, setDisplayConvList] = useState(false);
    const [active, setActive] = useState(-1);

    useEffect(() => {
        getChatHistory();
    }, [getChatHistory])

    const handleClick = () => {
        localStorage.removeItem('CurrentChat');
        getCurrentChat();
        setFlag(false);
        setQuery(null);
        setActive(-1);
        if (type === "slider")
            setDisplaySlider(false);
    }

    const handleChatHistory = (index) => {
        setFlag(true);
        setActive(index);
        selectedChatHistory(chatHistory[index]);
        if (type === "slider")
            setDisplaySlider(false);
    }

    return (
        <div className="sidebar-container">
            <div className="sidebar-newchat">
                <img src={logo} alt="logo" />
                <p>New Chat</p>
                <img
                    src={newchat}
                    alt="img"
                    onClick={handleClick} />
            </div>

            <p className="sidebar-chat-history">
                Past Conversations
                <img src={displayConvList ? up : down}
                    alt="navigation"
                    onClick={() => {
                        if (!chatHistory)
                            return enqueueSnackbar('No past conversations. Save your conversations, to visit them here later')
                        setDisplayConvList(!displayConvList)
                    }
                    } />
            </p>

            {displayConvList && <div className="sidebar-conversations">
                {chatHistory?.map((chat, index) =>
                (
                    <span
                        key={index}
                        className={index === active ? "sidebar-pill sidebar-active" : "sidebar-pill"}
                        onClick={() => handleChatHistory(index)}>
                        {chat[0].question.slice(0, 20) + ' ...'}
                    </span>
                ))}
            </div>}

            <hr></hr>

            <p className="sidebar-rating"
                onClick={() => {
                    if (!chatHistory)
                        return enqueueSnackbar('No saved conversations/feedback')
                    setDisplayRatings(true)
                }
                }>
                Ratings & Feedback
            </p>

            {displayRatings && <Ratings setDisplayRatings={setDisplayRatings} />}
            <span className="sidebar-close" onClick={() => setDisplaySlider(false)}>X</span>
        </div>
    )
}

export default Sidebar