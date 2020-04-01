import React, { useState, useEffect } from 'react';
import useSignUp from '../../Hooks/useSignupForm';
import useMiniMap from '../../Hooks/useMiniMap';
import validate from './validate';
import EmailModal from './emailModal';
import './login.css';
//needs error handling & error messages displayed

const Signup = () => {

    //TODO: HELP! state is being so weird coming from miniMap, need help...
    //coords is return address and address is being weird AF

    //bring in map for location picking
    const [map, address, coords] = useMiniMap("map")
    // console.log(address)
    console.log(address);
    console.log(coords);

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
        if (coords ){
            handleLocation(address, coords)
        }
    }, [coords])


    //submit signup form to backend
    function submit() {
        const url = "http://localhost:5000/signup"

        //check values before submitting
        console.log(values);
        // handling error messages
        const handleErrors = (response) => {
            if(response.error){
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
                if(response.error){
                    handleErrors(response)
                }else{
                    console.log(response);
                    setModal(true)
                }
                

            })
    }

    return (
        <div className="login-container">
            <div className="login-inner">
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <h3>Sign Up</h3>
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

                    <div>
                        <label>Health Status</label>
                        <select className="form-control"
                            name="healthStatus"
                            onChange={handleChange}
                            value={values.healthStatus} 
                            defaultValue="1" >
                            <option value="1">Healthy</option>
                            <option value="2">Sick</option>
                            <option value="3">Immune Compromised/Elderly</option>
                            <option value="4">Diagnosed/Quarantined</option>
                            <option value="5">Unsure</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <div id="map" className="mini-map">
                        </div>

                    </div>


                    <button type="submit"
                        className="btn btn-secondary btn-block"
                    >Sign Up</button>
                    <div>{modal ? <EmailModal email={values.email} changeProp={modal}/>  : null}</div>
                    
                    {errorMessage ? <div>{errorMessage.error}</div> : null}
                </form>
            </div>
        </div>)
}

export default Signup; 