import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PortraitPlaceholder from '../../Assets/images/Portrait_Placeholder.png'
import './profileView.css';
import { makeStyles } from '@material-ui/core/styles';
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
// import { useSpring, animated } from 'react-spring'


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



const UsersProfile = (props) => {
    const viewedUser = props.user;
    // console.log(props.user)
    const userImg = viewedUser.img

    //hashmap for health statuses
    const healthOptions = {
        "1": "Healthy",
        "2": "Sick",
        "3": "Immune Compromised/Elderly",
        "4": "Diagnosed/Quarantined",
        "5": "Unsure"
    }

    //open profile update if true
    // const [update, setUpdate] = useState(false)
    const [profileId, setProfileId] = useState(null)

    //for material UI
    const classes = useStyles();
    const [open, setOpen] = useState(false);


    //to open contact details
    const handleClick = () => {
        if (!open) {
            setOpen(true);
        } else {
            setOpen(false);
        }

    };

    useEffect(() => {

        viewedUser.healthStatus = healthOptions[viewedUser.healthStatus]
        setProfileId(viewedUser._id)

    }, [viewedUser])

    return (

        <div className="profile-container">
            <div className="profile-inner">
                <h2>User Profile</h2>
                <div className="profile-image-container" >
                    {userImg ? <img className="profile-image" src={`data:image/jpeg;base64,${userImg}`} /> : <img className="profile-image" src={PortraitPlaceholder} />}
                </div>
                <h4>{viewedUser.name}</h4>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.root}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <ChatIcon className="iconclass" />
                        </ListItemIcon>

                        <ListItemText primary="Chat" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <FavoriteBorderIcon className="iconclass" />
                        </ListItemIcon>
                        <ListItemText primary={viewedUser ? `Health Status: ${viewedUser.healthStatus}` : "Health Status: Unknown"} />
                    </ListItem>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <ContactMailIcon className="iconclass" />
                        </ListItemIcon>
                        <ListItemText primary={viewedUser ? `Contact Info : ${viewedUser.email}` : "Contact Info: Unknown"} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <ContactPhoneIcon className="iconclass" />
                                </ListItemIcon>
                                <ListItemText primary={viewedUser ? `Phone: ${viewedUser.phoneNumber}` : "Phone: Unknown"} />
                            </ListItem>
                            {/* <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <ContactPhoneIcon className="iconclass" />
                                </ListItemIcon>
                                <ListItemText primary={viewedUser ? `Emergency Contact: ${viewedUser.emergencyContacts}` : "Emergency: Unknown"} />
                            </ListItem> */}
                        </List>
                    </Collapse>
                </List>
                <Link to={{
                    pathname: '/chat',
                    state: {
                        viewedUser
                    }
                }}>
                    <button className="btn btn-secondary btn-text"
                    >Chat
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default UsersProfile;