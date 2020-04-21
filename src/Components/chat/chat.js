import React, { useContext, useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';
import useChat from '../../Hooks/useChat';
// import usePagination from '../../Hooks/usePagination';
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
    //pagination number is set on click 
    const [page, setPage] = useState(1);



    const { messages, sendMessage, pastMessages, roomId } = useChat({ user, viewedUser, page });

    //bring user more past messages on button click
    // usePagination({ page, roomId })

    //function to send message to socket io
    const handleSendMessage = ({ message }) => {
        sendMessage({ message, user })
    }

    //pagination
    const handlePagination = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        console.log(pastMessages)
        if (props.location.state && pastMessages) {
            setViewedUser(props.location.state.viewedUser)
        }
    }, [pastMessages])
    console.log(page)

    return (
        <div className="chat-outerContainer">
            <div className="chat-container">

                {props.location.state ?
                    <div className="chat-messages-container">

                        <ScrollToBottom className="scroll-container">

                            <button onClick={handlePagination}>click to see more...</button>

                            <PastMessages pastMessages={pastMessages} user={user} viewedUser={viewedUser} />


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

