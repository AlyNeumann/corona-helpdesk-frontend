import React, { useEffect, useState } from 'react';
import { Button } from '../../global';
import Cookies from 'js-cookie';
import './chat.css'

const PastChats = (props) => {
    console.log(props)
    //store user profiles from past chat
    const [users, setUsers] = useState([]);
    const [serverErorr, setServerError] = useState(null);
    const [errorMesssage, setErrorMessage] = useState(null);
    const userId = props.user._id
    const chats = props.pastChats

    //fetch chat the user clicks on
    const handleClick = (e) => {
        //use chat id to call that chat
        // console.log(e.target.value)
        const newChat = e.target.value
        props.handleChatSwitch(newChat);

    }
    //TODO: take chat id, minus user id, use for fetch 
    //here we do fetch for each users profile, then store them & represent them by buttons
    const getUsers = (props) => {

        //loop through then fetch each
        chats.map(chat => {
            const chatuserId = chat.chatIds.filter(id => {
                return id !== userId
            })
            //fetch user profiles
            const token = Cookies.get('token')
            const url = "http://localhost:5000/getUsers"
            
             //handle error messages
             const handleErrors = (error) => {
                // console.log(error)
                if (error) {
                    setErrorMessage(error.error)
                } else if (error instanceof TypeError) {
                    setServerError(true)
                } else return error;
            }
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({chatuserId}),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            }).then(res => res.json())
            .then(response => {
              console.log('this is jibber', response)
                if (response.error || response == undefined) {
                    handleErrors(response)

                }else{
                    console.log('hudofusdinsd',response, users)
                    setUsers([...users, response])
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
        })
    }

    //if past chats exist, call getUsers
    useEffect(() => {
        getUsers(props)
    }, [userId, chats])
    console.log(users)
    //show user avatar as button with name
    return (
        <div className="pastchats-container">
            <h6 className="pastchats-title">Chat History</h6>
            <div className="pastchat-btn">
                {/* {users && users.map(user => {
                    return (<div key={user._id}> */}
                        <Button
                            className="pastchats-btn"
                            // value={user}
                            onClick={handleClick}>
                            {/* {user.name} */}
                        </Button>
                    {/* </div>)
                })} */}
            </div>
        </div>
    )
}

export default PastChats;
