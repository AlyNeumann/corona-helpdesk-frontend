import React, { useState, useEffect } from 'react';
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
import { PowerSettingsNew, StoreMallDirectory, Place, LocalActivity, LocalHospital } from '@material-ui/icons'
import { useHistory } from 'react-router-dom';
import './nav.css'
import Login from '../login/login';
import Signup from '../login/signup';

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
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({});

    //TODO: are we using local storage for this?
    const handleLogout = () => {
        localStorage.removeItem('jwt')
        localStorage.removeItem('cached_token')
        setUser("")
        history.push('/')
    }
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    //TODO:fecthe user photo and such if they are logged in
    //   useEffect(()=>{
    //       if(localStorage.getItem('jwt') && localStorage.getItem('cached_token')){
    //         let token = "Bearer " + localStorage.getItem('jwt').substring(1,localStorage.getItem('jwt').length - 1);
    //         let id = localStorage.getItem('cached_token').substring(1,localStorage.getItem('cached_token').length - 1);
    //         fetch(`https://api.lono.app/api/account/data/${id}`,{
    //           method:'GET',
    //           headers:{
    //               'Authorization': token
    //           }
    //       }).then(res => {res.json().then(result => setUser(result))})
    //       }else{
    //           console.log('No Data')
    //       }
    //   },[localStorage.getItem('jwt')])


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
                            <Avatar alt="Remy Sharp" src={user.photoUrl || "https://pngimage.net/wp-content/uploads/2018/05/avatar-images-png-9.png"} style={{ marginLeft: "10px" }} />
                            <div style={{ display: "block", marginRight: "auto", marginLeft: "15px", width: "40%" }}>
                                <p className="toggle-avatar-name">{user.name || "Unknown"}</p>
                                <p className="toggle-avatar-title">{user.position || "Unemployed"}</p>
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
                            <Divider />
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        {(history.location.pathname !== "/" && history.location.pathname !== "/signup") && props.children}
                    </main>
                </div>
            </div>
            {(history.location.pathname === "/") && <Login />}
            {(history.location.pathname === "/signup") && <Signup />}
        </React.Fragment>
    );
}


export default Navbar;