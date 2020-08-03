import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useSignUp from '../../Hooks/useSignupForm';
import useMiniMap from '../../Hooks/useMiniMap';
import validate from './validate';
import EmailModal from './emailModal';
import WhyModal from './whyModal';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { useSpring, animated } from 'react-spring';
import './login.css';

//material ui
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

//needs error handling & error messages displayed

const Signup = () => {
     // react spring styles
     const props2 = useSpring({
        opacity: 1, 
        from: {opacity: 0}
    })

    //material ui
    const classes = useStyles();

    //bring in map for location picking
    const [map, address, coords] = useMiniMap("map")


    //open modal for email confirmation
    const [modal, setModal] = useState(false)
    const [modalTwo, setModalTwo] = useState(false)
    //open or close modal
    const [open, setOpen] = React.useState(false);
    const [openTwo, setOpenTwo] = React.useState(false)
    const [errorMessage, setErrorMessage] = useState(null);

    //hook for signup submit & validate 
    const {
        handleChange,
        handleSubmit,
        handleLocation,
        handleEmergency,
        values,
        errors
    } = useSignUp(submit, validate)

        //history to push to next page once submitted
        let history = useHistory()

    //to close modal
    const handleClick = () => {
        setOpen(false);
        history.push('/');
    }
    //close why modal
    const handleClickTwo = () => {
        setOpenTwo(false);
        setModalTwo(false)
    }

    //open why modal
    const handleModalTwo = () => {
        setModalTwo(true);
    }


    //when address exists, handle value
    useEffect(() => {
        if (coords) {
            handleLocation(address, coords)
        }
    }, [coords])


    //submit signup form to backend
    function submit() {
        // console.log(values)
        const url = "http://localhost:5000/signup"

        //check values before submitting
        // console.log(values);
        // handling error messages
        const handleErrors = (response) => {
            console.log(response)
            if (response.errors) {
                setErrorMessage("please fill in all fields!")
            }else if(response.error){
                setErrorMessage(response.error)
            }
            return response;
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .catch(err => {
                if (err) {
                    console.log(err);
                    setErrorMessage(err)
                }
            })
            .then(response => {
                // console.log(response)
                console.log(JSON.stringify(response))
                if (!response.errors) {
                    // console.log(JSON.stringify(response));
                    setModal(true)
                }else if(response.err){
                    setErrorMessage(response.err)
                } else {
                    handleErrors(response)
                }


            })
    }

    return (
        <div className="login-container">
            <div className="signup-inner">
            <animated.div style={props2}>
                <form onSubmit={handleSubmit} noValidate autoComplete="off" className="signup-form-body">
                    <h2>Sign Up</h2>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text"
                            name="name"
                            className="form-control"
                            placeholder="Username"
                            onChange={handleChange}
                            value={values.name} />
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={handleChange}
                            value={values.email} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={handleChange}
                            value={values.password} />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text"
                            name="phoneNumber"
                            className="form-control"
                            placeholder="Phone Number"
                            onChange={handleChange}
                            value={values.phoneNumber} />
                    </div>

                    <div className="form-group">
                        <label>Emergency Contact</label>
                        <input type="text"
                            name="emergencyContacts"
                            className="form-control"
                            placeholder="Emergency Contact One"
                            onChange={handleEmergency}
                            value={values.emergencyContacts[0] || ""} />
                        <input type="text"
                            name="emergencyContacts1"
                            className="form-control"
                            placeholder="Emergency Contact Two"
                            onChange={handleEmergency}
                            value={values.emergencyContacts[1] || ""} />
                    </div>

                    <div className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Health Status</InputLabel>
                        <Select
                            native
                            name="healthStatus"
                            onChange={handleChange}
                            value={values.healthStatus}
                            label="Health Status"
                            inputProps={{
                                name: 'healthStatus',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option aria-label="Healthy" value="Healthy" />
                            <option value="1">Healthy</option>
                            <option value="2">Symptoms/Unsure</option>
                            <option value="3">Sick</option>
                        </Select>
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <div id="map" className="mini-map">
                        </div>

                    </div>


                    <button type="submit"
                        className="btn btn-secondary btn-block btn-text"
                    >Sign Up</button>
                    <div>{modal ? <EmailModal email={values.email} handleClick={handleClick} open={[open, setOpen]}/> : null}</div>

                    {errorMessage ? <div className="error">{errorMessage}</div> : null}
                </form>
                <div>
                    <Link className="modal-button" to="/">Already have an account?</Link>
                </div>
                <div>
                    <button 
                    className="modal-button" 
                    onClick={handleModalTwo}
                    >Why am I being asked for this info?</button>
                </div>
                        <div>{modalTwo ? <WhyModal handleClickTwo={handleClickTwo} openTwo={[openTwo, setOpenTwo]}/> : null}</div>
                </animated.div>
            </div>
        </div>)
}

export default Signup; 