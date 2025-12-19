import React from "react";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateProject = () => {
  const [clientName, SetClientName] = useState("");
  const [projectName, SetProjectName] = useState("");
  const [budget, Setbudget] = useState(0);
  const [status, SetStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const token = localStorage.getItem("token");
  const [tokenExpire, setTokenexpire] = useState(false);

  if (tokenExpire === true) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://projecttracker-zke1.onrender.com/api/projects",
        { clientName, projectName, budget, status, dueDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Project Created",
          text: response.data.msg,
          icon: "success",
        });
        SetClientName("");
        SetProjectName("");
        SetStatus("");
        Setbudget("");
        setDueDate("");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        setTokenexpire(true);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4">Create Project</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Client Name"
                required
                className="form-control mb-3"
                onChange={(e) => SetClientName(e.target.value)}
                value={clientName}
              />

              <input
                type="text"
                placeholder="Project Name"
                required
                className="form-control mb-3"
                onChange={(e) => SetProjectName(e.target.value)}
                value={projectName}
              />

              <select
                className="form-select mb-3"
                onChange={(e) => SetStatus(e.target.value)}
                value={status}
                required
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="Planned">Planned</option>
                <option value="In_Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <input
                type="number"
                placeholder="Budget"
                required
                className="form-control mb-3"
                onChange={(e) => Setbudget(e.target.value)}
                value={budget}
              />

              <input
                type="date"
                required
                className="form-control mb-3"
                onChange={(e) => setDueDate(e.target.value)}
                value={dueDate}
              />

              <button type="submit" className="btn btn-success w-100">
                Create Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
