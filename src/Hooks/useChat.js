import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import socketIOClient from 'socket.io-client';

//TODO: rebuild & test

const useChat = ({ user, viewedUser, page }) => {


    const [messages, setMessages] = useState([{
        username: '',
        text: '',
        time: ''
    }]);
    const [viewedUserId, setViewedUserId] = useState('')

    const [pastMessages, setPastMessages] = useState([{

    }]);
    const [chatIds, setChatids] = useState([]);
    const [to, setTo] = useState(null);
    const [allChats, setAllChats] = useState([]);
    const [names, setNames] = useState([])
    const [newChatUser, setNewChatUser] = useState({});

    const [username, setUserName] = useState('')
    const [roomId, setRoomId] = useState()
    const [serverErorr, setServerError] = useState(null);
    const [errorMesssage, setErrorMessage] = useState(null);
    //switch chat if user clicks on another user on the side of the page
    const [newChat, setNewChat] = useState(false);
    // console.log(user, viewedUser)
    const socketRef = useRef();

    useEffect(() => {

        if (viewedUser && user) {
            setUserName(user.name)
            setNames([user.name, viewedUser.name])
            //get both users ids for room id
            const id1 = user._id
            const id2 = viewedUser._id
            //store ids seperately for retriving all chats from user
            setChatids([id1, id2])
            const ids = [id1, id2]
            const values = ids.sort().join('');
            setRoomId(values)
            setTo(viewedUser.name)

        }
    }, [viewedUser, user])


    useEffect(() => {


        //TODO: this is not working, this url I think

        socketRef.current = socketIOClient('/');
          // console.log(socketRef.current)

        //join room
        socketRef.current.emit('joinRoom', { username, roomId, chatIds, names }, ({ error }) => {
            console.log('room join attempt')
            alert(error);
        })

        socketRef.current.on('chatmessage', (message) => {
            console.log('where do we get time here 'message)
            setMessages(messages => [...messages, message])
        });

        // socketRef.current.on('success', ({ messagesArr }) => {
        //     console.log('current messages in temporary memory')
        //     console.log(messagesArr)
        // })

        return () => {
            console.log("disconneting now")
            socketRef.current.disconnect();
        }

    }, [roomId]);

    //fetch past messages from database
    useEffect(() => {

        if (roomId) {
            // console.log(user, viewedUser)
            // const url = 'http://localhost:3000/pastChat'
            const url = '/chatapi/pastChat'
            console.log('roomId inside fetch')
            console.log(roomId)

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
                body: JSON.stringify({ id: roomId, page }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())

                .then(response => {
                    if (response.error || response == undefined) {
                        handleErrors(response)
                    } else {
                        setPastMessages([...response, ...pastMessages])
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

    }, [roomId, page])

    //fetch past messages from database when user changes
    useEffect(() => {

        if (roomId) {
            // console.log(user, viewedUser)
            // const url = 'http://localhost:3000/pastChat'
            const url = '/chatapi/pastChat'
            console.log('roomId inside fetch')
            console.log(roomId)

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
                body: JSON.stringify({ id: roomId, page }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(response => {
                    if (response.error || response == undefined) {
                        handleErrors(response)
                    }
                    else if (page === 1) {
                        setPastMessages(response)
                    }
                    else {
                        setPastMessages([...response, ...pastMessages])
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

    }, [roomId, page])

    //fetch all users current chats - why is this running 3 times?
    useEffect(() => {

        if (user) {
            // console.log(user, viewedUser)
            // const url = 'http://localhost:3000/userChats'
            const url = '/chatapi/userChats'
            const userId = user._id
            console.log(userId)

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
                body: JSON.stringify({ userId }),
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
                        console.log(response)
                        setAllChats(response)
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

    }, [user])

    //if user switches chat
    const handleChatSwitch = (chat) => {
        // console.log(chat)
        //use chat id to call that chat
        setRoomId(chat)
        setNewChat(true)
        setMessages([{
            username: '',
            text: '',
            time: ''
        }])
        setPastMessages([{}])
        //get viewed user id (-user id) then set new viewed user id to state
        //setViewedUserId()
        let halfwayThrough = Math.floor(chat.length / 2)
        let firstId = chat.slice(0, halfwayThrough);
        let secondId = chat.slice(halfwayThrough, chat.length);
        if (firstId === user._id) {
            setViewedUserId(secondId)
        } else {
            setViewedUserId(firstId)
        }

    }

    //fetch the user when the chat switches
    useEffect(() => {

        if (viewedUserId) {
            const token = Cookies.get('token')
            const url = "/api/getUsers"
            //handle error messages
            const handleErrors = (error) => {
                if (error) {
                    setErrorMessage(error)
                }
                else return error
            }

            fetch(url, {
                method: "POST",
                body: JSON.stringify({chatuserId: viewedUserId}),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
                .then(res => res.json()) //response is
                .then(response => {
                    if (response.error || response == undefined) {
                        handleErrors(response)
                    } else {
                        console.log(response);
                        setNewChatUser(response)
                        setTo(response.name)
                        setMessages([{
                            username: '',
                            text: '',
                            time: ''
                        }])
                    }

                })
                .then(handleErrors)
                .catch(error => {
                    if (error) {
                        console.log(error)
                    }
                })

        }

    }, [viewedUserId])

    //if there are more than messages, destructure here
    const sendMessage = ({ message, user }) => {
        console.log('message sending now' message)
        socketRef.current.emit('chatmessage', { message, user, roomId, to })
    }
    // console.log(messages)
    return { messages, sendMessage, pastMessages, roomId, allChats, handleChatSwitch, newChat, newChatUser };
}

export default useChat;

