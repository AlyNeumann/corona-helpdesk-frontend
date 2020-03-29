import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ChatIcon from '@material-ui/icons/Chat';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { PowerSettingsNew, Place } from '@material-ui/icons'
import { useHistory } from 'react-router-dom';
import './nav.css'
import Login from '../login/login';
import Signup from '../login/signup';
import Cookies from 'js-cookie';
// import { UserContext } from '../user-context/userContext';
import PortraitPlaceholder from '../../Assets/images/Portrait_Placeholder.png'

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: "#000",
        color: "#fff"
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));




function Navbar(props) {

    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false)
    // const [user] = useContext(UserContext)

    //TODO: are we using local storage for this?
    const handleLogout = () => {
        Cookies.remove("token")
        history.push('/')
    }
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    //TODO: make secure by pulling cookie
    //   useEffect(()=>{
    //     //   if(Cookies.get("token")){
    //         // let token = Cookies.get('token')
    //         let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJMb25vIiwic3ViIjoiNWU3OTY2ZDMxMDM5NTYyNDZiMWNmZmM0IiwiaWF0IjoxNTg1MzI0ODQ1MDcwLCJleHAiOjE1ODU0MTEyNDUwNzB9.sBb6LxhJpuF8BdPGtHlugIfUdg8JCvJxNne2BBqVv2o"
    //          let url = "http://localhost:5000/getUser"
         
    //         fetch(url,{
    //           method:'GET',
    //           headers:{
    //               'Authorization': token
    //           }
    //       }).then(res => {res.json().then(result => setUser(result))})
    //     //   }else{
    //     //       console.log('No Data')
    //     //   }
    // //   },[Cookies.get('token')])
    // },[])
     



    return (
        <React.Fragment>
            <div className={(history.location.pathname !== "/" && history.location.pathname !== "/signup") ? "" : "d-none"}>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        color="black"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: open,
                                })}
                            >
                                <MenuIcon />
                            </IconButton>
                            {/* <img src={Logo} alt="Lono logo" className="dashboard-image"/> */}
                            <Typography variant="h6" noWrap>
                                {(history.location.pathname === "/profile") && "User Profile"}
                                {(history.location.pathname === "/map") && "Map"}
                                {(history.location.pathname === "/needsfeed") && "List of Needs"}
                                {(history.location.pathname === "/analytics") && "Covid 19 Analytics"}
                                {(history.location.pathname === "/chat") && "Chat"}
                                {(history.location.pathname === "/aboutus") && "About Us"}

                            </Typography>
                            <IconButton color="inherit" style={{ marginLeft: "auto" }} onClick={handleLogout}>
                                <PowerSettingsNew />
                            </IconButton>

                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            }),
                        }}
                    >
                        <div className={classes.toolbar}>
                            <Avatar alt="Remy Sharp" src={props.user.photoUrl || PortraitPlaceholder} style={{ marginLeft: "10px" }} />
                            <div style={{ display: "block", marginRight: "auto", marginLeft: "15px", width: "40%" }}>
                                <p className="toggle-avatar-name">{props.user.name || "Unknown"}</p>
                                <p className="toggle-avatar-title">{props.user.healthStatus || "Unknown"}</p>
                            </div>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            <ListItem button key="home" onClick={() => { history.push("/profile") }}>
                                <ListItemIcon><MailIcon /></ListItemIcon>
                                <ListItemText primary={"Home"} />
                            </ListItem>
                            <ListItem button key="event" onClick={() => { history.push("/map") }}>
                                <ListItemIcon><Place /></ListItemIcon>
                                <ListItemText primary={"Map"} />
                            </ListItem>
                            <ListItem button key="venue" onClick={() => { history.push("/needsfeed") }}>
                                <ListItemIcon><ListIcon /></ListItemIcon>
                                <ListItemText primary={"Needs Feed"} />
                            </ListItem>
                            <ListItem button key="analytics" onClick={() => { history.push("/analytics") }}>
                                <ListItemIcon><AssessmentIcon /></ListItemIcon>
                                <ListItemText primary={"Analytics"} />
                            </ListItem>
                            <ListItem button key="chat" onClick={() => { history.push("/chat") }}>
                                <ListItemIcon><ChatIcon /></ListItemIcon>
                                <ListItemText primary={"Chat"} />
                            </ListItem>
                            <ListItem button key="aboutus" onClick={() => { history.push("/aboutus") }}>
                                <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
                                <ListItemText primary={"About Us"} />
                            </ListItem>
                            <Divider />
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        {/* <UserContextStore> */}
                        {(history.location.pathname !== "/" && history.location.pathname !== "/signup") && props.children}
                        {/* </UserContextStore> */}
                    </main>
                </div>
            </div>
            {(history.location.pathname === "/") && <Login />}
            {(history.location.pathname === "/signup") && <Signup />}
        </React.Fragment>
    );
}


export default Navbar;