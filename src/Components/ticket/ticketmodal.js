

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { Button } from '../../global';
import Cookies from 'js-cookie';
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


export default function TicketModal(props) {

    const classes = useStyles();
    //error messages
    const [errorMessage, setErrorMessage] = useState(null);
    const [message, setMessage] = useState(null);
    const [values, setValues] = useState('')

    //for email input 
    const handleChange = (e) => {
        setValues({
            ticket: e.target.value
        })
    }
    // console.log(values.ticket)

    //call submit function from button
    const handleSubmit = () => {
        submit();
    }

    //submit ticket
    function submit(e) {
        e.preventDefault();
        console.log('submitting ticket!')
        const url = "http://localhost:5000/reportIssue"
        let token = Cookies.get("token")
        const username = props.user.name

        //handle errors
        const handleErrors = (response) => {
            if (response.error) {
                setErrorMessage(response.error)
            }
            return response;
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify({values, username}),
            headers: {
            "Authorization": token
        }
        })
            .then(res => res.json)
            .then(handleErrors)
            .catch(error => {
                if (error) {
                    console.log(error);
                }
            })
            .then(response => {
                // console.log(response);
                if (response.message) {
                    setErrorMessage(response.message)
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
                // onClose={props.handleClick}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    {props.email ? <div className={classes.paper}>
                        <h2 id="spring-modal-title" className="modal-title">Thank you!</h2>
                        <p id="spring-modal-description" className="modal-title">An email has been sent to {props.email}. Please check your spam folders, we are not fancy yet! </p>
                        <div>
                            <Button onClick={props.handleClick}>Ok!</Button>
                        </div>
                    </div> :
                        <div className={classes.paper}>
                            <h2 id="spring-modal-title" className="modal-title">Report an Issue</h2>
                            <p id="spring-modal-description" className="modal-text">What is the issue?</p>
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="modal-text">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="ticket"
                                        onChange={handleChange}
                                        value={values.ticket} />
                                </div>
                                <Button
                                    type="submit"
                                    className="fancy-btn-text"
                                >Submit Issue</Button>
                                <Button
                                    className="fancy-btn-text"
                                    onClick={props.handleClick}
                                >Cancel</Button>
                            </form>
                            {errorMessage ? <div>{errorMessage}</div> : null}
                            {message ? <div>{message}
                                <div>
                                    <Button className="fancy-btn-text" onClick={props.handleClick}>Ok!</Button>
                                </div>
                            </div> : null}
                        </div>}

                </Fade>
            </Modal>
        </div>
    );
}