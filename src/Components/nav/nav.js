import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles'
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
import HelpIcon from '@material-ui/icons/Help';
import { PowerSettingsNew, Place, SettingsSystemDaydreamTwoTone } from '@material-ui/icons'
import { useHistory } from 'react-router-dom';
import './nav.css'
import Login from '../login/login';
import Signup from '../login/signup';
import Cookies from 'js-cookie';
import PortraitPlaceholder from '../../Assets/images/Portrait_Placeholder.png'
import { UserContext } from '../../Components/user-context/userContext';
import { ThemeContext } from '../../Components/user-context/userContext';
import { Button } from '../../global';







function Navbar(props) {

 


    const drawerWidth = 240;
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex'
           
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            background: "#3f3f37",
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
            backgroundColor: "#ebede1"
        },
        content: {
            // color: props => {
            //         props.light ? '#fff' : '#000'
            //     },
            backgroundColor: "#ebede1",
            flexGrow: 1,
        }

    }));

    //toggle the light and dark mode

    const currentTheme = useContext(ThemeContext);
    // console.log(currentTheme[0])

    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme(currentTheme[0]);
    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    // const user = useContext(UserContext);
    // const [user, setUser] = useState("")
    const userInfo = useContext(UserContext)
    const user = userInfo[0]
    console.log('from nav')
    console.log(props)
    console.log(user)

    // console.log(user)
    const [tokenExists, setTokenExists] = useState(false)
  

   

    //TODO: are we using local storage for this?
    const handleLogout = () => {
        Cookies.remove("token")
        history.push('/')
        // setUser("")
    }
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    //for when user logs in 
    // useEffect(() => {
    //     if(user){
    //         setUserInfo(user[0])
    //     }
    // }, [user])

    //TODO: make secure by pulling cookie
    useEffect(() => {
        if (Cookies.get("token")) {
            setTokenExists(true)
            // getUser();
            console.log('getUserBeingCalled')
        }

    }, [tokenExists])


    const handleRedirect = () => {
        history.push('/')
    }
    // const getUser = () => {
    //     const token = Cookies.get('token')
    //     // const url = "/api/getUser"
    //     const url = "http://localhost:5000/getUser"

    //     //handle error messages
    //     const handleErrors = (error) => {
    //         if (error) {
    //             setErrorMessage(error)
    //         }
    //         else return error
    //     }

    //     fetch(url, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": token
    //         }
    //     })
    //         .then(res => res.json()) //response is
    //         .then(response => {
    //             if (!errorMessage) {
    //                 // console.log(response);
    //                 setUser(response);
    //             }

    //         })
    //         .then(handleErrors)
    //         .catch(error => {
    //             if (error) {
    //                 console.log(error)
    //             }
    //         })

    // }


    return (
        <React.Fragment>

            <div className={(history.location.pathname !== "/" && history.location.pathname !== "/signup") ? "" : "d-none"}>
                {user ?
                    <div className={classes.root}>
                        <CssBaseline />
                        <AppBar
                            position="fixed"
                            color="inherit"
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
                                <Typography variant="h6" className="typography-title" noWrap>
                                    {(history.location.pathname === "/profile") && "User Profile"}
                                    {(history.location.pathname === "/map") && "Map"}
                                    {(history.location.pathname === "/needsfeed") && "List of Needs"}
                                    {(history.location.pathname === "/analytics") && "Covid 19 Analytics"}
                                    {(history.location.pathname === "/chat") && "Chat"}
                                    {(history.location.pathname === "/aboutus") && "About Us"}
                                    {(history.location.pathname === "/resources") && "Resources"}
                                    {/* {(history.location.pathname === "profileview") && "Profile View"} */}

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
                                <Avatar className="profile-pic-small" alt="Remy Sharp" src={`data:image/jpeg;base64,${user.img}` || PortraitPlaceholder} style={{ marginLeft: "10px" }} />
                                <div style={{ display: "block", marginRight: "auto", marginLeft: "15px", width: "40%" }}>
                                    <p className="toggle-avatar-name">{user.name || "Unknown"}</p>
                                    <p className="toggle-avatar-title"></p>
                                </div>
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                </IconButton>
                            </div>
                            <Divider />
                            <List>
                                <ListItem button key="home" onClick={() => { history.push("/profile") }}>
                                    <ListItemIcon><MailIcon className="iconclass" /></ListItemIcon>
                                    <ListItemText className="list-text" primary={"Home"} />
                                </ListItem>
                                <ListItem button key="event" onClick={() => { history.push("/map") }}>
                                    <ListItemIcon><Place className="iconclass" /></ListItemIcon>
                                    <ListItemText primary={"Map"} />
                                </ListItem>
                                <ListItem button key="needsfeed" onClick={() => { history.push("/needsfeed") }}>
                                    <ListItemIcon><ListIcon className="iconclass" /></ListItemIcon>
                                    <ListItemText primary={"Needs Feed"} />
                                </ListItem>
                                <ListItem button key="analytics" onClick={() => { history.push("/analytics") }}>
                                    <ListItemIcon><AssessmentIcon className="iconclass" /></ListItemIcon>
                                    <ListItemText primary={"Analytics"} />
                                </ListItem>
                                <ListItem button key="chat" onClick={() => { history.push("/chat") }}>
                                    <ListItemIcon><ChatIcon className="iconclass" /></ListItemIcon>
                                    <ListItemText primary={"Chat"} />
                                </ListItem>
                                <ListItem button key="aboutus" onClick={() => { history.push("/aboutus") }}>
                                    <ListItemIcon><SupervisorAccountIcon className="iconclass" /></ListItemIcon>
                                    <ListItemText primary={"About Us"} />
                                </ListItem>
                                <ListItem button key="resources" onClick={() => { history.push("/resources") }}>
                                    <ListItemIcon><HelpIcon className="iconclass" /></ListItemIcon>
                                    <ListItemText primary={"Resources"} />
                                </ListItem>

                                <Divider />
                            </List>
                        </Drawer>
                        <ThemeProvider theme={theme}>
                            <main className={classes.content}>

                                <div className={classes.toolbar} />
                                {(history.location.pathname !== "/" || history.location.pathname !== "/signup") && props.children}


                          </main>
                        </ThemeProvider>
                    </div> :  <Button className="fancy-btn-text" onClick={handleRedirect}>Please Login to view content</Button> 
                    // :
                    // <p>Loading...If this doesn't stop after like 5 seconds, please refresh the page! It happens sometimes...:)</p>
                }

            </div>
            {(history.location.pathname === "/") && <Login />}
            {(history.location.pathname === "/signup") && <Signup />}

        </React.Fragment>
    );
}


export default Navbar;