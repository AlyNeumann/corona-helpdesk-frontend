import React, { useState, useEffect, useContext, useHistory } from 'react';
import { Link } from 'react-router-dom';
import useGetUser from '../../Hooks/useGetUser';
import Profile from '../profile/profile';
import NeedsTodo from '../needs-todo/needsTodo';
import UserNeedsList from '../user-needs-list/userNeedsList';
import { UserContext, NeedsContext } from '../user-context/userContext';
import Cookies from 'js-cookie';
import './profileHome.css';
import { ThemeContext } from '../user-context/userContext';
// import { lightTheme, darkTheme } from '../../theme';
// import { Button } from '../../global'
import { useSpring, animated } from 'react-spring';
import { Button } from '../../global';
// import { useSpring, animated } from 'react-spring';

//this component is the parent of Profile, Needs list, and Update Needs

//TODO: make function to check current chats to past chats
//send notification if there are new chats

const ProfileHome = () => {

    //react spring styles
    const props = useSpring({
        opacity: 1,
        from: { opacity: 0 }
    })
    const props2 = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        delay: 500
    })
    const props3 = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        delay: 1000
    })

    //theme
    // const [currentTheme, setCurrentTheme] = useContext(ThemeContext);

    //get use hook
    const { user, needs } = useGetUser()

    console.log(user, needs)
    //check for token, else show button
    const [tokenExists, setTokenExists] = useState(false)


    useEffect(() => {
        if (Cookies.get("token")) {
            setTokenExists(true)
        }
    }, [])


    return (

        <div>
            {tokenExists ?
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
                   
                </div> : <p>Loading.....</p>
                // <Link to="/">
                //     <Button className="fancy-btn-text" >Please Login to view content</Button>
                // </Link>
                }
        </div>

    )
}

export default ProfileHome;