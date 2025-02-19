import { useEffect, useState } from 'react';
import ChatCards from '../ChatCards/ChatCards'
import './Chats.css'
import { Responses } from './Responses';
import { useChat } from '../../Api/ChatContext';

export const chatId = () =>
    {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let result ='';
    for(let i=0;i<6;i++)
    {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result;
}

const Chats = ({query}) =>
{

    const [response, setResponse] = useState(null);
    const [time, setTime] = useState('');
    const { chat, getCurrentChat, updateCurrentChat } = useChat();

    useEffect(()=>
    {
        getCurrentChat();
    },[])

    useEffect(() =>
    {
        setTimeout(()=>
        {
            getResponse();
        },500)
    },[query])

    useEffect(()=>
    {   
        chatHistory();
    },[response])

    const generateTime = () =>
    {
        const date = new Date();
        const hour = date.getHours();
        const hourformat = hour>12 ? hour%12 : hour
        const minutes = date.getMinutes();
        const timing = hour>=12 ? 'PM' : 'AM';
        const timeformat = (hourformat) +':' +(minutes<10 ? '0'+minutes : minutes) +' ' +timing ;
        setTime(timeformat);
        return timeformat;
    }
    
    const chatHistory = () =>
    {
        if(query === null)
            return;

        if(response === null)
            return;

        const newChat = {id: chatId(), question: query, answer: response, time: generateTime(), rating : 0, feedback : ''}
        
        updateCurrentChat(newChat);
    }

    const getResponse = () =>
    {
        const pattern = new RegExp(`\\b${query}\\b`,"i")
        const filteredresponse = Responses.filter((data) => pattern.test(data.question.toLocaleLowerCase()));
        setResponse(filteredresponse.length ? filteredresponse[0].response : "Sorry, I'm unable to answer that");
    }

    return(
        <div className="chats-container">
            {chat?.map((data)=>
            (
                <div key={data?.id}>
                    <ChatCards 
                        query={data?.question} 
                        chattime={data?.time} 
                        time={time}/>
                    
                    {response && 
                    <ChatCards 
                        response={data?.answer} 
                        type="response" 
                        chattime={data?.time} 
                        time={time} id={data?.id} 
                        rating={data.rating} 
                        feedback={data.feedback}/>}
                </div>
            ))}
        </div>
    )
}

export default Chats