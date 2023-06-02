import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Signup from './components/register';
import Login from './components/login';

import Nav from './components/nav';
import Home from './components/home';
import {Route, Routes, BrowserRouter, Navigate} from 'react-router-dom';




const navList = [['login','/login',true],['register','/register',true]];

function App() {
  return (
    <BrowserRouter>
      <Nav list= {navList}></Nav>
      <Routes>
        <Route path="/register" element= {<Signup></Signup>}></Route>
         
          <Route path="/login" element ={<Login></Login>} ></Route>
          <Route path="/" element = {<Home></Home>}></Route>
          <Route path="*" element = {<Home></Home>}></Route>
          
      </Routes>

    </BrowserRouter>
  );
}

export default App;
