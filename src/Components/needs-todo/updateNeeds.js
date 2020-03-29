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
    const neededList = props.location.state.needs;
    const need = props.location.state.need;

    const {
        handleChange,
        handleSubmit,
        values,
        item
    } = useUpdateNeed(submit, neededList,need );



    //useHistory to push back to profile after updates are submitted
    let history = useHistory()

    //trying to extract value from placeholder
    // const getPlaceholderValue= () => {
    //     if(neededList){
    //         document.getElementById("demo").defaultValue ={props.location.state.need.need};
    //         const placeholder = document.getElementById("demo").getAttribute("placeholder");
    //         console.log(placeholder);
        
    //     }
    // }
   
  

    //submit the ADD NEED to backend
    //TODO: only need one call here, all needs will be updated 
    // Cookies.get('token') for authorization
    function submit() {
        console.log(values)
        const token = Cookies.get("token");

        const url = "http://localhost:5000/updateNeeds";

        // implement POST REQUEST

        const handleErrors = (error) => {
            console.log('response from signup ' + error)
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
            .then(handleErrors)
            .catch(error => {
                if (error) {
                    console.log(error);
                }
            })
            .then(response => {
                console.log(response);
                //push to login here 
                history.push('/profile')
            })
    }


    return (
        <div className="updateneed-container">
            <div className="updateneed-inner">
                <form onSubmit={handleSubmit} noValidate autoComplete="false">
                    <label>What do you need right now?</label>
                    <input type="text"
                        name="need"
                        id="demo"
                        className="form-control"
                        // placeholder={values.need}
                        // {!props.location.state? 'Enter some text' : props.location.state.need.need}
                        onChange={handleChange}
                        value={item.need}
                    />
                    <label>What can you exchange in return? No worries if this is left blank!</label>
                    <input type="text"
                        name="exchange"
                        className="form-control"
                        // placeholder={!props.location.state? 'If you can exchange something, enter it here' : props.location.state.need.exchange}
                        onChange={handleChange}
                        value={item.exchange}
                    />
                    <label>What quantity do you need of this item?</label>
                    <input type="text"
                        name="quantity"
                        className="form-control"
                        // placeholder={!props.location.state? 'Enter quantity' : props.location.state.need.quantity}
                        onChange={handleChange}
                        value={item.quantity}
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

                </form>
            </div>
        </div>
    )
}

export default UpdateNeeds;