import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Signup from './components/register';
import Login from './components/login';

import Nav from './components/nav';
import Home from './components/home';
import {Route, Routes, BrowserRouter} from 'react-router-dom';





const token = localStorage.getItem("token");
let  navList;

console.log(token);
function App() {
  if (token === null){
    navList = [['login','/login',true],['register','/register',true]];
 }
 else{
    navList = [['logout','/logout',false]];
 }
  return (
    <BrowserRouter>
      <Nav list= {navList}></Nav>
      <Routes>
        <Route path="/register" element= {<Signup></Signup>}></Route>
         
          <Route path="/login" element ={<Login></Login>} ></Route>
          <Route path="/" element = {<Home></Home>}></Route>
          <Route path="/logout" ></Route>
          {/* <Route path="*" element = {<Home></Home>}></Route> */}
          
      </Routes>

    </BrowserRouter>
  );
}

export default App;
