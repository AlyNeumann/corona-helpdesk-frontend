import React, { useState, useEffect, useContext, createContext } from 'react';
import Profile from '../profile/profile';
import NeedsTodo from '../needs-todo/needsTodo';
import UserNeedsList from '../user-needs-list/userNeedsList';
import { UserContext, NeedsContext } from '../user-context/userContext';
import Cookies from 'js-cookie';
import './profileHome.css';

//this component is the parent of Profile, Needs list, and Update Needs
//this is where the global state for the User is set



const ProfileHome = () => {
    

    //setting global context for user
    const [user, setUser] = useContext(UserContext);
    //setting global context for user needs
    const [needs, setNeeds] = useContext(NeedsContext);
    //state for error messages
    const [errorMessage, setErrorMessage] = useState(null);
    //TODO: GET needs list 
    const getUserAndNeeds = () => {
        const token = Cookies.get('token')
        const url = "http://localhost:5000/getUser"

        //handle error messages
        const handleErrors = (response) => {
            if (response.error) {
                setErrorMessage(response.error)
            }
            else return response
        }

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
            .then(res => res.json()) //response is
            .then(handleErrors)
            .catch(error => {
                if (error) {
                    console.log(error)
                }
            })
            .then(response => {
                if (!errorMessage) {
                    console.log(response);
                    setUser(response);
                    setNeeds(response.neededList);
                }

            })

    }

    //fetch User's needs
    useEffect(() => {
        getUserAndNeeds();
    }, [])

    return (
        <div>
            {user ?
                <div className="profile-home-container">
                    <Profile user={user} />
                    <NeedsTodo user={user} needs={needs} />
                    <UserNeedsList user={user} needs={needs} />
                </div> : <div>Loading...</div>}
        </div>
    )
}

export default ProfileHome;