import React, { useEffect, useState } from 'react';
import { Button } from '../../global';
import './chat.css'


//chat contains the name of both users so check if name same, or different
//then use that for the chat button with that user

const PastChats = (props) => {


    const username = props.user.name
    const chats = props.pastChats
    console.log(props.pastChats)

    const [names, setNames] = useState(null)


    //fetch chat the user clicks on
    const handleClick = (e) => {
        //use chat id to call that chat
        // console.log(e.target.value)
        const newChat = e.target.value
        props.handleChatSwitch(newChat);

    }

    //TODO: fucking state trouble again bro, you suck at ARRAYS in LOOPS
    const filterChats = (chats) => {
        let viewedNames = []
        chats.map(chat => {
            let allnames = chat.names;
            let id = chat.id
            // console.log(allnames)
             const namesArr = allnames.filter(name => {
               return name !== username 
            })
           viewedNames.push({name: namesArr, id: id})
        })
        setNames(viewedNames)
    }

    useEffect(() => {
        filterChats(chats)
    }, [chats])
// console.log(names)
console.log(names)
    return (
        <div className="pastchats-container">
            <h6 className="pastchats-title">Chat History</h6>
            <div className="pastchat-btn">
                {names ? names.map(name => {
                    return (
                        <div key={name.id}>
                            <Button
                                className="pastchats-btn fancy-btn-text"
                                value={name.id}
                                onClick={handleClick}>
                               {name.name[0] !== undefined ? name.name[0] : "Myself"}
                            </Button>
                        </div>
                    )

                })

                    : (<div> No chat history</div>)}
            </div>
        </div>
    )
}

export default PastChats;
