import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser(){

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [age, setAge] = useState();
    const [school_id, setSchoolId] = useState(); // New state for school ID
    const [course, setCourse] = useState(); // New state for course
    const [department, setDepartment] = useState(); // New state for department

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/create', { name, email, age, school_id, course, department})
            .then(res => {
                console.log(res);
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className=" bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Add User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input
                            type="text"
                            placeholder="Enter Age"
                            className="form-control"
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">School ID</label>
                        <input
                            type="text"
                            placeholder="Enter School ID"
                            className="form-control"
                            onChange={(e) => setSchoolId(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Course</label>
                        <input
                            type="text"
                            placeholder="Enter Course"
                            className="form-control"
                            onChange={(e) => setCourse(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Department</label>
                        <input
                            type="text"
                            placeholder="Enter Department"
                            className="form-control"
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUser;