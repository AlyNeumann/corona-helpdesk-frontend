import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom';
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
import UserContextStore, { UserContext } from './Components/user-context/userContext';


function App() {

  //global state of User
  //pass to nav for userinfo
  const user = useContext(UserContext);
  console.log(user)


  return (
    <Router>
      <UserContextStore>
        <Navbar user={user}>
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
