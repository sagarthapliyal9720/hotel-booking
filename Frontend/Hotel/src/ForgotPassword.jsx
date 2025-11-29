import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();  

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/forgot-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("OTP Sent! Check your email 📩");
        navigate("/verify", { state: { email } });
      } else {
        setMessage(data.error);
      }
    } catch (err) {
      setMessage("Something went wrong!");
    }
  }

  return (
    <div className="container mt-5">
      <h3>Forgot Password 🔐</h3>

      {message && <p className="text-info">{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Enter registered email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn btn-primary">Send OTP</button>
      </form>
    </div>
  );
}
export default ForgotPassword;
