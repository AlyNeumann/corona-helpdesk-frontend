import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Login from './Components/login/login';
// import Signup from './Components/login/signup';
import Navbar from './Components/nav/nav';
import Map from './Components/map/map';
import Profile from './Components/profile/profile';
import NeedsFeed from './Components/needsfeed/needsfeed';
import Analytics from './Components/analytics/analytics';

function App() {
  return (
   <Router>
     <Navbar>
     <Switch>
       {/* <Route path="/" exact component={Login}/>
       <Route path="/signup" component={Signup}/> */}
       <Route path="/map" exact component={Map}/>
       <Route path="/profile" component={Profile}/>
       <Route path="/needsfeed" component={NeedsFeed}/>
       <Route path="/analytics" component={Analytics}/>
     </Switch>
     </Navbar>
   </Router>
  );
}

export default App;
