import { useState } from "react"
import axios from "axios"

import { Link, useNavigate } from "react-router-dom"

const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "user",
        phone: "",
        personalId: "",
        address: "",
        dateOfBirth: ""

    })
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "register"
            const { data: res } = await axios.post(url, data)
            navigate("/")
            console.log(res.message)
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }
    return (
        <div >
            <div >
                <div >
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button"
                            >
                            Sing in
                        </button>
                    </Link>
                </div>
                <div ></div>
                <form 
                    onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={handleChange}
                        value={data.firstName}
                        required
                        
                    /><br></br>
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={handleChange}
                        value={data.lastName}
                        required
                        
                    /><br></br>
                    <input
                        type="text"
                        placeholder="phone"
                        name="phone"
                        onChange={handleChange}
                        value={data.phone}
                        required
                        
                    /><br></br>
                    <input
                        type="text"
                        placeholder="personalId"
                        name="personalId"
                        onChange={handleChange}
                        value={data.personalId}
                        required
                        
                    /><br></br>
                     <input
                        type="text"
                        placeholder="address"
                        name="address"
                        onChange={handleChange}
                        value={data.address}
                        required
                        
                    /><br></br>
                    <input
                        type="date"
                        placeholder="dateOfBirth"
                        name="dateOfBirth"
                        onChange={handleChange}
                        value={data.dateOfBirth}
                        required
                        
                    /><br></br>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={data.email}
                        required
                        
                    /><br></br>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={data.password}
                        required
                        
                    /><br></br>
                    
                    {error && <div
                       >{error}</div>}
                    <button type="submit"
                        >
                        Sing Up
                    </button>
                </form>
            </div>
        </div>
    )
    
};
export default Signup