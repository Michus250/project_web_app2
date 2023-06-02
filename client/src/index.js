import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

import Signup from './components/register';
import Login from './components/login';


import Nav from './components/nav';
import Home from './components/home';
import {Route, Routes, BrowserRouter, Navigate} from 'react-router-dom';


import reportWebVitals from './reportWebVitals';

const navList = [['login','/login',true],['register','/register',true]];




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <Nav list= {navList}></Nav>
      <Routes>
        <Route path="/register" element= {<Signup></Signup>}></Route>
         
          <Route path="/login" element ={<Login></Login>} ></Route>
          <Route path="/" element = {<Home></Home>}></Route>
          <Route path="*" element = {<Home></Home>}></Route>
          
      </Routes>

    </BrowserRouter> */}
    <App></App>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
