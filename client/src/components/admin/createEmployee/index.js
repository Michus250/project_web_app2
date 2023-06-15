import { useState, useEffect } from "react"
import axios from "axios"

const CreateEmployee = () => {
    const [users, setUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "createEmployee";
                const { data: res } = await axios.get(url);
                setUser(res.data);
                
            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    console.log(error.response.data.message);
                }
            }
        };
        

        fetchData();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const url = '/createEmployee';
          const data = {
            userId: selectedUser,
            role: e.target.role.value,
          };
          console.log(data);
          await axios.put(url, data);
          
          window.location = "/createEmployee";
    
          
        } catch (error) {
          console.error(error);
        }
      };
    return (
        <div className="container">
            {users.map((user) => (
                user.role === 'user' && (
                    <div className="row justify-content-center" key={user.id}>
                        <div className="col-md-8">
                            <div className="row mb-3">
                                <label className="col-md-4 col-form-label text-md-end">
                                    {`${user.firstName} ${user.lastName} ${user.email}`}
                                </label>
                                <div className="col-md-6">
                                    <form onSubmit={handleSubmit}>
                                    <select
                                        name="role"
                                        id="role"
                                    >
                                        {['employee','doctor','admin'].map((item) => (
                                            item !== 'user' && (
                                                <option value={item} key={item}>{item}</option>
                                            )
                                        ))}
                                    </select>
                                    <button
                                        type="submit"
                                        className="btn btn-secondary"
                                        id={user.id}
                                        name="changeButton"
                                        value={user.id}
                                        data-id={user.id}
                                        onClick={() => setSelectedUser(user._id)}
                                    >
                                        Stwórz pracownika
                                    </button>
                                    
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}



export default CreateEmployee;