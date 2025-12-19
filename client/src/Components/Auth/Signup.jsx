import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import  { useState } from "react"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation (minimum length only)
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 6 characters long",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://projecttracker-zke1.onrender.com/api/signup",
        { email, password }
      );

      if (response.data.success === false) {
        Swal.fire({
          title: "Signup Failed",
          text: response.data.msg,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Signup Successful",
          text: response.data.msg,
          icon: "success",
        });
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      Swal.fire({
        title: "Server Error",
        text: err.response?.data?.msg || "Something went wrong",
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
              <h3 className="fw-bold">Create Account</h3>
              <p className="text-muted mb-0">Signup to get started</p>
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

              {/* Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 py-2"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Signup"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
