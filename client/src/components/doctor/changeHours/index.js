import axios from "axios";
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

const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour <= 23; hour++) {
      for (let minutes = 0; minutes <= 30; minutes += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        options.push(<option key={time} value={time}>{time}</option>);
      }
    }
    return options;
  };

const ChangeHours =() =>{
    const [doctor, setDoctor] = useState({ });

    const handleCheckboxChange = (day) => {
        const updatedWorkingHours = { ...doctor.workingHours };
        updatedWorkingHours[day].isWorking = !updatedWorkingHours[day].isWorking;
        setDoctor({ ...doctor, workingHours: updatedWorkingHours });
      };
      
      const handleTimeChange = (event, day, field) => {
        const updatedWorkingHours = { ...doctor.workingHours };
        updatedWorkingHours[day][field] = event.target.value;
        setDoctor({ ...doctor, workingHours: updatedWorkingHours });
      };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(doctor);
        try {
            const response = await axios.put("/changeHours", doctor);
            console.log(response.data.message)
        } catch (error) {
            console.log(error);
        }
        
      };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "changeHours";
                const token = localStorage.getItem("token");

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const { data: res } = await axios.get(url, config);

               setDoctor(res.doctor);
              
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    console.log(error.response.data.message);
                }
            }
        };

        fetchData();
    }, []);
    if(doctor === null){
        return(<div></div>)
    }

    return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card text-white bg-dark mb-3">
                <div className="card-header">Godziny przyjęć dr. {doctor.firstName} {doctor.lastName}</div>
                <div className="card-body">
                {doctor && doctor.workingHours ? (
                  <form onSubmit={handleSubmit} id="form" name="form">
                    <table className="table table-dark">
                      <thead>
                        <tr className="text-center">
                          <th scope="col" className="align-middle">Dzień tygodnia</th>
                          <th scope="col" className="align-middle">Godzina rozpoczęcia</th>
                          <th scope="col" className="align-middle">Godzina zakończenia</th>
                          <th scope="col" className="align-middle">Pracuje</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(doctor.workingHours).map((day, index) => (
                          <tr className="text-center" key={index}>
                            <td className="align-middle">{translationArray[day]}</td>
                            <td className="align-middle col-3">
                              {doctor.workingHours[day].isWorking ? (
                                <select
                                  className=" form-control text-white bg-dark"
                                  id={`open${index}`}
                                  name="open[]"
                                  type="text"
                                  value={doctor.workingHours[day].open}
                                  required={true}
                                  onChange={(event) => handleTimeChange(event, day, 'open')}
                                >
                                    {generateTimeOptions()}
                                    </select>
                              ) : (
                                <input
                                  className="form-control col-3 timepicker open"
                                  id={`open${index}`}
                                  name="open[]"
                                  type="hidden"
                                  value="-"
                                  required={false}
                                />
                              )}
                            </td>
                            <td className="align-middle col-3">
                              {doctor.workingHours[day].isWorking ? (
                                <select
                                  className="form-control text-white bg-dark"
                                  id={`close${index}`}
                                  name="close[]"
                                  type="text"
                                  value={doctor.workingHours[day].close}
                                  required={true}
                                  onChange={(event) => handleTimeChange(event, day, 'close')}
                                >
                                    {generateTimeOptions()}
                                    </select>
                              ) : (
                                <input
                                  className="form-control timepicker close"
                                  id={`close${index}`}
                                  name="close[]"
                                  type="hidden"
                                  value="-"
                                  required={false}
                                />
                              )}
                            </td>
                            <td className="align-middle">
                              <input
                                type="checkbox"
                                className="checkbox"
                                id={index}
                                name={`isWorking[${index}]`}
                                checked={doctor.workingHours[day].isWorking}
                                value={doctor.workingHours[day].isWorking ? 'true' : 'false'}
                                onChange={() => handleCheckboxChange(day)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-flex align-items-center justify-content-center">
                      <button type="submit" className="btn btn-secondary">Zatwierdź</button>
                    </div>
                  </form>
                ): (
                    <div>Ładowanie...</div>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
}

export default ChangeHours;