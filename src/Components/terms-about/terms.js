
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { Button } from '../../global';
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


export default function Terms(props) {

    const classes = useStyles();
    return (
        <div>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={props.openTwo}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.openTwo}>

                    <div className={classes.paper}>
                        <h2 id="spring-modal-title" className="modal-title">Project Details</h2>
                        <p id="spring-modal-description" className="modal-title">Welcome to Covid 19 Commuty Help!</p>
                        <div className="modal-text">
                        This app was built to connect people who need help with people near them who want to help.
                        This app will ask some personal info, like your location and health status,
                        but even if you lie about those, you can still totally use the app.
                        The health status will be used to colour code a marker that will represent your approximate location on a map.
                        Your address will never be shared.
                        <br></br>
                         This project was built with no profits in mind.
                        If the project is useful, then there will be some server costs but for now it can run for (almost) free.
                        If that happens, I will crowd fund or apply for grants.
                         I will never sell data for profit.
                        I am a very new web developer and I just was trying to find a way to help folks right now, while testing my new skills.
                        I am immune compromised so that is how I came up with this idea.
                       There are bound to be many bugs so please report them via the "report an issue" button found on each page.
                        I hope you find it useful!
                                </div>
                        <Button
                            className="fancy-btn-text"
                            onClick={props.handleClickTwo}
                        >cool beans</Button>

                    </div>

                </Fade>
            </Modal>
        </div>
    );
}