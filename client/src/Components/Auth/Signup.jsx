import React, { useState } from "react"; 
import axios from "axios";
import Swal from "sweetalert2";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="row">
      <div className="col-4"></div>
      <div className="col-6 mt-5 Signup me-4">
        <div className="card login-card p-4 bg-white">
          <div className="text-center mb-4">
            <h3 className="fw-bold">Welcome Back</h3>
            <p className="text-muted mb-0">Signup to your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <label htmlFor="email">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <label htmlFor="password">Password</label>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2">
              Signup
            </button>
          </form>
        </div>
      </div>
      <div className="col-3"></div>
    </div>
  );
};

export default Signup;
