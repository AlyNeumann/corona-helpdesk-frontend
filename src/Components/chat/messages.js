import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PortraitPlaceholder from '../../Assets/images/Portrait_Placeholder.png'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

const Messages = ({ messages, user, viewedUser }) => {
    const classes = useStyles();

    //TODO: replace index with message _id 
    return (
        <List className={classes.root}>
          
            {messages.flatMap((message, index) => {
                //   console.log(messages)
                return [(
                <ListItem alignItems="flex-start" key={index}>
                    <ListItemAvatar>
                        <Avatar 
                        alt="Remy Sharp" 
                        src={PortraitPlaceholder} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={message.username}
                    />
                     <ListItemText
                        primary={message.text}
                    />
                      <ListItemText
                        primary={message.time}
                    />
                </ListItem>)
                ,
                  <Divider variant="inset" component="li" key={'divider-'+ index}/> ]}).slice(0, -1)}
          
        </List>
    );
}

export default Messages;
