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


        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">

                <div className="card text-white bg-dark mb-3">
                    <form onSubmit={handleSubmit}>
                        <div className="card-header">Zarejestruj</div>
                        <div className="card-body">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control text-white bg-dark border-white"
                                placeholder="Imię"
                                name="firstName"
                                onChange={handleChange}
                                value={data.firstName}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control text-white bg-dark border-white"
                                placeholder="Nazwisko"
                                name="lastName"
                                onChange={handleChange}
                                value={data.lastName}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control text-white bg-dark border-white"
                                placeholder="Telefon"
                                name="phone"
                                onChange={handleChange}
                                value={data.phone}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control text-white bg-dark border-white"
                                placeholder="Pesel"
                                name="personalId"
                                onChange={handleChange}
                                value={data.personalId}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control text-white bg-dark border-white"
                                placeholder="Adres"
                                name="address"
                                onChange={handleChange}
                                value={data.address}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="date"
                                className="form-control text-white bg-dark border-white"
                                placeholder="Date of Birth"
                                name="dateOfBirth"
                                onChange={handleChange}
                                value={data.dateOfBirth}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control text-white bg-dark border-white"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control text-white bg-dark border-white"
                                placeholder="Hasło"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                required
                            />
                        </div>
                        {error && <div className="text-danger">{error}</div>}
                        <div className="text-center">
                            <button type="submit" className="btn btn-secondary" >
                                Zarejestruj
                            </button>
                            <br></br>

                        </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>

    )

};
export default Signup