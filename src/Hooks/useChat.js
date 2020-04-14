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
    const [roomId, setRoomId] = useState('')
    // console.log(user, viewedUser)
    const socketRef = useRef();


    useEffect(() => {
        socketRef.current = socketIOClient('http://localhost:3000/');

        // //TODO: test not working either....
        // socketRef.current.on('chatmessage', ( message ) => {
        //     console.log(message)
        // })
        socketRef.current.on('chatmessage', ( message ) => {
            console.log(message)
            setMessages(messages => [...messages, message])
        });

        if (viewedUser && user) {
            setUserName(user.name)
            //get both users ids for room id
            setRoomId(user.id + viewedUser.id)

            //check if room exists already 
            // const roomIdUser = user + viewedUser
            // const roomIdReversed = viewedUser + user
            // const n = existingRooms.includes(roomIdUser || roomIdReversed);
            // console.log(n, roomId)

            //join room
            // console.log(roomId)
            // socketRef.current.emit('joinRoom', { username, roomId })
            //TODO: this is never being triggered
            // socketRef.current.on('chatmessage', ( message ) => {
            //     console.log(message)
            //     setMessages(messages => [...messages, message])
            // });
        }


        return () => {
            socketRef.current.disconnect();
        }
    }, [username, roomId]);

    //if there are more than messages, destructure here
    const sendMessage = ({ message, user }) => {
        // console.log(message)
        socketRef.current.emit('chatmessage', { message, user })
    }
    // console.log(messages)
    return { messages, sendMessage };
}

export default useChat;

 // useEffect(() => {
    //     if (viewedUser && user) {
    //         setUserName(user.name)
    //         //get both users ids for room id
    //         setRoomId(user.id + viewedUser.id)

    //         //fetch all rooms
    //         // const token = Cookies.get('token')
    //         const url = "http://localhost:3000/allchats"

    //         //handle error messages
    //         const handleErrors = (error) => {
    //             if (error) {
    //                 setErrorMessage(error)
    //             }
    //             else return error
    //         }

    //         fetch(url, {
    //             method: "GET"
    //         })
    //             .then(res => res.json())
    //             .then(response => {

    //                 if (!errorMessage) {
    //                     let y = response.map(res => res.id);
    //                     setExistingRooms([...existingRooms, ...y])

    //                 }

    //             })
    //             .then(handleErrors)
    //             .catch(error => {
    //                 if (error) {
    //                     // console.log(error)
    //                 }
    //             })

    //     }

    // }, [user, viewedUser])
