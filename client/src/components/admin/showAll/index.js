import { useState, useEffect } from "react"
import axios from "axios"

const ShowAll = () => {
    const [users, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "showAll";
                const { data: res } = await axios.get(url);
                setData(res.data);
                console.log(res.data);
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


    return (
        <div class="container">


            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Imię</th>
                        <th scope="col">Nazwisko</th>

                        <th scope="col">Adres</th>
                        <th scope="col">Numer telefonu</th>
                        <th scope="col">Pesel</th>
                        <th scope="col">email</th>
                        <th scope="col">Rola</th>
                        <th scope="col">Data urodzenia</th>

                    </tr>
                </thead>
                <tbody>

                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.address}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.personalId}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td>{user.dateOfBirth}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}
export default ShowAll;