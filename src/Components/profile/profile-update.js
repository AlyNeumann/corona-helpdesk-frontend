import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import StyledDropzone from './photo-picker-simple'
import useProfileUpdate from '../../Hooks/useProfileUpdate';
import useMiniMap from '../../Hooks/useMiniMap';
import './profileUpdate.css';

//TODO:send this as form data to back end
const ProfileUpdate = (props) => {

    const user = props.location.state.user;

    //bring in map for location picking
    const [address] = useMiniMap("map")
    //image file
    const [img, setImg] = useState(null);
    // console.log(address)
    //hook for signup submit & validate 
    const {
        handleChange,
        handleSubmit,
        handleLocation,
        // handleImage, 
        values
    } = useProfileUpdate(submit)

    //when address exists, handle value
    useEffect(() => {
        if (address) {
            handleLocation(address)
        }
    }, [address])

    //use history to push back to profile page on submit
    let history = useHistory()

    //close - cancel
    const handleClose = () => {
        history.push('/profile');
    }
    //handling image file - this can be in hook, if everything is form data there....
    const handleImage = (img) => {
        setImg(img[0])
    }


    function submit() {
        const url = "http://localhost:5000/updateprofile"
        // console.log(values)

        let formData = new FormData();
        Object.keys(values).forEach(key => formData.append(key, values[key]));


        if (img) {
            formData.append("img", img, img.name)
        }
        console.log(formData)

        // handling error messages
        const handleErrors = (error) => {
            console.log('response from signup ' + error)
            return error;
        }

        fetch(url, {
            method: 'POST',
            body: formData
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
                    <div>
                        <label>Health Status</label>
                        <select className="form-control"
                            name="healthStatus"
                            onChange={handleChange}
                            value={values.healthStatus} >
                            <option value="1">Healthy</option>
                            <option value="2">Sick</option>
                            <option value="3">Immune Compromised/Elderly</option>
                            <option value="4">Diagnosed/Quarantined</option>
                            <option value="5">Unsure</option>
                        </select>
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
                            placeholder={user.emergencyContacts}
                            onChange={handleChange}
                            value={values.emergencyContacts} />
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
                        className="btn btn-secondary update-btn"
                    >Update</button>

                </form>
                <button
                    className="btn btn-secondary update-btn"
                    onClick={handleClose}>
                    Close</button>
            </div>
        </div>
    )
}

export default ProfileUpdate;
