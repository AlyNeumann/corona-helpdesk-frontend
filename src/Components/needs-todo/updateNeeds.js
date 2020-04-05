//this component will be to update the needs on the profile page 
//get here by clicking button on edit needs list
//this will make the api call with the added need or the updated need
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useUpdateNeed from '../../Hooks/useUpdateNeed';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Cookies from 'js-cookie';
import './updateNeeds.css'

const UpdateNeeds = (props) => {
    // console.log(props.location)
    //getting previous needs from props
    const need = props.location.state.need;
    const _id = props.location.state.need._id
    const [errorMessage, setErrorMessage] = useState(null);
    console.log(_id)


    const {
        handleChange,
        handleSubmit,
        values
    } = useUpdateNeed(submit, need, _id);



    //useHistory to push back to profile after updates are submitted
    let history = useHistory()


    //submit the ADD NEED to backend
    //TODO: only need one call here, all needs will be updated 
    // Cookies.get('token') for authorization
    function submit() {
        console.log(values)
        const token = Cookies.get("token");

        //TODO: add _id to the request body!! 

        const url = "http://localhost:5000/updateNeed";

        // implement POST REQUEST

        const handleErrors = (error) => {
            if (error) {
                setErrorMessage(error);
            }
            return error;
        }

        fetch(url, {
            method: 'PUT',
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
                        // placeholder={values.need}
                        // {!props.location.state? 'Enter some text' : props.location.state.need.need}
                        onChange={handleChange}
                        value={values.needType}
                    />
                    <label>Please describe what you need below: </label>
                    <input type="text"
                        name="needDescription"
                        className="form-control"
                        // placeholder={values.need}
                        // {!props.location.state? 'Enter some text' : props.location.state.need.need}
                        onChange={handleChange}
                        value={values.needDescription}
                    />
                    <label>What type of thing can you exchange in return? No worries if this is left blank!</label>
                    <input type="text"
                        name="exchangeType"
                        className="form-control"
                        // placeholder={!props.location.state? 'If you can exchange something, enter it here' : props.location.state.need.exchange}
                        onChange={handleChange}
                        value={values.exchangeType}
                    />
                    <label>Please describe what you need below: </label>
                    <input type="text"
                        name="exchangeDescription"
                        className="form-control"
                        // placeholder={!props.location.state? 'Enter quantity' : props.location.state.need.quantity}
                        onChange={handleChange}
                        value={values.exchangeDescription}
                    />
                    <Link to={{
                        pathname: '/profile',
                    }}>
                        <button
                            className="btn btn-secondary btn-text">
                            <CancelPresentationIcon />
                        </button>
                    </Link>

                    <button
                        className="btn btn-secondary btn-text"
                        type="submit">
                        <CheckBoxIcon />
                    </button>
                    {errorMessage && <div>{errorMessage}</div>}

                </form>
            </div>
        </div>
    )
}

export default UpdateNeeds;