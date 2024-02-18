import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function Users() {
    const { id } = useParams()

    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState(''); // Define searchTerm state
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false); // Define loading state
    const [error, setError] = useState(null); // Define error state

    const fetchData = useCallback(() => {
        setLoading(true);
        axios.get('http://localhost:3001/')
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSearch = useCallback(() => {
        if (!searchTerm) {
            fetchData();
            return;
        }
        setLoading(true);
        axios.get(`http://localhost:3001/search/${searchTerm}`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [searchTerm, fetchData]);

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteuser/' + id)
            .then(res => {
                fetchData();
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
            <div className="container mt-5 p-6">
                <h1 className="text-center mb-4">Student Management System</h1>
                <div className="row justify-content-center">
                    <div className="col">
                        <div className="text-center mb-3">
                            <Link to="/create" className="btn btn-dark btn-lg">Add User</Link>
                        </div>
                        <div className="input-group mb-3">
                            <input 
                                type="text" 
                                className="form-control " 
                                placeholder="Search by name..." 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-dark m-1" onClick={handleSearch}>Search</button>
                        </div>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error.message}</p>}
                        <table className="table table-striped table-hover border">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Age</th>
                                    <th>School-ID</th>
                                    <th>Course</th>
                                    <th>Department</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.age}</td>
                                        <td>{user.school_id}</td>
                                        <td>{user.course}</td>
                                        <td>{user.department}</td>
                                        <td>
                                            <Link to={`/edit/${user._id}`} className="btn btn-sm btn-success">Update</Link>
                                            <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger m-1">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    );
}

export default Users;
