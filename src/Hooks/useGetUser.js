import React, { useState, useEffect, useContext } from 'react';
import { UserContext, NeedsContext } from '../Components/user-context/userContext';
import Cookies from 'js-cookie';

const useGetUser = () => {

    const [user, setUser] = useContext(UserContext);

    //setting global context for user needs
    const [needs, setNeeds] = useContext(NeedsContext);
    // state for error messages
    const [errorMessage, setErrorMessage] = useState(null);
    // console.log('get user hook being called')


    const getUserAndNeeds = () => {
        const token = Cookies.get('token')
        const url = "http://localhost:5000/getUser"
        // const url = "http://localhost:5000/getUser"

        //handle error messages
        const handleErrors = (error) => {
            // console.log('get user returns error')
            if (error) {
                setErrorMessage(error)
            }
            else return error
        }

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
            .then(res => res.json()) //response is
            .then(response => {
                if (!errorMessage) {
                    // console.log(response);
                    setUser(response);
                    setNeeds(response.neededList);
                    //TODO: not sure if needed but for storing user profile in offline mode
                    // localStorage.setItem('currentUser', response);
                    // console.log('get user response working')
                }

            })
            .then(handleErrors)
            .catch(error => {
                if (error) {
                    // console.log(error)
                    setErrorMessage(error)
                }
            })

    }

    useEffect(() => {
        getUserAndNeeds();
    }, [])
    //TODO: not fully working yet, trying to store user for offline mode
    // useEffect(() => {
    //     if(!user){
    //         const pastUserInfo = localStorage.getItem('currentUser');
    //         console.log(pastUserInfo)
    //         setUser(pastUserInfo);
    //         setNeeds(pastUserInfo.neededList);
    //     }
       
    // }, [errorMessage])
    return { user, needs }

}

export default useGetUser;


