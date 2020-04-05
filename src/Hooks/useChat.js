import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const useChat = () => {

    const [messages, setMessages] = useState([]);


    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient('http://localhost/5000/');

        socketRef.current.on('newmessage', ({ message }) => {
            setMessages(messages => [...messages, message])
        });

        return () => {
            socketRef.current.disconnect();
        }
    }, []);

    //if there are more than messages, destructure here
    const sendMessage = ({ message }) => {
        socketRef.current.emit('newmessage', { message })
    }

    return { messages, sendMessage };
}

export default useChat;