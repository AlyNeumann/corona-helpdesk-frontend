import { useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';

//TODO: rebuild & test

const useUpvote = () => {

    const socketRef = useRef();

    useEffect(() => {

        socketRef.current = socketIOClient('http://localhost:5000');
        // console.log(socketRef.current)

        const username = 'Joel'

        //join room
        socketRef.current.emit('upvote', { username }, ({ error }) => {
            console.log(`${username} has upvoted`)
            alert(error);
        })

        return () => {
            console.log("disconneting now")
            socketRef.current.disconnect();
        }

    }, []);

}

export default useUpvote;