import React from 'react';
import { Link } from 'react-router-dom';
import SnackbarContent from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '../../global';
import './profileHome.css'

//TODO: this will be for new messages & needs for when user logs in to their profile

const Notify = (props) => {
    const vertical = 'bottom';
    const horizontal = 'left';

    const useStyles = makeStyles((theme) => ({
        root: {
          maxWidth: 600,
          '& > * + *': {
            marginTop: theme.spacing(2),
            marginLeft: '100px'
          },
        },
        content: {
            background: 'white',
            color: 'black'
        }
      }));

    const action = (
        <Button color="primary" size="small">
            <Link to='/chat'>
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
                    'You have some new messages! \
                    Click here to see them.'
                }
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