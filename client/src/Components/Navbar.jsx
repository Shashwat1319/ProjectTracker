import { Link, useNavigate } from "react-router-dom";
import React from "react";   

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Project Tracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {token ? (
              <button
                className="nav-link btn btn-outline-danger"
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}

            <li className="nav-item">
              {!token ? (
               <Link className="nav-link" to="/signup">
                Signup
              </Link>
            ) : ""}
            </li>
            <li className="nav-item">
              {token ? (
               <Link className="nav-link" to="/pages/dashboard">
                Dashboard
              </Link>
            ) : ""}
             
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
