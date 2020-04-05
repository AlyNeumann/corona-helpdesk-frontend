import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Aly16smallest from '../../Assets/images/Aly16smallest.png';
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



const Aly = () => {


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

    //open linkedin profile
    const handleLinkedIn = () => {
        window.open('https://www.linkedin.com/in/alymargueriteneumann/');
    }


    return (
        <div className="profile-container">
            <div className="profile-inner">
                <h2>Your Profile</h2>
                <div className="profile-image-container" >
                    Image Here
                </div>
                <h4>Aly Marguerite Neumann</h4>
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

                        <ListItemText primary="Location : Montreal" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <FavoriteBorderIcon />
                        </ListItemIcon>
                        <ListItemText primary="Health Status: Immune Compromised" />
                    </ListItem>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <ContactMailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contact Info: neumannbooking@gmail.com" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <ContactPhoneIcon />
                                </ListItemIcon>
                                <ListItemText primary="Phone: 514-835-2341" />
                            </ListItem>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <ContactPhoneIcon />
                                </ListItemIcon>
                                <ListItemText primary="Emergency: 250-941-3702" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
                <button
                onClick={handleLinkedIn} 
                className="btn btn-secondary btn-text"
                >LinkedIn Profile</button>
            </div>
        </div>
    )
}

export default Aly;