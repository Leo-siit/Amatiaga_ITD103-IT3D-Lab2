import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser(){
    const { id } = useParams()

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const [school_id, setSchoolId] = useState(); // New state for school ID
    const [course, setCourse] = useState(); // New state for course
    const [department, setDepartment] = useState(); // New state for department

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await axios.get("http://localhost:3001/get/" + id);
                console.log(response);
                setName(response.data.name)
                setEmail(response.data.email)
                setAge(response.data.age)
                setSchoolId(response.data.school_id);
                setCourse(response.data.course);
                setDepartment(response.data.department);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3001/update/' + id, { name, email, age, school_id, course, department})
            .then(res => {
                console.log(res);
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleUpdate}>
                    <h2>Update User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input
                            type="text"
                            placeholder="Enter Age"
                            className="form-control"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">School ID</label>
                        <input
                            type="text"
                            placeholder="Enter School ID"
                            className="form-control"
                            value={school_id}
                            onChange={(e) => setSchoolId(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Course</label>
                        <input
                            type="text"
                            placeholder="Enter Course"
                            className="form-control"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Department</label>
                        <input
                            type="text"
                            placeholder="Enter Department"
                            className="form-control"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser;