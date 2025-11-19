import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("https://hotel-booking-5-9w3p.onrender.com/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response:", data);

      alert("🎉 User registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  }

  return (
    <>
      <div className="container mt-5" style={{ maxWidth: "450px" }}>
        <div className="card shadow p-4">
          <h2 className="text-center mb-4">Register</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Enter Your Name</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Enter Your Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
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
                placeholder="Your password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Register;
