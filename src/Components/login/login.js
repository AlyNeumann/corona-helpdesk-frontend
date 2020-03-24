import React, { useState } from 'react';
import useForm from '../../Hooks/useForm';
// import validate from './signup';
import { Link, useHistory } from 'react-router-dom';
import './login.css';
//needs error handling & error messages displayed

const Login = () => {
    //hook to handle form values
    const { handleChange, handleSubmit, values, errors } = useForm(
        submit,
        // validate
    );

    //error messages from server
    const [errorMessage, setErrorMessage] = useState(null)

    //history to push to next page once submitted
    let history = useHistory()

    function submit() {

        //check values before submit
        console.log(values);

        //handle error messages
        const handleErrors = (error) => {
            console.log(error)
            setErrorMessage(error.error)
        }

        const url = 'http://localhost:5000/signin'

        fetch(url, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(handleErrors)
            .catch(error => {
                if (error) {
                    console.log(error)
                }
            })
            .then(response => {
                console.log(response)
                //go to next screen here => MAP!
                // if (!errorMessage) {
                //     history.push('/map')
                // }

            })
    }

    return (
        <div className="login-container">
            <div>Please login to your account</div>
            <div>
                <h3>Login</h3>
                <div className="login-inner">
                    <form onSubmit={handleSubmit} noValidate >
                        <div className="form-group">
                            <label>Email address</label>
                            <input
                                name="email"
                                type="email"
                                className={`${
                                    errors.username
                                        ? "inputError form-control"
                                        : "valid-email form-control"
                                    }`}
                                placeholder="Enter email"
                                value={values.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                name="password"
                                type="password"
                                className={`${
                                    errors.password ? "inputError form-control" : "form-control"
                                    }`}
                                placeholder="Enter password"
                                value={values.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-secondary btn-block">
                            Submit
                    </button>
                    </form>
                </div>
                <div className="error-message">
                    {errorMessage && <div><p>{errorMessage}</p></div>}
                </div>

                <div>
                    <Link to="/signup"> Click here to sign up</Link>
                </div>
            </div>

        </div>)
}

export default Login;