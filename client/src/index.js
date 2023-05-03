import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Form from './components/form'
import Nav from './components/nav';
import Home from './components/home';
import {Route, Routes, BrowserRouter} from 'react-router-dom';


import reportWebVitals from './reportWebVitals';

const navList = [['login','/login',true],['register','/register',true]];
const registerList = [['email','email'],['password','password']];
const loginList = [['email','email'],['password','password']];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Nav list= {navList}></Nav>
      <Routes>
          <Route path="/register" element = {<Form list ={registerList} submitName="Register" path="/register" ></Form>}></Route>
          <Route path="/login" element = {<Form list ={loginList} submitName="Login" path ="/login" ></Form>}></Route>
          <Route path="/" element = {<Home></Home>}></Route>
          {/* <Route path="*" element = {<Form list ={loginList} submitName="Login"></Form>}></Route> */}
      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
