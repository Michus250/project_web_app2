import { useState, useEffect } from "react"
import axios from "axios"
import { format } from 'date-fns';
import styled from "styled-components";


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
        <Div className="container">


            <table className="table table-dark">
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
                            <td>{user.phone}</td>
                            <td>{user.personalId}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{format(new Date(user.dateOfBirth),'dd-MM-yyyy')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Div>
    )

}
const Div = styled.div`
    margin-top: 1ex;
`
export default ShowAll;