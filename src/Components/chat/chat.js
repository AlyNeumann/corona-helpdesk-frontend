import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useChat from '../../Hooks/useChat';
import MessageBox from './messageBox';
import Messages from './messages';
import PastMessages from './pastMessages';
import PastChats from './pastChats';
import { UserContext } from '../user-context/userContext';
import { Button } from '../../global';
import './chat.css';





//TODO: for web - show profile of person you are talking to on right, for mobile just chat
const Chat = (props) => {
    //get the user they clicked on to chat with
    const [viewedUser, setViewedUser] = useState(null)
    //get user from context
    const [user, setUser] = useContext(UserContext);
    //pagination number is set on click 
    const [page, setPage] = useState(1);
    // //switch chat if user clicks on another user on the side of the page
    // const [newChat, setNewChat] = useState(null);
    



    const { messages, sendMessage, pastMessages, roomId, allChats, handleChatSwitch, newChat, newChatUser  } = useChat({ user, viewedUser, page});
    //scroll to bottom of chat
    const messagesEndRef = useRef(null)
    // console.log(messagesEndRef)

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }
    //call scroll to bottom when message updates 
    useEffect(scrollToBottom, [messages]);

    //function to send message to socket io
    const handleSendMessage = ({ message }) => {
        sendMessage({ message, user })
    }

    //pagination
    const handlePagination = () => {
        setPage(page + 1)
    }


    useEffect(() => {
        // console.log(pastMessages)
        if (props.location.state && pastMessages) {
            setViewedUser(props.location.state.viewedUser)
        }
    }, [pastMessages])


    return (
        <div className="chat-outerContainer">
            {viewedUser && <h6 className="chat-title">You are chatting with {viewedUser.name}</h6>}
            <div className="chat-container">
                {/* {viewedUser && <h6>You are chatting with {viewedUser.name}</h6>} */}

                {(props.location.state || newChat)?
                    //className="chat-messages-container"
                    <div className="all-messages">

                        <Button onClick={handlePagination}>click to see more...</Button>

                        <div>
                            <PastMessages pastMessages={pastMessages} user={user} viewedUser={viewedUser} newChatUser={newChatUser}/>

                            <Messages messages={messages} pastMessages={pastMessages} user={user} viewedUser={viewedUser} newChat={newChat} newChatUser={newChatUser}/>
                            <div ref={messagesEndRef} />
                            <div className="fixed-input">
                            <MessageBox onSendMessage={handleSendMessage} />
                        </div>
                        </div>
                            
                    </div>
                    :
                    <div>
                        <div>
                            Check the map or needsfeed to find users to chat with!
                    </div>
                        <Link to={{
                            pathname: '/needsfeed',
                        }}>
                            <Button>Needs Feed</Button>
                        </Link>

                        <Link to={{
                            pathname: '/map',
                        }}>
                            <Button>Map</Button>
                        </Link>
                    </div>

                }
                    
            </div>
            {allChats && <PastChats pastChats={allChats} user={user} handleChatSwitch={handleChatSwitch}/>}
        </div>)
}

export default Chat;

