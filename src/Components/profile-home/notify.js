import React from 'react';
import { Link } from 'react-router-dom';
import SnackbarContent from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '../../global';
import './profileHome.css'

//TODO: this will be for new messages & needs for when user logs in to their profile

const Notify = (props) => {
    const vertical = 'bottom';
    const horizontal = 'right';

    const useStyles = makeStyles((theme) => ({
        root: {
          maxWidth: 550,
          '& > * + *': {
            marginTop: theme.spacing(2),
            paddingLeft: '150px'
          },
        },
        content: {
            background: 'white',
            color: 'black'
        }
      }));

    const action = (
        <Button className="notify-btn" color="default" size="small">
            <Link to='/chat' className="notify-btn" >
            take me to chat
            </Link>
      </Button>
    )
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* {buttons} */}
            <SnackbarContent
                anchorOrigin={{ vertical, horizontal }}
                open={props.open}
                onClose={props.callback}
                message={
                    `You have new messages from ${props.name}! \
                    Click here to see them. `             }
                action={action}
                key={vertical + horizontal}
            />
        </div>
        // <div> You have unread messages!
        //     <Link to={{
        //         pathname: '/chat'
        //     }} >
        //         Take me to Chat
        //     </Link>
        //     <button onClick={props.callback}>Ok!</button>
        // </div>
    )
}

export default Notify;