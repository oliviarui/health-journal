import './App.css'; // styling
import React, { Component, useState } from 'react';
// import { useEffect, useState } from 'react'
// import {Route, Router, Link} from 'react-router-dom';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Home from './Home';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Logout from './Logout';
import JournalApp from './JournalApp';
import Error from './Error';


class App extends Component {
  // initializes the default state of App

  initialState = {
    user: ''
  }
  state = this.initialState


  render () {
    return (
      <Router>
        <div className="App">
          
          {/* get information from state and display on page */}
          {/* <p>{this.state.user}</p> */}
          <Routes>
            <Route path='/' element={<Home user={sessionStorage.getItem("user")}/>}  />
            <Route path='/new' element={<JournalApp />}  />
            <Route path='/login' element={<LoginForm handleSubmit={this.login}/>} />
            <Route path='/register' element={<RegisterForm handleSubmit={this.registerUser}/>} />
            <Route path = '*' element = {<Error />}/>
          </Routes>
          

        </div>
      </Router>
    );
  }
  

  login = (input) => {
    // DEBUG
    console.log('trying to log in user...')
    console.log(input)
    // communicate with server
    fetch('/login', {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'mode':'cors'
      },
      body: JSON.stringify(input)
    })
    .then((response) => response.json())
    .then((result) => {
      // DEBUG
      console.log('login status:')
      console.log(result)
      if(result.success===false){
        document.getElementById("error-login").innerHTML="Incorrect username or password";
      }
      // update the state of the app
      sessionStorage.setItem("user", result.user);
      console.log(sessionStorage.getItem('user'));
    })
  }

  logout = () => {
    // update state of app to log the user out
    this.setState({user:""})
  }
}

export default App;
