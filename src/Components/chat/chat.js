import React, { useContext, useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';
import useChat from '../../Hooks/useChat';
import MessageBox from './messageBox';
import Messages from './messages';
import PastMessages from './pastMessages';
import { UserContext } from '../user-context/userContext';
import { Button } from '../../global';
import ScrollToBottom from 'react-scroll-to-bottom';
import './chat.css';





//TODO: for web - show profile of person you are talking to on right, for mobile just chat
const Chat = (props) => {
    //get the user they clicked on to chat with
    const [viewedUser, setViewedUser] = useState(null)
    //get user from context
    const [user, setUser] = useContext(UserContext);
    


    const { messages, sendMessage, pastMessages } = useChat({ user, viewedUser });

    //this works too
    const handleSendMessage = ({ message }) => {
        console.log(message, user)
        // setUser(user)
        sendMessage({ message, user })
    }

    useEffect(() => {
        if (props.location.state && pastMessages) {
            setViewedUser(props.location.state.viewedUser)
        }
    }, [pastMessages])


    return (
        <div className="chat-outerContainer">
            <div className="chat-container">
           
                    {props.location.state ?
                        <div className="chat-messages-container">
                        <PastMessages pastMessages={pastMessages}user={user} viewedUser={viewedUser} />
                        <ScrollToBottom className="scroll-container">
                          
                            <Messages messages={messages} pastMessages={pastMessages} user={user} viewedUser={viewedUser} />
                
                            </ScrollToBottom>
                            <div className="fixed-input">
                            <MessageBox onSendMessage={handleSendMessage} />
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
        </div>)
}

export default Chat;

