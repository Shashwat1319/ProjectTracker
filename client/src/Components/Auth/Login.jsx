import React  from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://projecttracker-zke1.onrender.com/api/login",
        { email, password }
      );

      if (response.data.success) {
        Swal.fire({
          title: "Login Success",
          text: response.data.msg,
          icon: "success",
        });
        localStorage.setItem("token", response.data.token);
        navigate("/pages/dashboard");
      } else {
        Swal.fire({
          title: "Login Failed",
          text: response.data.msg,
          icon: "error",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Server Error",
        text: err.response?.data?.msg || "Server is not responding",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card shadow-sm p-4">
            <div className="text-center mb-4">
              <h3 className="fw-bold">Welcome Back</h3>
              <p className="text-muted mb-0">Login to your account</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="email">Email address</label>
              </div>

              {/* Password */}
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 py-2"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="text-center mt-3">
              <span className="text-muted">Don’t have an account?</span>{" "}
              <Link to="/signup" className="text-decoration-none fw-semibold">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
