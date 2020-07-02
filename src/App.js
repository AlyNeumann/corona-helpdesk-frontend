import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import Navbar from './Components/nav/nav';
import Map from './Components/map/map';
import ProfileHome from './Components/profile-home/profileHome';
import ProfileUpdate from './Components/profile/profile-update';
import UpdateNeeds from './Components/needs-todo/updateNeeds';
import AddNeeds from './Components/needs-todo/addNeed';
import NeedsFeed from './Components/needsfeed/needsfeed';
import Analytics from './Components/analytics/analytics';
import Chat from './Components/chat/chat';
import AboutUs from './Components/about-us/aboutUs';
import Resources from './Components/resources/resources';
import ProfileView from './Components/profile-view/profileView';
import UserContextStore, { UserContext,NeedsContext } from './Components/user-context/userContext';
// import Cookies from 'js-cookie';
// import { ThemeContext } from './Components/user-context/userContext';


// import { lightTheme, darkTheme } from '../../theme';


function App() {
  //setting global context for user
  // const [user, setUser] = useContext(UserContext);

  // //setting global context for user needs
  // const [needs, setNeeds] = useContext(NeedsContext);

  // //handle errors
  // const [errorMessage, setErrorMessage] = useState(null)

  // console.log('from app.js')
  // console.log(user, needs)

    // const getUserAndNeeds = () => {
    //     const token = Cookies.get('token')
    //     const url = "http://localhost:5000/getUser"
    //     // const url = "http://localhost:5000/getUser"

    //     //handle error messages
    //     const handleErrors = (error) => {
    //         if (error) {
    //           // console.log(error)
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
    //                 setNeeds(response.neededList);
    //             }

    //         })
    //         .then(handleErrors)
    //         .catch(error => {
    //             if (error) {
    //                 console.log(error)
    //             }
    //         })

    // }

    //fetch User's needs
  //   useEffect(() => {
  //     if (Cookies.get("token")) {
  //       // setTokenExists(true)
  //       getUserAndNeeds();
  //       console.log('getUserBeingCalled')
  //   }
     
  // }, [])

  return (
    <Router>
      <UserContextStore>
        <Navbar>
          <Switch>
            <Route path="/map" exact component={Map} />
            <Route path="/profile" component={ProfileHome} />
            <Route path="/profileupdate" component={ProfileUpdate} />
            <Route path="/updateneeds" component={UpdateNeeds} />
            <Route path="/addneeds" component={AddNeeds} />
            <Route path="/needsfeed" component={NeedsFeed} />
            <Route path="/analytics" component={Analytics} />
            <Route path="/chat" component={Chat} />
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/resources" component={Resources} />
            <Route path="/profileview" component={ProfileView} />
          </Switch>
        </Navbar>
      </UserContextStore>
    </Router>
  );
}

export default App;
