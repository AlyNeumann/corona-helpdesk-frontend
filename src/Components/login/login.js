import React, { useState } from 'react';
import EmailModal from './emailModal';
import useForm from '../../Hooks/useForm';
import validate from './validate';
import Cookies from 'js-cookie';
import { Link, useHistory } from 'react-router-dom';
import './login.css';
import { RepeatOneSharp } from '@material-ui/icons';
//needs error handling & error messages displayed

const Login = () => {
    //hook to handle form values
    const { handleChange, handleSubmit, values, errors } = useForm(
        submit,
        validate
    );

    //error messages from server
    const [errorMessage, setErrorMessage] = useState(null);
    //if server is not responding
    const [serverError, setServerError] = useState(null);
    //for forgot password modal
    const [modal, setModal] = useState(false);

    //history to push to next page once submitted
    let history = useHistory()

    //handle button click for forgot password
    const handlePassword = () => {
        setModal(true);
    }

    function submit() {

        //check values before submit
        // console.log(values);

        //handle error messages
        const handleErrors = (error) => {
            console.log(error)
            if (error) {
                setErrorMessage(error)
            } else if (error instanceof TypeError) {
                setServerError(true)
            } else return error;
        }

        const url = 'http://localhost:5000/signin'

        fetch(url, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json()) //response is
          
            .then(response => {
                console.log(response)
                if (response.error || response == undefined) {
                    handleErrors(response)
                } else {
                    //store auth in cookies response.token
                    console.log('cookie storage is next yo');
                    console.log(response)
                    Cookies.set("token", response.token);
                    history.push('/profile')
                }

            })
            .catch(error => {
                if (error) {
                    console.log(error)
                    handleErrors(error)
                } else if (error instanceof TypeError) {
                    setServerError(true)
                }
            })


    }

    return (
        <div className="login-container">
            <h6>Please login to your account</h6>
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
                    {errorMessage && <div className="error"><p>{errorMessage}</p></div>}
                    {serverError && <div className="error"><p>The server is not responding...</p></div>}
                </div>

                <div>
                    <Link className="modal-button" to="/signup"> Click here to sign up! </Link>
                </div>
                <div>
                    <button
                        className="modal-button"
                        onClick={handlePassword}>Forgot your password?</button>
                    {modal ? <EmailModal email={values.email} text={'Forgot your password?'} changeProp={modal} /> : null}
                </div>
            </div>

        </div>)
}

export default Login;