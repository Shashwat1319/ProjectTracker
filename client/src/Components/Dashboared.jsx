import React, { useEffect } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboared = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        await axios.get(
          "https://projecttracker-zke1.onrender.com/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">

        {/* Sidebar */}
        <div className="col-12 col-md-3 col-lg-2 bg-light p-3">
          <div
            className="menu-item mb-3 fw-semibold"
            role="button"
            onClick={() => navigate("/pages/dashboard/viewproject")}
          >
            Projects
          </div>

          <div
            className="menu-item fw-semibold"
            role="button"
            onClick={() => navigate("/pages/dashboard/createproject")}
          >
            Create Project
          </div>
        </div>

        {/* Main Content */}
        <div className="col-12 col-md-9 col-lg-10 p-3 p-md-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboared;
