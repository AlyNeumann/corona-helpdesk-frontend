import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/nav/nav';
import Map from './Components/map/map';
import Profile from './Components/profile/profile';
import ProfileUpdate from './Components/profile/profile-update';
import NeedsFeed from './Components/needsfeed/needsfeed';
import Analytics from './Components/analytics/analytics';
import Chat from './Components/chat/chat';


function App() {
  return (
   <Router>
     <Navbar>
     <Switch>
       {/* <Route path="/" exact component={Login}/>
       <Route path="/signup" component={Signup}/> */}
       <Route path="/map" exact component={Map}/>
       <Route path="/profile" component={Profile}/>
       <Route path="/profileupdate" component={ProfileUpdate}/>
       <Route path="/needsfeed" component={NeedsFeed}/>
       <Route path="/analytics" component={Analytics}/>
       <Route path="/chat" component={Chat}/>
     </Switch>
     </Navbar>
   </Router>
  );
}

export default App;
