import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { useHistory } from 'react-router-dom'
import { Button } from '../../global';
import Cookies from 'js-cookie';
import ListIcon from '@material-ui/icons/List';
import { Place } from '@material-ui/icons'
import AssessmentIcon from '@material-ui/icons/Assessment';
import HelpIcon from '@material-ui/icons/Help';
import '../login/modal.css';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};


export default function FirstTimeModal(props) {

    const token = Cookies.get("token");

    const classes = useStyles();
    //error messages
    const [errorMessage, setErrorMessage] = useState(null);
    // const [message, setMessage] = useState(null);

    //use history after modal close
    let history = useHistory();


    //call submit function from button
    const handleClick = () => {
        const userProps = props.user;
        if(userProps.isFirstTime === false){
            console.log(props.user)
            props.handleClose()
        }else{
            updateFirstTime()
            console.log(props.user)
            props.handleClose()
        }
        
    }

    //submit email 
    function updateFirstTime() {
        const url = "http://localhost:5000/updateFirstTimeLogin"

        //handle errors
        const handleErrors = (response) => {
            if (response.error) {
                setErrorMessage(response.error)
            }
            return response;
        }

        fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(res => res.json)
            .then(response => {
                console.log(response);
                // if (response.message) {
                //     setErrorMessage(response.message)
                // }

            })
            .then(handleErrors)
            .catch(error => {
                if (error) {
                    console.log(error);
                }
            })
            
    }


    return (
        <div>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>
            <h2 id="spring-modal-title" className="modal-title">Hi {props.user.name}! Welcome to Covid 19 Community Help!</h2>
                        <p id="spring-modal-description" className="modal-title">
                            How to use this app to help the people nearest you: <br></br>
                            This is your profile page. You can add the things you need to the Needs List, and also add a picture by updating your profile.
                            You can see who needs things nearest you on the Map <Place className="iconclass" />, or in the Needs Feed <ListIcon className="iconclass" />.
                            Once you find a user that you can help or that can help you, you can open a chat with them!
                            Check out the Analyticsfor<AssessmentIcon className="iconclass" /> the latest info, and check out the Resources<HelpIcon className="iconclass" />  for 
                            details on financial assistance, wait times at grocery stores, and help for artists. We will ask for your permission to use notifications in the chat, these will be used to tell you if you have a new message from another user!
                            This is a small community run project, we will keep the data you share secret and safe!
                        </p>
                        <div>
                            <Button onClick={handleClick}>Got it!</Button>
                        </div>
                    </div> 
                </Fade>
            </Modal>
        </div>
    );
}