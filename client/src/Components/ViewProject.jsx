import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewProject = () => {
  const [allProject, setAllProject] = useState([]);
  const [search, setSearch] = useState("");
  const [StatusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          "https://projecttracker-zke1.onrender.com/api/projects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllProject(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchdata();
  }, []);

  const filteredProjects = allProject.filter((item) => {
    const matchedProject =
      item.Client.toLowerCase().includes(search.toLowerCase()) ||
      item.Project.toLowerCase().includes(search.toLowerCase());

    const matchedStatus =
      StatusFilter === "All" || item.Status === StatusFilter;

    return matchedProject && matchedStatus;
  });

  return (
    <>
      {/* 🔹 Search + Filter */}
      <div className="row g-2 w-100 px-2 px-md-0 mx-auto mt-2">
        <div className="col-12 col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Client or Project"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <select
            className="form-select"
            value={StatusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Planned">Planned</option>
            <option value="In_Progress">In Progress</option>
          </select>
        </div>
      </div>

      {/* 🔹 Responsive Table */}
      <div className="table-responsive px-2 mt-3">
        <table className="table table-bordered w-100">
          <thead>
            <tr className="text-center">
              <th>S.No</th>
              <th>Client</th>
              <th>Project</th>
              <th>Status</th>
              <th className="d-none d-md-table-cell">Budget</th>
              <th className="d-none d-md-table-cell">Due Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.Client}</td>
                  <td>{item.Project}</td>
                  <td
                    className={
                      item.Status === "Completed"
                        ? "text-success"
                        : item.Status === "Planned"
                        ? "text-secondary"
                        : "text-primary"
                    }
                  >
                    {item.Status}
                  </td>
                  <td className="d-none d-md-table-cell">{item.Budget}</td>
                  <td className="d-none d-md-table-cell">{item.DueDate}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm w-100"
                      onClick={() =>
                        navigate(
                          `/pages/dashboard/projectdetails/${item._id}`,
                          { state: item }
                        )
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center fst-italic">
                  <h5>No Projects Found</h5>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewProject;
