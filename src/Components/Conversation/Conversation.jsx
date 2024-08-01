import { useChat } from "../../Api/ChatContext";
import ChatCards from "../ChatCards/ChatCards";
import './Conversation.css';

const Conversation = () => {
    const { selectedChat } = useChat();

    return (
        <div className="conversation-container">
            <p className="conversation-day">Today’s Chats</p>
            {selectedChat.map((data, index) => (
                <div key={index} className="conversation-cards">
                    <ChatCards query={data.question} time={data.time} chatType="saved" />
                    <ChatCards response={data.answer} type="response" chatType="saved" time={data.time} rating={data.rating} feedback={data.feedback} />
                </div>
            ))}
        </div>
    );
}

export default Conversation;