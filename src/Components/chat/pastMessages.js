import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PortraitPlaceholder from '../../Assets/images/Portrait_Placeholder.png';
import ReactEmoji from 'react-emoji';
import './chat.css'

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '100px',
    }
}));

const PastMessages = ({ pastMessages, user, viewedUser }) => {
    let userImg = ''
    let viewedImg = ''

    console.log(pastMessages)
    if (user && viewedUser) {
        userImg = user.img
        viewedImg = viewedUser.img
    }


    const classes = useStyles();

    return (

        <div className="all-messages-container">
            {pastMessages ?
                <List className={classes.root}>
                    {pastMessages.flatMap((message, index) => {
                        //convert time with moment

                        let time = ''
                        if (message.created) {
                            time = moment(message.created).format('h:mm:a')
                        }
                        if (message.text !== '' && (message.from === user.name)) {
                            return [(
                                <ListItem alignItems="flex-start" key={index}>
                                    <ListItemText
                                        className="chat-time"
                                        primary={time}
                                    />
                                    <ListItemText
                                        className="messageText"
                                        primary={ReactEmoji.emojify(message.text)}
                                    />

                                    <ListItemAvatar>
                                        {userImg ?
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={`data:image/jpeg;base64,${userImg}`} /> :
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={PortraitPlaceholder} />}

                                    </ListItemAvatar>
                                </ListItem>)

                                ,
                            <Divider variant="inset" component="li" key={'divider-' + index} />]
                        } else
                        // if(message.text !== '' && (message.from === viewedUser.name))
                        {
                            if (message.text !== '')
                            return [(
                                <ListItem alignItems="flex-start" key={index}>
                                    <ListItemAvatar>
                                        {userImg ?
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={`data:image/jpeg;base64,${viewedImg}`} /> :
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={PortraitPlaceholder} />}

                                    </ListItemAvatar>
                                    <ListItemText
                                        className="messageText"
                                        primary={ReactEmoji.emojify(message.text)}
                                    />
                                    <ListItemText
                                        className="chat-time"
                                        primary={time}
                                    />



                                </ListItem>)

                                ,
                            <Divider variant="inset" component="li" key={'divider-' + index} />]
                        }
                    }).slice(0, -1)}

                </List>
                :
                <div>No chat history</div>
            }


        </div>
    );

}

export default PastMessages;

// <List className={classes.root}> 
// {messages.flatMap((message, index) => {
//     console.log(message.created)
//     return [(
//         <ListItem alignItems="flex-start" key={index}>
//             <ListItemAvatar>
//                 <Avatar
//                     alt="Remy Sharp"
//                     src={PortraitPlaceholder} />
//             </ListItemAvatar>
//             <ListItemText
//                 primary={message.to}
//             />
//             <ListItemText
//                 primary={message.text}
//             />
//             {/* <ListItemText
//             primary={message.time}
//         /> */}
//         </ListItem>)
//         ,
//     <Divider variant="inset" component="li" key={'divider-' + index} />]
// }).slice(0, -1)}

// </List>