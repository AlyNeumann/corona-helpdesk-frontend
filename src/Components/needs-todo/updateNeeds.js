//this component will be to update the needs on the profile page 
//get here by clicking button on edit needs list
//this will make the api call with the added need or the updated need
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import useAddNeed from '../../Hooks/useAddNeed';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import './updateNeeds.css'

const UpdateNeeds = (props) => {

    const {
        handleChange,
        handleSubmit,
        values
    } = useAddNeed(submit)

    //2 API calls here - if (props.location.state.need) then PUT etc
    //if there is an id in props already, do PUT request
    //if no id, POST

    console.log(props.location)

    //useHistory to push back to profile after updates are submitted
    let history = useHistory()

 
    //submit the ADD NEED to backend
    function submit() {
        
        const url = "http://localhost:5000/signup";

        if(props.location.state.functionType === "add"){
            console.log(props)
            console.log('add')
            // implement POST REQUEST
        }else{
            console.log(props)
            console.log('update')
            //IMPLEMENT PUT REQUEST
        }

        // //check values before submitting
        // console.log(values);
        // // handling error messages
        // const handleErrors = (error) => {
        //     console.log('response from signup ' + error)
        //     return error;
        // }

        // fetch(url, {
        //     method: 'POST',
        //     body: JSON.stringify(values),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // })
        //     .then(res => res.json)
        //     .then(handleErrors)
        //     .catch(error => {
        //         if (error) {
        //             console.log(error);
        //         }
        //     })
        //     .then(response => {
        //         console.log(response);
        //         //push to login here 
        //         history.push('/profile')
        //     })
    }

    return (
        <div className="updateneed-container">
            <div className="updateneed-inner">
                <form onSubmit={handleSubmit} noValidate autoComplete="false">
                <label>What do you need right now?</label>
                    <input type="text"
                        name="need"
                        className="form-control"
                        placeholder={!props.location.state ? 'Enter some text' : props.location.state.need.need}
                        onChange={handleChange}
                        value={values.need}
                    />
                    <label>What can you exchange in return? No worries if this is left blank!</label>
                    <input type="text"
                        name="exchange"
                        className="form-control"
                        placeholder={!props.location.state ? 'If you can exchange something, enter it here' : props.location.state.need.exchange}
                        onChange={handleChange}
                        value={values.exchange}
                    />
                    <label>What quantity do you need of this item?</label>
                    <input type="text"
                        name="quantity"
                        className="form-control"
                        placeholder={!props.location.state ? 'Enter quantity' : props.location.state.need.quantity}
                        onChange={handleChange}
                        value={values.quantity}
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