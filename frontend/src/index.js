import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Home from './Home';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Logout from './Logout';
import JournalApp from './JournalApp';
import Error from './Error';
import History from './History'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      {/* <Route index element={<App />} /> */}
      <Route path = "login" element={<LoginForm />} />
      <Route path = "logout" element = {<Logout />} />
      <Route path='/' element={<Home user={sessionStorage.getItem("user")}/>}  />
      <Route path='/new' element={<JournalApp />}  />
      <Route path='/register' element={<RegisterForm />} />
      <Route path = '/history' element = {<History />} />
      <Route path = '*' element = {<Error />}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
