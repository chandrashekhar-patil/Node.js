import axios from "axios";
import React, { useState } from "react";

const Create = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/student", values)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add Student</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter the name"
              className="form-control"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="email"
              placeholder="Enter the email"
              className="form-control"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <input type="submit" className="m-1 btn btn-success" />
        </form>
      </div>
    </div>
  );
};

export default Create;
