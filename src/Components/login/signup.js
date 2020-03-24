import React, { useEffect } from 'react';
import useSignUp from '../../Hooks/useSignupForm';
import useMiniMap from '../../Hooks/useMiniMap';
import validate from './validate';
import { useHistory } from 'react-router-dom';
import './login.css';
//needs error handling & error messages displayed

const Signup = () => {

    //bring in map for location picking
    const [map, address] = useMiniMap("mapbox")
    console.log(address)


    //hook for signup submit & validate 
    const {
        handleChange,
        handleSubmit,
        handleLocation,
        values,
        errors
    } = useSignUp(submit, validate)

    //when address exists, handle value
    useEffect(() => {
        if (address) {
            handleLocation(address)
        }
    }, [address])

    //bring in history to redirect to login after submit
    let history = useHistory();

    //submit signup form to backend
    function submit() {
        const url = "http://87bd2f72.ngrok.io/signup"

        //check values before submitting
        console.log(values);
        // handling error messages
        const handleErrors = (error) => {
            console.log('response from signup ' + error)
            return error;
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
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
                console.log(response);
                //push to login here 
                history.push('/')
            })
    }

    return (
        <div className="login-container">
            <div className="login-inner">
                <form onSubmit={handleSubmit} noValidate autoComplete="true">
                    <h3>Sign Up</h3>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text"
                            name="name"
                            className="form-control"
                            placeholder="Username"
                            onChange={handleChange}
                            value={values.username} />
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
                    <div>
                        <label>Health Status</label>
                        <select className="form-control"
                            name="healthStatus"
                            onChange={handleChange}
                            value={values.healthStatus} >
                            <option value="1">Healthy</option>
                            <option value="2">Sick</option>
                            <option value="3">Immune Compromised/Elderly</option>
                            <option value="4">Diagnosed/Quarantined</option>
                            <option value="5">Unsure</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <div id="mapbox">
                        </div>

                    </div>
                    <div className="form-group">
                        <label>Emergency Contact</label>
                        <input type="text"
                            name="emergencyContacts"
                            className="form-control"
                            placeholder="Emergency Contact One"
                            onChange={handleChange}
                            value={values.emergencyContacts} />
                            <input type="text"
                            name="emergencyContacts"
                            className="form-control"
                            placeholder="Emergency Contact Two"
                            onChange={handleChange}
                            value={values.emergencyContacts} />
                    </div>

                    <button type="submit"
                        className="btn btn-secondary btn-block"
                    >Sign Up</button>
                </form>
            </div>
        </div>)
}

export default Signup; 