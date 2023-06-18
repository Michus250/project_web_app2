import Signup from '../components/register';
import Login from '../components/login';
import Home from '../components/home';
import { Route, Routes } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import ShowAll from '../components/admin/showAll';
import CreateEmployee from '../components/admin/createEmployee';
import ReceptionHours from '../components/receptionHours';
import CreateVisit from '../components/users/createVisit';
import EndExamination    from '../components/doctor/endExamination'
import UserExamination from '../components/users/userExamination';
import ChangeHours from '../components/doctor/changeHours';

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
                    <Route path="/createVisit" element={<CreateVisit></CreateVisit>}></Route>
                    <Route path="/userExamination" element={<UserExamination></UserExamination>}></Route>
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
                        <Route path="/changeHours" element={<ChangeHours></ChangeHours>}></Route>
                        <Route path="/endExamination" element={<EndExamination></EndExamination>}></Route>
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