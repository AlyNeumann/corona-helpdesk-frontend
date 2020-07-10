import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Aly16smallest from '../../Assets/images/Aly16smallest.png';
import PortraitPlaceholder from '../../Assets/images/Portrait_Placeholder.png'
import './profile.css';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PlaceIcon from '@material-ui/icons/Place';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChatIcon from '@material-ui/icons/Chat';
import { useSpring, animated } from 'react-spring'


//TODO: will need to make hashmap for health statuses 

//styles for material UI
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));



const Profile = ({ user, needs }) => {

    //react spring
    const props1 = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        delay: 100
    })
    const props2 = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        delay: 1750
    })

    const data = user.img;

    //hashmap for health statuses
    const healthOptions = {
        "1": "Healthy",
        "2": "Sick",
        "3": "Immune Compromised/Elderly",
        "4": "Diagnosed/Quarantined",
        "5": "Unsure"
    }

    //open profile update if true
    const [update, setUpdate] = useState(false)
    const [profileId, setProfileId] = useState(null)

    //for material UI
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    //history to push to chat
    let history = useHistory();


    //to update profile
    const handleUpdate = () => {
        setUpdate(true)
    }
    //to open contact details
    const handleClick = () => {
        if (!open) {
            setOpen(true);
        } else {
            setOpen(false);
        }

    };
    //sends user to chat page
    const handleChat = () => {
        history.push('/chat');
    }

    useEffect(() => {

        user.healthStatus = healthOptions[user.healthStatus]
        setProfileId(user._id)

    }, [user])

    return (
        //     <animated.div
        //     className="card"
        //     onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        //     onMouseLeave={() => set({ xys: [0, 0, 1] })}
        //     style={{ transform: props.xys.interpolate(trans) }}
        //   >
        <div className="profile-container">
            <div className="profile-inner">
                <h2>Your Profile</h2>
                <animated.div style={props2}>
                    <div className="profile-image-container" >
                        <Link to={{
                            pathname: '/profileupdate',
                            state: {
                                user
                            }
                        }}>
                            {data ? <img className="profile-image" src={`data:image/jpeg;base64,${data}`} /> : <img className="profile-image" src={PortraitPlaceholder} />}
                        </Link>
                    </div>
                </animated.div>
                <animated.div style={props1}>
                    <h4>{user.name}</h4>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        className={classes.root}
                    >
                        <ListItem button onClick={handleChat}>
                            <ListItemIcon>
                                <ChatIcon className="iconclass" />
                            </ListItemIcon>

                            <ListItemText primary="Chat" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <FavoriteBorderIcon className="iconclass" />
                            </ListItemIcon>
                            <ListItemText primary={user ? `Health Status: ${user.healthStatus}` : "Health Status: Unknown"} />
                        </ListItem>
                        <ListItem button onClick={handleClick}>
                            <ListItemIcon>
                                <ContactMailIcon className="iconclass" />
                            </ListItemIcon>
                            <ListItemText primary={user ? `Contact Info : ${user.email}` : "Contact Info: Unknown"} />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <ContactPhoneIcon className="iconclass" />
                                    </ListItemIcon>
                                    <ListItemText primary={user ? `Phone: ${user.phoneNumber}` : "Phone: Unknown"} />
                                </ListItem>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <ContactPhoneIcon className="iconclass" />
                                    </ListItemIcon>
                                    <ListItemText primary={user ? `Emergency Contact: ${user.emergencyContacts}` : "Emergency: Unknown"} />
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                    <Link to={{
                        pathname: '/profileupdate',
                        state: {
                            user
                        }
                    }}>
                        <button className="btn btn-secondary btn-text"
                        >Update Profile
                    </button>
                    </Link>
                </animated.div>
            </div>
        </div>
        //    </animated.div>
    )
}

export default Profile;