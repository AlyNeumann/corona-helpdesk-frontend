import React from 'react';
import useSignUp from '../../Hooks/useSignupForm';
import validate from './validate';
import { useHistory } from 'react-router-dom';
import './login.css';
//needs error handling & error messages displayed

const Signup = () => {

       //hook for signup submit & validate 
       const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useSignUp(submit, validate)

    //bring in history to redirect to login after submit
    let history = useHistory();

    //submit signup form to backend
    function submit() {
        const url = "some urrrrl string"

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
            if(error) {
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
                        name="Name"
                        className="form-control"
                        placeholder="Username"
                        onChange={handleChange}
                        value={values.Username} />
                </div>
                <div className="form-group">
                    <label>First name</label>
                    <input type="text"
                        name="PhoneNumber"
                        className="form-control"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        value={values.PhoneNumber} />
                </div>
                <div className="form-group">
                    <label>First name</label>
                    <input type="text"
                        name="Address"
                        className="form-control"
                        placeholder="Address"
                        onChange={handleChange}
                        value={values.Address} />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email"
                        name="Email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={handleChange}
                        value={values.Email} />

                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password"
                        name="Password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={handleChange}
                        value={values.Password} />

                </div>
                <button type="submit" 
                className="btn btn-secondary btn-block"
                >Sign Up</button>
            </form>
            </div>
        </div>)
}

export default Signup; 