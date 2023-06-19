import axios from "axios"
import { useEffect, useState } from "react";


const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const dayPl = ["Niedziela", "Poniedziałek", "Wtorek", "Sroda", "Czwartek", "Piątek", "Sobota"];



function generateTimeSlots(date, open, close, scheduleVisits = [], id_doctor) {

  const timeSlots = [];
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;
  const datePl = date.toLocaleDateString("pl-PL");

  const startTime = new Date(`${formattedDate} ${open}`);
  const endTime = new Date(`${formattedDate} ${close}`);
  const halfHour = 30 * 60 * 1000;
  const excludedTimes = scheduleVisits
    .filter(visit => {
      let visitDate = new Date(visit.date);
      visitDate = visitDate.toLocaleDateString("pl-Pl");
      
      const visitDoctorId = visit.doctor_id;
     
      return visitDate === datePl && visitDoctorId === id_doctor;
    })
    .map(visit => {
      let visitDate = new Date(visit.date);
      const formattedTime = visitDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return formattedTime;
    });




  let currentTime = startTime;
  while (currentTime < endTime) {
    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (!excludedTimes.includes(formattedTime)) {
      timeSlots.push(new Date(currentTime));
    }

    currentTime = new Date(currentTime.getTime() + halfHour);
  }

  return timeSlots;
}








const CreateVisit = () => {

  const [users, setUser] = useState([]);
  const [doctor, setDoctor] = useState({});
  const [dates, setDates] = useState([]);
  const [blockedDates, setBlockedDates] = useState([]);

  const handleSelectChange = (event) => {
    const selectedDoctorKey = parseInt(event.target.value);
    setDoctor(users[selectedDoctorKey]);
    let timeSlotsArray = [];
    // for (let i = 1; i < 7; i++) {
    //   let currentDate = new Date();
    //   currentDate.setDate(currentDate.getDate() + i);
    //   let day = currentDate.getDay();
    //   day = days[day];

    //   let workingHoursDay = users[selectedDoctorKey].workingHours[day];

    //   if (workingHoursDay.isWorking === true) {

    //     const timeSlots = generateTimeSlots(currentDate, workingHoursDay.open, workingHoursDay.close,);

    //     timeSlotsArray.push(timeSlots);
    //   }
    // }
    // setDates(timeSlotsArray);
    for (let i = 1; i < 7; i++) {

      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);
      let day = currentDate.getDay();
      day = days[day];

      let workingHoursDay = users[selectedDoctorKey].workingHours[day];
      let timeSlots = [];

      if (workingHoursDay.isWorking === true) {
        
        timeSlots = generateTimeSlots(currentDate, workingHoursDay.open, workingHoursDay.close, blockedDates, users[selectedDoctorKey]._id);

        timeSlotsArray.push(timeSlots);
      }
    }

    setDates(timeSlotsArray);



  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "createVisit";
        const { data: res } = await axios.get(url);
        // console.log(res.doctors);
        setUser(res.doctors);
        setDoctor(res.doctors[0]);
        setBlockedDates(res.sheduleVisit);

       
        let timeSlotsArray = [];

        for (let i = 1; i < 7; i++) {

          let currentDate = new Date();
          currentDate.setDate(currentDate.getDate() + i);
          let day = currentDate.getDay();
          day = days[day];

          let workingHoursDay = res.doctors[0].workingHours[day];
          let timeSlots = [];

          if (workingHoursDay.isWorking === true) {
            
            timeSlots = generateTimeSlots(currentDate, workingHoursDay.open, workingHoursDay.close, res.sheduleVisit, res.doctors[0]._id);

            timeSlotsArray.push(timeSlots);
          }
        }

        setDates(timeSlotsArray);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedHour = event.target.hour.value;
    console.log(selectedHour);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post("createVisit", {
        doctor_id: doctor._id,
        token: token,
        date: selectedHour,
      });


      console.log(response.data);
    } catch (error) {

      console.log(error);
    }
  };





  if (users.length === 0) {
    return <div></div>;
  }



  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <select onChange={handleSelectChange} className="form-select text-white bg-dark border-dark ">
              {users.map((user, key) => (
                <option value={key}>{`dr. ${user.firstName} ${user.lastName}`}</option>
              ))}
            </select>
            <div className="card text-white bg-dark mb-3">
              <div className="card-header">{`Godziny przyjęć dr. ${doctor.firstName} ${doctor.lastName}`}</div>
              <div className="card-body">
                <table className="table table-dark">
                  <thead>
                    <tr className="text-center">
                      <th scope="col-" className="align-middle" >Data</th>
                      <th scope="col-auto" className="d-flex justify-content-start" >Godzina</th>

                    </tr>
                  </thead>

                  <tbody>
                    {dates.map((item) => (

                      <tr className="text-center" >

                        <td className="align-middle col-4">
                          {dayPl[item[0].getDay()]} {item[0].toLocaleDateString("pl-PL")}

                        </td>
                        <td className="align-middle col-4" >
                          <form className="d-flex justify-content-between" onSubmit={handleSubmit}>
                            <select className="custom-select text-white bg-dark border-dark col-4 " name="hour">
                              {item.map((hour) => (
                                <option value={hour}>{hour.toLocaleTimeString("pl-PL", {
                                  hour: "numeric",
                                  minute: "numeric",
                                })}</option>
                              ))}
                            </select>
                            <button type="submit" className="btn btn-secondary" >Umów</button>
                          </form>



                        </td>


                      </tr>

                    ))}
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );

}

export default CreateVisit;