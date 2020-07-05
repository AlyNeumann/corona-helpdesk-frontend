//this component will be to update the needs on the profile page 
//get here by clicking button on edit needs list
//this will make the api call with the added need or the updated need
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useAddNeed from '../../Hooks/useAddNeed';
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

const AddNeeds = () => {
    // console.log(props.location)

    //material ui
    const classes = useStyles();

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
                    {/* <label>What type of thing do you need right now?</label>
                    <input type="text"
                        name="needType"
                        className="form-control"
                        onChange={handleChange}
                        value={values.needType}
                    /> */}
                    <div className="form-group">
                        <label>Please describe what you need below: </label>
                        <input type="text"
                            name="needDescription"
                            className="form-control"
                            onChange={handleChange}
                            value={values.needDescription}
                            maxLength="60"
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

                    {/* <label>What type of thing can you exchange in return? No worries if this is left blank!</label>
                    <input type="text"
                        name="exchangeType"
                        className="form-control"
                        onChange={handleChange}
                        value={values.exchangeType}
                    /> */}
                    <div className="form-group">
                        <label>Please describe what you can exchange below: </label>
                        <input type="text"
                            name="exchangeDescription"
                            className="form-control"
                            onChange={handleChange}
                            value={values.exchangeDescription}
                            maxLength="60"
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
                    <div className="warning-text">Make sure to fill in all fields!</div>
                </form>
            </div>
        </div>
    )
}

export default AddNeeds;