import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { useHistory } from 'react-router-dom'
import { Button } from '../../global';
import './modal.css';

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


export default function EmailModal(props) {



    const classes = useStyles();
    // //open or close modal
    // const [open, setOpen] = React.useState(false);
    //value for email for forgot password
    const [values, setValues] = useState({
        email: ""
    });
    //error messages
    const [errorMessage, setErrorMessage] = useState(null);
    const [message, setMessage] = useState(null);

    //use history after modal close
    let history = useHistory();


    //for email input 
    const handleChange = (e) => {
        setValues({
            email: e.target.value
        })
    }
    // console.log(values)

    //call submit function from button
    const handleSubmit = () => {
        submit();
    }

    //submit email 
    function submit(e) {
        e.preventDefault();
        const url = "http://localhost:5000/forgotPassword"

        //handle errors
        const handleErrors = (response) => {
            if (response.error) {
                setErrorMessage(response.error)
            }
            return response;
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify(values)
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
                // onClose={handleClose}
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
                            <h2 id="spring-modal-title" className="modal-title">Password Retrieval</h2>
                            <p id="spring-modal-description" className="modal-text">Please enter a valid email</p>
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="modal-text">
                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        value={values.email} />
                                </div>
                                <Button
                                    type="submit"
                                    className="fancy-btn-text"
                                >Retrieve password</Button>
                                <Button
                                    className="fancy-btn-text"
                                    onClick={props.handleClick}
                                >cancel</Button>
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