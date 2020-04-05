import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSignUp from '../../Hooks/useSignupForm';
import useMiniMap from '../../Hooks/useMiniMap';
import validate from './validate';
import EmailModal from './emailModal';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
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

    //material ui
    const classes = useStyles();
    // const [state, setState] = React.useState({
    //     healthStatus: ''
    // });

    // const handleChange = (event) => {
    //     const name = event.target.name;
    //     setState({
    //         ...state,
    //         [name]: event.target.value,
    //     });
    // };

    //bring in map for location picking
    const [map, address, coords] = useMiniMap("map")


    //open modal for email confirmation
    const [modal, setModal] = useState(false)
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

    //when address exists, handle value
    useEffect(() => {
        if (coords) {
            handleLocation(address, coords)
        }
    }, [coords])


    //submit signup form to backend
    function submit() {
        console.log(values)
        const url = "http://localhost:5000/signup"

        //check values before submitting
        console.log(values);
        // handling error messages
        const handleErrors = (response) => {
            if (response.error) {
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
            .then(res => res.json)
            .catch(error => {
                if (error) {
                    console.log(error);
                }
            })
            .then(response => {
                console.log(response)
                if (response.error) {
                    handleErrors(response)
                } else {
                    console.log(response);
                    setModal(true)
                }


            })
    }

    return (
        <div className="login-container">
            <div className="signup-inner">
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
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
                    <div>{modal ? <EmailModal email={values.email} changeProp={modal} /> : null}</div>

                    {errorMessage ? <div>{errorMessage.error}</div> : null}
                </form>
                <div>
                    <Link className="modal-button" to="/">Already have an account?</Link>
                </div>
            </div>
        </div>)
}

export default Signup; 