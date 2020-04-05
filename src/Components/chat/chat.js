import React from 'react';
import useChat from '../../Hooks/useChat';
import MessageBox from './messageBox';
import Messages from './messages';
import './chat.css';


//TODO: change messages to a map
//TODO: for web - show profile of person you are talking to on right, for mobile just chat
const Chat = () => {

    //TODO: replace hardcoded messages with these ones
//    const { messages, sendMessage } = useChat();

    const handleSendMessage = ({message}) => {
        console.log({message})
        // sendMessage({message})
    }
    return (
    <div className="chat-container">

        <Messages messages={[
            "message 1",
            "message 2", 
            "message 3",
            "message 4"
        ]}/>
        <MessageBox onSendMessage={handleSendMessage}/>
    </div>)
}

export default Chat;

