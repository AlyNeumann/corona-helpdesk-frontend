import React, { useState } from 'react';
import EmailModal from './emailModal';
import Terms from '../terms-about/terms'
import useForm from '../../Hooks/useForm';
import validate from './validate';
import Cookies from 'js-cookie';
import { Link, useHistory } from 'react-router-dom';
import './login.css';
import { useSpring, animated } from 'react-spring';
import Covid_title from '../../Assets/images/Covid_title.png';
import { Button } from '../../global';
//needs error handling & error messages displayed

const Login = (props) => {

    //react spring styles
    const props2 = useSpring({
        opacity: 1,
        from: { opacity: 0 }
    })
    const props4 = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        delay: 1000
    })
    const props3 = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        delay: 1500
    })
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
    //open or close modal
    const [open, setOpen] = useState(false);
      //details modal
      const [modalTwo, setModalTwo] = useState(false);
      //open or close details modal
      const [openTwo, setOpenTwo] = useState(false);

    //history to push to next page once submitted
    let history = useHistory()

    //to close modal
    const handleClick = () => {
        setOpen(false);
    }
    const handleClickTwo = () => {
        setOpenTwo(false);
        setModalTwo(false);
    }
    const handleModalTwo = () => {
        setOpenTwo(true);
        setModalTwo(true);
        console.log('why isnt this working')
    }
    
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
                setErrorMessage(error.error)
            } else if (error instanceof TypeError) {
                setServerError(true)
            } else return error;
        }

        // const url = '/api/signin'
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
                // console.log(response)
                if (response.error || response == undefined) {
                    handleErrors(response)
                } else {
                    //store auth in cookies response.token
                    // console.log('cookie storage is next yo');
                    console.log(response)
                    Cookies.set("token", response.token, { expires: 1 });
                    props.loginCallBack()
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
            <animated.div style={props2}>
                <img className="covid-title-image" src={Covid_title} />
            </animated.div>

            {/* <h6 className="smaller-title">Please login to your account</h6> */}
            <div>
                <animated.div style={props4}>
                    <div className="login-inner">
                        <form onSubmit={handleSubmit} noValidate >
                            <h3 className="title">Login</h3>
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
                            <button type="submit" className="btn btn-secondary btn-block btn-text">
                                Submit
                    </button>
                        </form>
                    </div>
                    <div className="error-message">
                        {errorMessage && <div className="error"><p>{errorMessage}</p></div>}
                        {serverError && <div className="error"><p>The server is not responding...</p></div>}
                    </div>
                </animated.div>
                <animated.div style={props3}>

                    <div>
                        <Link className="modal-button" to="/signup"> Click here to sign up! </Link>
                    </div>
                    <div>
                        <button
                            className="modal-button"
                            onClick={handlePassword}>Forgot your password?</button>
                        {modal ? <EmailModal email={values.email} text={'Forgot your password?'} open={[open, setOpen]} handleClick={handleClick} /> : null}
                    </div>
                </animated.div>
                <animated.div style={props3}>
                    <Button onClick={handleModalTwo}>Project Details</Button>
                    {modalTwo ? <Terms openTwo={[openTwo, setOpenTwo]} handleClickTwo={handleClickTwo}/> : null}
                </animated.div>
            </div>

        </div>
    )
}

export default Login;