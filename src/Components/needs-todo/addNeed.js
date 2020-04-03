//this component will be to update the needs on the profile page 
//get here by clicking button on edit needs list
//this will make the api call with the added need or the updated need
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useAddNeed from '../../Hooks/useAddNeed';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Cookies from 'js-cookie';
import './updateNeeds.css'

const AddNeeds = () => {
    // console.log(props.location)

    const [errorMessage, setErrorMessage] = useState(null);



    const {
        handleChange,
        handleSubmit,
        values
    } = useAddNeed(submit);



    //useHistory to push back to profile after updates are submitted
    let history = useHistory()

    function submit() {
        console.log(values)
        const token = Cookies.get("token");


        const url = "http://localhost:5000/addNeed";

        // implement POST REQUEST

        const handleErrors = (error) => {
            if (error) {
                setErrorMessage(error);
            }
            return error;
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(res => res.json)
            .then(response => {
                console.log(response);
                //push to login here 
                history.push('/profile')
            })
            .then(handleErrors)
            .catch(error => {
                if (error) {
                    console.log(error);
                }
            })
    }


    return (
        <div className="updateneed-container">
            <div className="updateneed-inner">
                <form onSubmit={handleSubmit} noValidate autoComplete="false">
                    <label>What type of thing do you need right now?</label>
                    <input type="text"
                        name="needType"
                        className="form-control"
                        onChange={handleChange}
                        value={values.needType}
                    />
                    <label>Please describe what you need below: </label>
                    <input type="text"
                        name="needDescription"
                        className="form-control"
                        onChange={handleChange}
                        value={values.needDescription}
                    />
                    <label>What type of thing can you exchange in return? No worries if this is left blank!</label>
                    <input type="text"
                        name="exchangeType"
                        className="form-control"
                        onChange={handleChange}
                        value={values.exchangeType}
                    />
                    <label>Please describe what you need below: </label>
                    <input type="text"
                        name="exchangeDescription"
                        className="form-control"
                        onChange={handleChange}
                        value={values.exchangeDescription}
                    />
                    <Link to={{
                        pathname: '/profile',
                    }}>
                        <button
                            className="btn btn-secondary">
                            <CancelPresentationIcon />
                        </button>
                    </Link>

                    <button
                        className="btn btn-secondary"
                        type="submit">
                        <CheckBoxIcon />
                    </button>
                    {errorMessage && <div>{errorMessage}</div>}

                </form>
            </div>
        </div>
    )
}

export default AddNeeds;