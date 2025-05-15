import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Form = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h1>Student List</h1>
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-success">
            Create +
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button className="btn btn-sm btn-info m-1">Read</button>
                  <button className="btn btn-sm btn-primary mx-2">Edit</button>
                  <button className="btn btn-sm btn-danger m-1">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Form;
