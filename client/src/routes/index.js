import Signup from '../components/register';
import Login from '../components/login';
import Home from '../components/home';
import { Route, Routes } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import ShowAll from '../components/admin/showAll';
import CreateEmployee from '../components/admin/createEmployee';
import ReceptionHours from '../components/receptionHours';

const UserRoutes = () => {
    const token = localStorage.getItem("token");

    let role;
    let decodedToken;
    if (token === null) {

        role = "null";
    }
    else {

        decodedToken = jwt_decode(token);
        role = decodedToken.role;
    }
    return (
        <div>
            {role === 'user' ? (
                <Routes>
                    <Route path="/logout" ></Route>
                    <Route path="/receptionHours" element={<ReceptionHours></ReceptionHours>}></Route>
                    <Route path="/contact" element={<h2>contact</h2>}></Route>
                    <Route path="/createVisit" element={<h2>createVisit</h2>}></Route>
                    <Route path="/userExamination" element={<h2>userExamination</h2>}></Route>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="*" element={<h2>Alee</h2>}></Route>

                </Routes>
            ) : role === 'admin' ? (
                <Routes>
                    <Route path="/logout" ></Route>
                    <Route path="/receptionHours" element={<ReceptionHours></ReceptionHours>}></Route>
                    <Route path="/contact" element={<h2>contact</h2>}></Route>
                    <Route path="/createEmployee" element={<CreateEmployee></CreateEmployee>}></Route>
                    <Route path="/showAll" element={<ShowAll></ShowAll>}></Route>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="*" element={<h2>Alee</h2>}></Route>

                </Routes>
            ): role === 'employee' ? (
                <Routes>
                    <Route path="/logout" ></Route>
                    <Route path="/receptionHours" element={<ReceptionHours></ReceptionHours>}></Route>
                    <Route path="/contact" element={<h2>contact</h2>}></Route>
                    <Route path="/createExamination" element={<h2>createExamination</h2>}></Route>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="*" element={<h2>Alee</h2>}></Route>

                </Routes> )
                : role === 'doctor' ? (
                    <Routes>
                        <Route path="/logout" ></Route>
                        <Route path="/receptionHours" element={<ReceptionHours></ReceptionHours>}></Route>
                        <Route path="/contact" element={<h2>contact</h2>}></Route>
                        <Route path="/changeHours" element={<h2>changeHours</h2>}></Route>
                        <Route path="/endExamination" element={<h2>endExamination</h2>}></Route>
                        <Route path="/" element={<Home></Home>}></Route>
                        <Route path="*" element={<h2>Alee</h2>}></Route>
    
                    </Routes> )
                : (
                    <Routes>
                        <Route path="/receptionHours" element={<ReceptionHours></ReceptionHours>}></Route>
                        <Route path="/contact" element={<h2>contact</h2>}></Route>
                        <Route path="/register" element={<Signup></Signup>}></Route>
                        <Route path="/login" element={<Login></Login>} ></Route>
                        <Route path="/" element={<Home></Home>}></Route>
                        <Route path="*" element={<h2>Alee</h2>}></Route>

                    </Routes>)}
        </div>
    )
}
export default UserRoutes;