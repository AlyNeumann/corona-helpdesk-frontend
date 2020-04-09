import React, { useState, useEffect, useContext, createContext } from 'react';
import Profile from '../profile/profile';
import NeedsTodo from '../needs-todo/needsTodo';
import UserNeedsList from '../user-needs-list/userNeedsList';
import { UserContext, NeedsContext } from '../user-context/userContext';
import Cookies from 'js-cookie';
import './profileHome.css';
import { ThemeContext } from '../user-context/userContext';
import { lightTheme, darkTheme } from '../../theme';
import { Button } from '../../global'
import { useSpring, animated } from 'react-spring';
// import { useSpring, animated } from 'react-spring';

//this component is the parent of Profile, Needs list, and Update Needs
//this is where the global state for the User is set



const ProfileHome = () => {

       //react spring styles
       const props = useSpring({
        opacity: 1, 
        from: {opacity: 0}
    })
    const props2= useSpring({
        opacity: 1, 
        from: {opacity: 0},
        delay: 500
    })
    const props3 = useSpring({
        opacity: 1, 
        from: {opacity: 0},
        delay: 1000
    })

    //theme
    const [currentTheme, setCurrentTheme] = useContext(ThemeContext);

    //setting global context for user
    const [user, setUser] = useContext(UserContext);

    //setting global context for user needs
    const [needs, setNeeds] = useContext(NeedsContext);
    //state for error messages
    const [errorMessage, setErrorMessage] = useState(null);



    //for theme
    const handleClick = () => {
        if (currentTheme === lightTheme) {
            setCurrentTheme(darkTheme)
        } else {
            setCurrentTheme(lightTheme)
        }
    }
    const getUserAndNeeds = () => {
        const token = Cookies.get('token')
        const url = "http://localhost:5000/getUser"

        //handle error messages
        const handleErrors = (error) => {
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
                }

            })
            .then(handleErrors)
            .catch(error => {
                if (error) {
                    console.log(error)
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
                     <animated.div style={props}>
                    <Profile user={user} />
                    </animated.div>
                    <animated.div style={props2}>
                    <UserNeedsList user={user} needs={needs} />
                    </animated.div>
                    <animated.div style={props3}>
                    <NeedsTodo user={user} needs={needs} />
                    </animated.div>
                    <Button
                        onClick={handleClick}
                    >Change Theme</Button>
                </div> : <div>Loading...</div>}
        </div>

    )
}

export default ProfileHome;