import axios from "axios";
import { useEffect, useState } from "react";


const UserExamination = () => {
    const [visits, setVisits] = useState([]);
    const [historyVisits, setHistoryVisits] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "userExamination";
                const token = localStorage.getItem("token");

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const { data: res } = await axios.get(url, config);
                setVisits(res.visits);
                setHistoryVisits(res.historyVisits);
                console.log(res.visits);
                console.log(res.historyVisits);


            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    console.log(error.response.data.message);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">

                        {visits.map((visit) => (

                            <div className="card text-white bg-dark mb-3">
                                <div className="card-header ">Umówione wizyty</div>
                                <div className="card-body">
                                    <table className="table table-dark">
                                        <thead>
                                            <tr className="text-center">
                                                <th scope="col" className="align-middle">Doktor
                                                </th>
                                                
                                                <th scope="col" className="align-middle">Data</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr className="text-center" >
                                                <td className="align-middle">
                                                    dr. {visit.doctor_id.firstName} {visit.doctor_id.lastName}
                                                </td>
                                                <td className="align-middle">
                                                    {new Date(visit.date).toLocaleDateString("pl-PL")}{" "} {new Date(visit.date).toLocaleTimeString("pl-PL", {
                                                        hour: "numeric",
                                                        minute: "numeric",
                                                    })}
                                                </td>
                                                
                                            </tr>

                                        </tbody>
                                    </table>

                                </div>
                            </div>


                        ))}
                        <br></br>
                        {historyVisits.map((visit) => (

                            <div className="card text-white bg-dark mb-3">
                                <div className="card-header ">Historia wizyt</div>
                                <div className="card-body">
                                    <table className="table table-dark">
                                        <thead>
                                            <tr className="text-center">
                                                <th scope="col" className="align-middle">Doktor
                                                </th>
                                                <th scope="col" className="align-middle col-1">Data </th>
                                                <th scope="col" className="align-middle">Nazwa</th>
                                                <th scope="col" className="align-middle">Opis</th>
                                                <th scope="col" className="align-middle">Cena</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr className="text-center" >
                                                <td className="align-middle">
                                                    dr. {visit.doctor_id.firstName} {visit.doctor_id.lastName}
                                                </td>
                                                <td className="align-middle col-1">
                                                    {new Date(visit.date).toLocaleDateString("pl-PL")}{" "} {new Date(visit.date).toLocaleTimeString("pl-PL", {
                                                        hour: "numeric",
                                                        minute: "numeric",
                                                    })}
                                                </td>
                                                <td className="align-middle ">
                                                    {visit.name}
                                                </td>
                                                <td className="align-middle ">
                                                    {visit.description}
                                                </td>
                                                <td className="align-middle ">
                                                {parseFloat(visit.price['$numberDecimal'].toString()).toFixed(2)}

                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>

                                </div>
                            </div>


                        ))}

                    </div>
                </div>
                <br></br>
            </div>
        </div>
    )
}

export default UserExamination;