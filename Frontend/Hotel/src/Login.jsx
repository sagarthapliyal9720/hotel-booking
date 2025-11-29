import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./footer";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://hotel-booking-5-9w3p.onrender.com/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.access);
        localStorage.setItem("access_token", data.access);
        alert("✅ Login successful!");
        navigate("/");
      } else {
        setError(data.detail || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  }

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center mt-5 mb-3">
        <div className="card shadow p-4" style={{ width: "400px" }}>
          <h3 className="text-center mb-3">Login</h3>

          {error && <p className="text-danger text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>

          <div className="text-center mt-3">
            <Link to="/forgot" className="text-primary">
              Forgot Password?
            </Link>
          </div>

          {token && (
            <div className="alert alert-success mt-3">
              <strong>Access Token:</strong> {token}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
