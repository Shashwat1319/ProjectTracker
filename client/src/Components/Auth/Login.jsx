import React from "react";   // 🔴 THIS IS REQUIRED
import axios from "axios";

import { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://projecttracker-zke1.onrender.com/api/login", {
        email,
        password,
      });
      console.log(response.data);
      if (response.status === 200) {
        Swal.fire({
          title: "Login Success",
          text: response.data.msg,
          icon: "success",
        });
        localStorage.setItem("token", response.data.token);
        navigate("/pages/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        Swal.fire({
          title: "Login Failed",
          text: err.response.data.msg,
          icon: "error",
        });
      } else{
        Swal.fire({
          title: "Server Error",
          text: "Server is not Responsing",
          icon: "error",
        });
      }
    }
  };

  return (
    <>

      <div className="row">
        <div className="col-4"></div>
        <div className="col-6 mt-5 login me-4">
            <div className="card login-card p-4 bg-white">
              <div className="text-center mb-4">
                <h3 className="fw-bold">Welcome Back</h3>
                <p className="text-muted mb-0">Login to your account</p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* <!-- Email --> */}
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <label>Email address</label>
                </div>

                {/* <!-- Password --> */}
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    required
                  />
                  <label>Password</label>
                </div>

                {/* <!-- Remember + Forgot -->
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember"
                    />
                    <label className="form-check-label" for="remember">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-decoration-none">
                    Forgot password?
                  </a>
                </div> */}

                {/* <!-- Button  */}
                <button type="submit" className="btn btn-primary w-100 py-2">
                  Login
                </button>
              </form>

              <div className="text-center mt-3">
                <span className="text-muted">Don’t have an account?</span>
                <Link to="/signup" className="text-decoration-none fw-semibold">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3"></div>
    </>
  );
};

export default Login;
