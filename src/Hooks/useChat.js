import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

//TODO: fetch all rooms, compare id & split reversed id
//if it doesnt exist, then join the new room

const useChat = ({ user, viewedUser }) => {

    // const [errorMessage, setErrorMessage] = useState(null);
    // const [existingRooms, setExistingRooms] = useState([]);


    const [messages, setMessages] = useState([{
        username: '',
        text: '',
        time: ''
    }]);
    const [username, setUserName] = useState('')
    const [roomId, setRoomId] = useState()
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
            console.log(roomId)
            console.log(socketRef.current)


            //join room
            // console.log(roomId)
            socketRef.current.emit('joinRoom', { username, roomId })


            socketRef.current.on('chatmessage', (message) => {
                console.log(message)
                setMessages(messages => [...messages, message])
            });
            
            return () => {
                socketRef.current.disconnect();
            }

    }, [roomId]);

    //if there are more than messages, destructure here
    const sendMessage = ({ message, user }) => {
        // console.log(message)
        socketRef.current.emit('chatmessage', { message, user, viewedUser })
    }
    // console.log(messages)
    return { messages, sendMessage };
}

export default useChat;
