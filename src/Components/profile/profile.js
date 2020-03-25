import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ProfileUpdate from './profile-update';
import Aly16smallest from '../../Assets/images/Aly16smallest.png'
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



const Profile = () => {


    //open profile update if true
    const [update, setUpdate] = useState(false)

    //for material UI
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);


    //makes a call to back end for user data
    //passes values to ProfileUpdate 
    const user = {
        name: "Aly Neumann",
        address: "3035 rue Saint Antoine Ouest, Montreal, Canada",
        healthStatus: "immune compromised/elderly",
        contactInfo: "514-835-2341",
        emergencyContact: "1112222333"
    }

    //to update profile
    const handleUpdate = () => {
        setUpdate(true)
    }
    //to open contact details
    const handleClick = () => {
        setOpen(!open);
      };

    // const handleUpdate = () => {
    //     console.log('update profile!')
    // }
    return (
        <div className="profile-container">
            <div className="profile-inner">
                <h2>Welcome</h2>
                <div className="profile-image-container" >
                                    {/* find default photo to set here, onClick to change the photo */}
                <img className="profile-image" src={Aly16smallest}/>
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
        <ListItemText primary="User Address" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <FavoriteBorderIcon />
        </ListItemIcon>
        <ListItemText primary="Health Status" />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <ContactMailIcon />
        </ListItemIcon>
        <ListItemText primary="Contact Info" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ContactPhoneIcon />
            </ListItemIcon>
            <ListItemText primary="Phone" />
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
                    // onClick={handleUpdate}
                >Update Profile
                    </button>
                    {/* {update && <ProfileUpdate user={user}/> } */}
                    </Link>
            </div>
            <div>
                Some options:
                Click here for the latest news
                See up to date tracking of the virus
                See the list of people who need your help!
            </div>
        </div>
    )
}

export default Profile;