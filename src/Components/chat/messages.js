import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PortraitPlaceholder from '../../Assets/images/Portrait_Placeholder.png'
// import ScrollToBottom from 'react-scroll-to-bottom';
import ReactEmoji from 'react-emoji';
import './chat.css';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '100px',
    }
}));

const Messages = ({ messages, user, viewedUser }) => {

    const classes = useStyles();
    const data = user.img;

    //TODO: replace index with message _id 
    //TODO: render two forms of messages based on user or viewed user name
    return (
        <List className={classes.root}>
            {messages.flatMap((message, index) => {
                return [(
                <ListItem alignItems="flex-start" key={index}>
                    <ListItemAvatar>
                        {data? 
                        <Avatar 
                        alt="Remy Sharp" 
                        src={`data:image/jpeg;base64,${data}`}/> :
                        <Avatar 
                        alt="Remy Sharp" 
                        src={PortraitPlaceholder} />}
                    </ListItemAvatar>
                    {/* <ListItemText
                        primary={message.username}
                        className="chat-name"
                    /> */}
                     <ListItemText
                     className="messageText"
                        primary={ReactEmoji.emojify(message.text)}
                    />
                      <ListItemText
                      className="chat-time"
                        primary={message.time}
                    />
                </ListItem>)
                ,
                  <Divider variant="inset" component="li" key={'divider-'+ index}/> ]}).slice(0, -1)}
                  {/* </ScrollToBottom> */}
          
        </List>
        // {/* </ScrollToBottom> */}
    );
}

export default Messages;
