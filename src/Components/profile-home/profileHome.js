import React, { useState, useEffect, useContext, useHistory } from 'react';
import { Link } from 'react-router-dom';
import useGetUser from '../../Hooks/useGetUser';
// import newMessages from '../../Hooks/useNotification';
import Profile from '../profile/profile';
import NeedsTodo from '../needs-todo/needsTodo';
import UserNeedsList from '../user-needs-list/userNeedsList';
import { UserContext, NeedsContext, NewMessageContext } from '../user-context/userContext';
import Cookies from 'js-cookie';
import './profileHome.css';
import Notify from './notify';
import { ThemeContext } from '../user-context/userContext';
import { subscribeUser } from '../../subscription';
// import { lightTheme, darkTheme } from '../../theme';
import { useSpring, animated } from 'react-spring';
import { Button } from '../../global';

//this component is the parent of Profile, Needs list, and Update Needs

//TODO: update last_login once user is notified of new messages

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
    const propsNotify = useSpring({
        // opacity: 1,
        // from: { opacity: 0 },
        // delay: 3000,
        // duration: 2500
        opacity: 1,
        from: { opacity: 0 },
        marginTop: 1,
        from: { marginTop: 1500 },
        delay: 2000
    })

    //theme
    // const [currentTheme, setCurrentTheme] = useContext(ThemeContext);

    //get user hook
    const { user, needs } = useGetUser()
    //if offline and can't fetch user 

    const [newMessageAlert, setNewMessageAlert] = useContext(NewMessageContext)

    // console.log(user, needs)
    //check for token, else show button
    const [tokenExists, setTokenExists] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null);
    const [serverError, setServerError] = useState(null);
    //TODO: use recent messages to show the user names of unread messages to the user
    const [recentMessages, setRecentMessages] = useState(null);

    // const [notify, setNotify] = useState(false);
    //check for new messages for user
    const newMessages = ({ user }) => {

        //users last login date 
        const last_login = user.last_login;
        const userName = user.name;
        console.log(last_login)
        console.log(userName)
        const id = user._id;
        const url = "http://localhost:3001/recentMessages"
        //fetch most recent messages with user's id 
        //use the "result.from" to show user who their new message is from
        //then update last login
        //TODO: customize this
        const handleErrors = (error) => {
            console.log(error)
            if (error) {
                setErrorMessage(error.error)
            } else if (error instanceof TypeError) {
                setServerError(true)
            } else return error;
        }
        //fetch past chat
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ id, last_login }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json()) //response is

            .then(response => {
                console.log(response)
                if (response.error || response == undefined) {
                    handleErrors(response)
                } else if(response.msg){
                    setNewMessageAlert(false)
                }else {
                    setRecentMessages(response)
                    // setNotify(true)
                    setNewMessageAlert(true)
                    // console.log(response)
                    //TODO: call for push notification here with the name of other person!
                    //use context to tell nav to trigger the flashing inbox!
                }

            })
            .catch(error => {
                if (error) {
                    console.log(error)
                    handleErrors(error)
                } else if (error instanceof TypeError) {
                    setServerError(true)
                }
            })
    }

    //TODO: update last login after user has gotten their notifications
    const updateLastLogin = () => {

        const url = 'http://localhost:5000/updateLastLogin';
        const _id = user._id;
        //TODO: format this date for the ISO that mongo db uses!!!
        const token = Cookies.get("token");
         //fetch past chat
         fetch(url, {
            method: 'PUT',
            body: JSON.stringify({ _id }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(res => res.json()) //response is

            .then(response => {
                console.log(response)
                // if (response.error || response == undefined) {
                //     handleErrors(response)
                // } else {
                //     setRecentMessages(response)
                //     // setNotify(true)
                    // setNewMessageAlert(false)
                //     // console.log(response)
                //     //TODO: call for push notification here with the name of other person!
                //     //use context to tell nav to trigger the flashing inbox!
                // }

            })
            .catch(error => {
                // if (error) {
                    console.log(error)
                    // handleErrors(error)
                // } else if (error instanceof TypeError) {
                //     setServerError(true)
                // }
            })
    }

    //check if auth token exists in browser already
    useEffect(() => {
        if (Cookies.get("token")) {
            setTokenExists(true)
        }
    }, [])

    //subscribes user to service worker push notifications
    useEffect(() => {
        subscribeUser({ user });
    }, [user])
    //checks for new messages
    useEffect(() => {
        newMessages({ user })
    }, [user])
    //updates last_login field 
    useEffect(() => {
        updateLastLogin();
    },[newMessageAlert])



    return (

        <div>
            <animated.div style={propsNotify}>
                {/* { notify && <Notify callback={closeNotify}/>} */}
                {/* <Notify callback={closeNotify} open={notify}/> */}
            </animated.div>
            {tokenExists ?
                <div className="profile-home-container">
                    {/* { notify && <Notify callback={closeNotify}/>} */}
                    <animated.div style={props}>
                        <Profile user={user} />
                    </animated.div>
                    <animated.div style={props2}>
                        <UserNeedsList user={user} needs={needs} />
                    </animated.div>
                    <animated.div style={props3}>
                        <NeedsTodo user={user} needs={needs} />
                    </animated.div>

                </div> :
                <p>Loading.....</p>
                // <Link to="/">
                //     <Button className="fancy-btn-text" >Please Login to view content</Button>
                // </Link>
            }
        </div>

    )
}

export default ProfileHome;