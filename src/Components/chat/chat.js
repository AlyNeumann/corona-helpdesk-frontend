import React from 'react';
import useChat from '../../Hooks/useChat';
import MessageBox from './messageBox';
import Messages from './messages';
// import { useSpring, animated } from 'react-spring'
import { useTrail, animated } from 'react-spring'
import './chat.css';

//TODO: to use for message scrolling
// const props = useSpring({ scroll: 100, from: { scroll: 0 } })
// return <animated.div scrollTop={props.scroll} />




//TODO: change messages to a map
//TODO: for web - show profile of person you are talking to on right, for mobile just chat
const Chat = () => {

    //TODO: replace hardcoded messages with these ones
    //    const { messages, sendMessage } = useChat();
    // const props = useSpring({ scroll: 100, from: { scroll: 0 } })

    const handleSendMessage = ({ message }) => {
        console.log({ message })
        // sendMessage({message})
    }
    return (
        <div className="chat-container">
            <Messages messages={[
                "message 1",
                "message 2",
                "message 3",
                "message 4"
            ]} />
            <MessageBox onSendMessage={handleSendMessage} />
        </div>)
}

export default Chat;

