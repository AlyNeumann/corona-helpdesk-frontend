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

const useStyles = makeStyles((theme) => ({
    // root: {
    //     width: '100%',
    //     maxWidth: '36ch',
    //     backgroundColor: theme.palette.background.paper,
    // },
    // inline: {
    //     display: 'inline',
    // },
}));

const PastMessages = ({ pastMessages, user, viewedUser }) => {

    const [messages,setmessages] = useState(pastMessages[0].messages || undefined)

    console.log(pastMessages[0])

    //TODO: render two forms of messages based on this 'to' & 'from'
    // let sentByCurrentUser = false;
    // let messages = []
    //console.log(pastMessages)
    const msgArr = pastMessages[0]
    console.log('message aray!')
    console.log(msgArr)
    //const messages = msgArr.messages
    //console.log(messages)

    // useEffect(() => {
    //     //if messages.from === user.name
    //     // if (messages.from === user.name) {
    //     //     sentByCurrentUser = true;
    //     // }
       
    // }, [pastMessages])



    const classes = useStyles();

    return (

        <div>
            {messages ?
                <List className={classes.root}>
                    {messages.flatMap((message, index) => {
                        //convert time with moment
                        const time = message.created.moment().format('h:mm:a')
                        console.log(time)
                        return [(
                            <ListItem alignItems="flex-start" key={index}>

                                <ListItemText
                                    primary={message.to}
                                />
                                <ListItemText
                                    primary={message.text}
                                />
                                <ListItemText
                                    primary={time}
                                />
                                <ListItemAvatar>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={PortraitPlaceholder} />
                                </ListItemAvatar>
                            </ListItem>)
                            ,
                        <Divider variant="inset" component="li" key={'divider-' + index} />]
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