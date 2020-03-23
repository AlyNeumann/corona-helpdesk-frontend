import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/login/login';
import Signup from './Components/login/signup';

function App() {
  return (
   <Router>
     <Switch>
       <Route path="/" exact component={Login}/>
       <Route path="/signup" component={Signup}/>
     </Switch>
   </Router>
  );
}

export default App;
