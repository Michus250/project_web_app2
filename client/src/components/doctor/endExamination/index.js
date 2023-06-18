import axios from "axios";
import { useEffect, useState } from "react";

const EndExamination = () => {
    const [visits, setVisits] = useState([]);
    const [examinations, setExaminations] = useState([]);
    
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        examinations: [],
        visitId: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setFormData({ ...formData, examinations: [...formData.examinations, value] });
        } else {
            const updatedExaminations = formData.examinations.filter(
                (examination) => examination !== value
            );
            setFormData({ ...formData, examinations: updatedExaminations });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            
            
            
            const updatedFormData = { ...formData, visitId: event.target.visitId.value };
           
            const response = await axios.post("/endExamination", updatedFormData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "endExamination";
                const token = localStorage.getItem("token");

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const { data: res } = await axios.get(url, config);

                setVisits(res.visits);
                setExaminations(res.examinations);
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    console.log(error.response.data.message);
                }
            }
        };

        fetchData();
    }, []);

    if (visits.length === 0) {
        return <h2>Brak wizyt</h2>;
    }

    return (
        <div>
            {visits.map((visit, i) => (
                <div className="container" key={i}>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card text-white bg-dark mb-3">
                                <div className="card-header">
                                    {visit.user_id.firstName} {visit.user_id.lastName}{" "}
                                    {new Date(visit.date).toLocaleDateString("pl-PL")}{" "}
                                    {new Date(visit.date).toLocaleTimeString("pl-PL", {
                                        hour: "numeric",
                                        minute: "numeric",
                                    })}
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit} name={visit._id}>
                                        <div className="row mb-3">
                                            <label htmlFor="nameExamination" className="col-md-4 col-form-label text-md-end">
                                                Nazwa
                                            </label>
                                            <div className="col-md-6">
                                                <input
                                                    id="nameExamination"
                                                    type="text"
                                                    className="form-control text-white bg-dark"
                                                    name="name"
                                                    // value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    autoFocus
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="description" className="col-md-4 col-form-label text-md-end">
                                                Opis
                                            </label>
                                            <div className="col-md-6">
                                                <input
                                                    id="description"
                                                    type="text"
                                                    className="form-control text-white bg-dark"
                                                    name="description"
                                                    // value={formData.description}
                                                    onChange={handleInputChange}
                                                    required
                                                    autoFocus
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="examinations" className="col-md-4 col-form-label text-md-end">
                                                Badania
                                            </label>
                                            <div className="col-md-6">
                                                {examinations.map((item) => (
                                                    <div key={item.id}>
                                                        <input
                                                            id={item.id}
                                                            value={item._id}
                                                            type="checkbox"
                                                            name={`examinations[]`}
                                                            onChange={handleCheckboxChange}
                                                            // checked={formData.examinations.includes(item._id)}
                                                        />
                                                        {item.name}
                                                        <br />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <input type="hidden" name="visitId" value={visit._id} data-visitid={visit._id} />


                                        <input type="submit" className="btn btn-secondary my-1 mx-1" value="Zatwierdź" />
                                   
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            ))}
        </div>
    );
};

export default EndExamination;

