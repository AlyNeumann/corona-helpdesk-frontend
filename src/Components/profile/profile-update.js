import React, { useEffect, useState } from 'react';
// import * as Doka from './doka.esm.min';
// import './doka.min.css';
// import { Doka } from './react-doka';
import { useHistory } from 'react-router-dom';
import StyledDropzone from './photo-picker-simple'
import useProfileUpdate from '../../Hooks/useProfileUpdate';
import useMiniMap from '../../Hooks/useMiniMap';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Cookies from 'js-cookie';
import './profileUpdate.css';

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

//TODO:send this as form data to back end
const ProfileUpdate = (props) => {

    //material ui
    const classes = useStyles();

    const user = props.location.state.user;
    // const userId = user._id

    //bring in map for location picking
    const [map, address, coords] = useMiniMap("map")
    //image file
    const [img, setImg] = useState(null);
    //hook for signup submit & validate 
    const {
        handleChange,
        handleSubmit,
        handleLocation,
        handleEmergency,
        handleImage,
        values
    } = useProfileUpdate(submit, user)

    //when address exists, handle value
    useEffect(() => {
        if (coords) {
            handleLocation(coords)
        }
    }, [coords])

    //use history to push back to profile page on submit
    let history = useHistory()

    //close - cancel
    const handleClose = () => {
        history.push('/profile');
    }
    //handling image file - this can be in hook, if everything is form data there....
    // const handleImage = (img) => {
    //     console.log(img)
    // }

    //TODO: help me!!! formdata not working
    function submit() {
        const url = "http://localhost:5000/updateProfile"
        console.log('values before form')
        console.log(values)
        let token = Cookies.get("token")

        let formData = new FormData();

        for (let key in values) {
            console.log(key)
            if (key === 'coords') {
                formData.append(key, JSON.stringify(values[key]))
            } else {
                formData.append(key, values[key]);

            }
            console.log(formData.get(key))
        }
        // Object.keys(values).forEach(key => formData.append(key, values[key]));
        console.log(Array.from(formData.values()))

        // handling error messages
        const handleErrors = (error) => {
            console.log('response from signup ' + error)
            return error;
        }

        fetch(url, {
            method: 'PUT',
            body: formData,
            headers: {
                "Authorization": token
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
                //push back to profile here
                history.push('/profile');
            })


    }

    return (
        <div className="profile-update">
            <div className="profileupdate-container">
                <div className="profileupdate-inner">
                    <form onSubmit={handleSubmit} noValidate autoComplete="true">
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text"
                                name="name"
                                className="form-control"
                                placeholder={user.name}
                                onChange={handleChange}
                                value={values.username} />
                        </div>
                        <div className="form-group">
                            <label>User Location</label>
                            <input type="text"
                                placeholder="Which city and neighbourhood are you located in?"
                                name="location"
                                className="form-control"
                                onChange={handleChange}
                                value={values.location} />
                        </div>
                        <div className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Health Status</InputLabel>
                            <Select
                                native
                                name="healthStatus"
                                onChange={handleChange}
                                value={values.healthStatus}
                                label="Health Status"
                                inputProps={{
                                    name: 'healthStatus',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option aria-label="Healthy" value="1" />
                                <option value="1">Healthy</option>
                                <option value="2">Symptoms/Unsure</option>
                                <option value="3">Sick</option>
                            </Select>
                        </div>
                        <div className="form-group">
                            <label>Contact Info</label>
                            <input type="text"
                                name="phoneNumber"
                                className="form-control"
                                placeholder={user.phoneNumber}
                                onChange={handleChange}
                                value={values.contactInfo} />
                        </div>
                        <div className="form-group">
                            <label>Emergency Contact</label>
                            <input type="text"
                                name="emergencyContacts"
                                className="form-control"
                                placeholder={user.emergencyContacts[0] || ""}
                                onChange={handleEmergency}
                                value={values.emergencyContacts[0] || ""} />
                            <input type="text"
                                name="emergencyContacts1"
                                className="form-control"
                                placeholder={user.emergencyContacts[1] || ""}
                                onChange={handleEmergency}
                                value={values.emergencyContacts[1] || ""} />
                        </div>
                        <div className="form-group">
                            <label>Avatar Photo</label>
                            {/* handleImage needs to be used here */}
                            <StyledDropzone handleIt={handleImage} />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <div id="map">
                            </div>

                        </div>
                        <button type="submit"
                            className="btn btn-secondary update-btn btn-text"
                        >Update</button>

                    </form>
                    <button
                        className="btn btn-secondary update-btn btn-text"
                        onClick={handleClose}>
                        Close</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileUpdate;
