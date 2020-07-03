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


export default function WhyModal(props) {



    const classes = useStyles();
    // //open or close modal
    // const [open, setOpen] = React.useState(false);



    return (
        <div>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={props.openTwo}
                // onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.openTwo}>

                    <div className={classes.paper}>
                        <h2 id="spring-modal-title" className="modal-title">Why????</h2>
                        <p id="spring-modal-description" className="modal-title">Why am I being asked to enter so many details?</p>

                        <div className="modal-text">
                            So, as far as entering info for your profile, the only actually
                            important part is your email address. The rest you can make up if you feel shy!
                            I am asking your health status and address only so I can color code your approximate location on a map. Feel free to enter
                            a location near you if you prefer.
                            I am asking for your emergency contacts because I plan to add an emergency system, but it is not finished quite yet.
                            Everything entered on this page is fully secure and confidential.
                            Hope that clears things up!
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