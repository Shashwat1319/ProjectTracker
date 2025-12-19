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
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      Project Tracker
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"       // ✅ Note: "data-bs-toggle"
      data-bs-target="#navbarNav"    // ✅ Note: "data-bs-target"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        {token ? (
          <li className="nav-item">
            <button className="nav-link btn btn-outline-danger" onClick={logout}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <button className="btn btn-primary me-2" onClick={() => navigate("/login")}>
                Login
              </button>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Signup</Link>
            </li>
          </>
        )}
        {token && (
          <li className="nav-item">
            <Link className="nav-link" to="/pages/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>
    </div>
  </div>
</nav>
</>
  );
};

export default Navbar;
