//this component will be to update the needs on the profile page 
//get here by clicking button on edit needs list
//this will make the api call with the added need or the updated need
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useUpdateNeed from '../../Hooks/useUpdateNeed';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Cookies from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import './updateNeeds.css'

//material ui
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const UpdateNeeds = (props) => {

    //material ui
    const classes = useStyles();
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

        const url = "/api/updateNeed";

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
                    <div className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Need Type</InputLabel>
                        <Select
                            native
                            name="needType"
                            onChange={handleChange}
                            value={values.needType}
                            label="Need Type"
                            inputProps={{
                                name: 'needType',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option aria-label="NeedType" value="" />
                            <option value="1">Item</option>
                            <option value="2">Errand</option>
                            <option value="3">Repair</option>
                            <option value="4">Service</option>
                            <option value="5">Nothing</option>
                        </Select>
                    </div>
                    <div className="form-group">
                        <label>Please describe what you need below: </label>
                        <input type="text"
                            name="needDescription"
                            className="form-control"
                            multiline rows="4"
                            // placeholder={values.need}
                            // {!props.location.state? 'Enter some text' : props.location.state.need.need}
                            onChange={handleChange}
                            value={values.needDescription}
                        />
                    </div>
                    <div className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Exchange Type</InputLabel>
                        <Select
                            native
                            name="exchangeType"
                            onChange={handleChange}
                            value={values.exchangeType}
                            label="Exchange Type"
                            inputProps={{
                                name: 'exchangeType',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option aria-label="ExchangeType" value="" />
                            <option value="1">Cash</option>
                            <option value="2">Money Transfer</option>
                            <option value="3">Trade</option>
                            <option value="4">Skill</option>
                            <option value="5">Nothing</option>
                        </Select>
                    </div>
                    <div className="form-group">
                        <label>Please describe what you need below: </label>
                        <input type="text"
                            multiline rows="4"
                            name="exchangeDescription"
                            className="form-control"
                            // placeholder={!props.location.state? 'Enter quantity' : props.location.state.need.quantity}
                            onChange={handleChange}
                            value={values.exchangeDescription}
                        />
                    </div>
                    <Link to={{
                        pathname: '/profile',
                    }}>
                        <button
                            className="btn btn-secondary btn-text">
                            <CancelPresentationIcon className="buttonclass"/>
                        </button>
                    </Link>

                    <button
                        className="btn btn-secondary btn-text"
                        type="submit">
                        <CheckBoxIcon className="buttonclass"/>
                    </button>
                    {errorMessage && <div>{errorMessage}</div>}

                </form>
            </div>
        </div>
    )
}

export default UpdateNeeds;