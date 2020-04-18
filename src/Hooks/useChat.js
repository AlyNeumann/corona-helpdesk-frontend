import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';


const useChat = ({ user, viewedUser }) => {


    const [messages, setMessages] = useState([{
        username: '',
        text: '',
        time: ''
    }]);

    const [pastMessages, setPastMessages] = useState([{
        text: '',
        to: '',
        from: '',
        time: ''
    }]);

    const [username, setUserName] = useState('')
    const [roomId, setRoomId] = useState()
    const [serverErorr, setServerError] = useState(null);
    const [errorMesssage, setErrorMessage] = useState(null);
    // console.log(user, viewedUser)
    const socketRef = useRef();

    useEffect(() => {

        if (viewedUser && user) {
            setUserName(user.name)
            //get both users ids for room id
            setRoomId(user._id + viewedUser._id)

        }
    }, [viewedUser, user])


    useEffect(() => {

        //this url takes the room ID - not necessary, the name space can have many rooms
        socketRef.current = socketIOClient(`http://localhost:3000/`);


        //join room
        socketRef.current.emit('joinRoom', { username, roomId }, ({ error }) => {
            alert(error);
        })


        socketRef.current.on('chatmessage', (message) => {
            setMessages(messages => [...messages, message])
        });

        socketRef.current.on('success', ({ messagesArr }) => {
            console.log(messagesArr)
        })

        return () => {
            socketRef.current.disconnect();
        }

    }, [roomId]);

    //fetch past messages from database
    useEffect(() => {
        //TODO:when we get the past chat, format the time

        if (user && viewedUser) {
            console.log(user, viewedUser)
            const url = 'http://localhost:3000/pastChat'
            const id1 = user._id
            const id2 = viewedUser._id
            const ids = [id1, id2]
            const values = ids.sort().join('');

            //handle error messages
            const handleErrors = (error) => {
                console.log(error)
                if (error) {
                    setErrorMessage(error.error)
                } else if (error instanceof TypeError) {
                    setServerError(true)
                } else return error;
            }
            //fetch past chat
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({ id: values }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json()) //response is

                .then(response => {
                    // console.log(response)
                    if (response.error || response == undefined) {
                        handleErrors(response)
                    } else {
                     
                        //TODO: set past messages to state
                        setPastMessages(response)

                    }

                })
                .catch(error => {
                    if (error) {
                        console.log(error)
                        handleErrors(error)
                    } else if (error instanceof TypeError) {
                        setServerError(true)
                    }
                })
        }

    }, [viewedUser, user])

    //if there are more than messages, destructure here
    const sendMessage = ({ message, user }) => {
        // console.log(message)
        socketRef.current.emit('chatmessage', { message, user, viewedUser })
    }
    // console.log(messages)
    return { messages, sendMessage, pastMessages };
}

export default useChat;

