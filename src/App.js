import React, { Component } from 'react';

import HomePage from './HomePage.js'
import LogInPage from './LogInPage.js'
import NavBar from './NavBar.js'
import EditHabit from './EditHabit.js'
import Shop from './Shop.js'
import ProfileView from './ProfileView.js'
import LandingPage from './LandingPage.js'
import AddHabit from "./AddHabit.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import About from './About.js'

import { ContextProvider } from "./Context";

// firebase hooks - should make logins easier to work with
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CheckInModal from './CheckInModal.js';

export default function App() {

  return (
    <ContextProvider>
    <Router>
      <div>
     
        {/* <NavBar /> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/shop">
            <Shop />
          </Route>        
          <Route path="/profile">
            <ProfileView />
          </Route>  
          <Route path="/login">
            <LogInPage />
          </Route> 
          <Route path="/edit">
            <EditHabit />
          </Route>
          <Route path="/add">
            <AddHabit />
          </Route>    
          <Route path="/check">
            <CheckInModal />
          </Route>  
          <Route exact path="/landing">
            <LandingPage />
          </Route>
          <Route exact path="/about">
            <About />
          </Route> 
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
    </ContextProvider>
  );
}

