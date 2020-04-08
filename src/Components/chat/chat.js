import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useChat from '../../Hooks/useChat';
import MessageBox from './messageBox';
import Messages from './messages';
import { UserContext } from '../user-context/userContext';
import { Button } from '../../global';
// import { useSpring, animated } from 'react-spring'
import { useTrail, animated } from 'react-spring'
import './chat.css';

//TODO: to use for message scrolling
// const props = useSpring({ scroll: 100, from: { scroll: 0 } })
// return <animated.div scrollTop={props.scroll} />




//TODO: change messages to a map
//TODO: for web - show profile of person you are talking to on right, for mobile just chat
const Chat = (props) => {
    //get the user they clicked on to chat with
    // console.log(props.location.state.user)
    //get user from context
    const [user, setUser] = useContext(UserContext);
    console.log(user)

    //TODO: replace hardcoded messages with these ones
    //    const { messages, sendMessage } = useChat();

    const handleSendMessage = ({ message }) => {
        console.log({ message })
        // sendMessage({message})
    }
    return (
        <div className="chat-container">
            {props.location.state ?
                <div>
                    <Messages messages={[
                        "message 1",
                        "message 2",
                        "message 3",
                        "message 4"
                    ]} />
                    <MessageBox onSendMessage={handleSendMessage} />
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

        </div>)
}

export default Chat;

