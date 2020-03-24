import React, { useEffect } from 'react';
import StyledDropzone from './photo-picker-simple'
import useProfileUpdate from '../../Hooks/useProfileUpdate';
import useMiniMap from '../../Hooks/useMiniMap';
//TODO: place holders will be info from signup
import './profileUpdate.css';


const ProfileUpdate = ({ user }) => {

    //bring in map for location picking
    const [address] = useMiniMap("map")
    console.log(address)
    //hook for signup submit & validate 
    const {
        handleChange,
        handleSubmit,
        handleImage,
        handleLocation,
        values
    } = useProfileUpdate(submit)

    //when address exists, handle value
    useEffect(() => {
        if (address) {
            handleLocation(address)
        }
    }, [address])

    function submit() {
        const url = "http://localhost:5000/updateprofile"
        console.log('submitting!')
        let formData = new FormData(); // image needs form data format

        for (let [key, value] of Object.entries(values)) {
            console.log(key, value)
            formData.append(key, value);
        }

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
                        <label>User Address</label>
                        <input type="text"
                            name="address"
                            className="form-control"
                            placeholder={user.address}
                            onChange={handleChange}
                            value={values.address} />
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
                            name="name"
                            className="form-control"
                            placeholder={user.contactInfo}
                            onChange={handleChange}
                            value={values.contactInfo} />
                    </div>
                    <div className="form-group">
                        <label>Emergency Contact</label>
                        <input type="text"
                            name="emergencyContacts"
                            className="form-control"
                            placeholder={user.emergencyContact}
                            onChange={handleChange}
                            value={values.emergencyContacts} />
                    </div>
                    <div className="form-group">
                        <label>Avatar Photo</label>
                        {/* handleImage needs to be used here */}
                        <StyledDropzone handleIt={handleImage}/>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <div id="map">
                        </div>

                    </div>
                    <button type="submit"
                        className="btn btn-secondary btn-block"
                    >Update</button>

                </form>

            </div>
        </div>
    )
}

export default ProfileUpdate;
