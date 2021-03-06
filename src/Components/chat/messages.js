import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PortraitPlaceholder from '../../Assets/images/Portrait_Placeholder.png'
// import ScrollToBottom from 'react-scroll-to-bottom';
import ReactEmoji from 'react-emoji';
import './chat.css';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '100px',
    }
}));

const Messages = ({ messages, user, viewedUser, newChat, newChatUser }) => {

    const classes = useStyles();
    let userImg = ''
    let viewedImg = ''

    if (user && viewedUser) {
        userImg = user.img
        viewedImg = viewedUser.img
    }else{
        userImg = user.img
        viewedImg = newChatUser.img
    }

    //if new chat, clear messages
    useEffect(() => {
        if (newChat) {
            console.log('newchat from messages')
        }
    }, [newChat])


    //render two forms of messages based on user or viewed user name
    return (
        <div>
            <List className={classes.root}>
                {messages.flatMap((message, index) => {
                    if (message.text !== '')
                        if (message.text !== '' && (message.username === user.name)) {
                            return [(
                                <ListItem alignItems="flex-start" key={index}>


                                    <ListItemText
                                        className="chat-time"
                                        primary={message.time}
                                    />
                                    <ListItemText
                                        className="messageText"
                                        primary={ReactEmoji.emojify(message.text)}
                                    />
                                    <ListItemAvatar>
                                        {messages ?
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={`data:image/jpeg;base64,${userImg}`} 
                                                className="chat-pic"/> :
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={PortraitPlaceholder}
                                                className="chat-pic" />}
                                    </ListItemAvatar>
                                </ListItem>)
                                ,
                            <Divider variant="inset" component="li" key={'divider-' + index} />]
                        } else
                        // if(message.text !== '' && (message.from === viewedUser.name))
                        {
                            if (message.text !== '' && !message.time)
                                return [(
                                    <ListItem alignItems="flex-start" key={index}>
                                        <ListItemAvatar>
                                            {userImg ?
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={`data:image/jpeg;base64,${viewedImg}`} 
                                                    className="chat-pic"/> :
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={PortraitPlaceholder} 
                                                    className="chat-pic"/>}

                                        </ListItemAvatar>
                                        <ListItemText
                                            className="messageText"
                                            primary={message.text}
                                        />
                                        <ListItemText
                                            className="chat-time"
                                            primary={message.time}
                                        />



                                    </ListItem>)

                                    ,
                                <Divider variant="inset" component="li" key={'divider-' + index} />]
                        }
                }).slice(0, -1)}


            </List>
        </div>
    );
}

export default Messages;
