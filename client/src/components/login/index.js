import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"


const Login = () => {
    const [data, setData] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "/login"
            const { data: res } = await axios.post(url, data)
            localStorage.setItem("token", res.data)
            window.location = "/"
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
        // <div >
        //     <div >
        //         <div >
        //             <form 
        //                 onSubmit={handleSubmit}>
        //                 <h1>Login to Your Account</h1>
        //                 <input
        //                     type="email"
        //                     placeholder="Email"
        //                     name="email"
        //                     onChange={handleChange}
        //                     value={data.email}
        //                     required

        //                 /><br></br>
        //                 <input
        //                     type="password"
        //                     placeholder="Password"
        //                     name="password"
        //                     onChange={handleChange}
        //                     value={data.password}
        //                     required

        //                 /><br></br>
        //                 {error && <div
        //                   >{error}</div>}
        //                 <button type="submit"
        //                     >
        //                     Sing In
        //                 </button>
        //             </form>
        //         </div>
        //         <div >
        //             <h1>New Here ?</h1>
        //             <Link to="/register">
        //                 <button type="button"
        //                     >
        //                     Sing Up
        //                 </button>
        //             </Link>
        //         </div>
        //     </div>
        // </div>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card text-white bg-dark mb-3">
                        <form onSubmit={handleSubmit}>
                            <div className="card-header">Zaloguj</div>
                            <div className="card-body">
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
                                    <button type="submit" className="btn btn-secondary">
                                        Zaloguj
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Login;