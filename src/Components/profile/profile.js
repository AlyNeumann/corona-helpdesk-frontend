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

    //for material UI
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    // const emergencyConract1 = user.emergencyContacts[0]
    // const emergencyConract2 = user.emergencyContacts[1]
    // console.log(user)


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

    useEffect(() => {

        user.healthStatus = healthOptions[user.healthStatus]

    }, [user])

    return (
        <div className="profile-container">
            <div className="profile-inner">
                <h2>Your Profile</h2>
                <div className="profile-image-container" >
                    {/* find default photo to set here, onClick to change the photo */}
                    {user.image? <img className="profile-image" src={user.image} /> : <img className="profile-image" src={PortraitPlaceholder} />}
                </div>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Profile Details
                </ListSubheader>
                    }
                    className={classes.root}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <PlaceIcon />
                        </ListItemIcon>
                        
                        <ListItemText primary={user? `User Addres: No Address` : "User Address: Unknown"} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <FavoriteBorderIcon />
                        </ListItemIcon>
                        <ListItemText primary={user? `Health Status: ${user.healthStatus}`: "Health Status: Unknown"}/>
                    </ListItem>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <ContactMailIcon />
                        </ListItemIcon>
                        <ListItemText primary={user? `Contact Info : ${user.email}`: "Contact Info: Unknown"} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <ContactPhoneIcon />
                                </ListItemIcon>
                                <ListItemText primary={user ? `Phone: ${user.phoneNumber}`: "Phone: Unknown"}/>
                            </ListItem>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <ContactPhoneIcon />
                                </ListItemIcon>
                                <ListItemText primary={user? `Emergency Contact: ${user.emergencyContacts}`: "Emergency: Unknown"}/>
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
                    <button className="btn btn-secondary"
                    >Update Profile
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Profile;