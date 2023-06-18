import axios from "axios"
import { useEffect, useState } from "react";

const translationArray = {
  Monday: 'Poniedziałek',
  Tuesday: 'Wtorek',
  Wednesday: 'Środa',
  Thursday: 'Czwartek',
  Friday: 'Piątek',
  Saturday: 'Sobota',
  Sunday: 'Niedziela'
};

const ReceptionHours = () => {
  const [users, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "receptionHours";
        const { data: res } = await axios.get(url);
        setUser(res.doctors);
        console.log(res.doctors);
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
    <div>

      {users.map((user) => (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card text-white bg-dark mb-3">
                <div className="card-header ">Godziny przyjęć dr. {user.firstName} {user.lastName}</div>
                <div className="card-body">
                  <table className="table table-dark">
                    <thead>
                      <tr className="text-center">
                        <th scope="col" className="align-middle">Dzień tygodnia</th>
                        <th scope="col" className="align-middle">Godzina rozpoczęcia</th>
                        <th scope="col" className="align-middle">Godzina zakończenia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(user.workingHours).map(([key, item]) => {
                        if (item.isWorking) {
                          return (
                            <tr className="text-center" key={key}>
                              <td className="align-middle">
                                {translationArray[key]}
                              </td>
                              <td className="align-middle col-3">
                                {item.open}
                              </td>
                              <td className="align-middle col-3">
                                {item.close}
                              </td>
                            </tr>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <br></br>
        </div>

      ))}
    </div>
  );
}
export default ReceptionHours;