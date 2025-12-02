import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BASE_URL from "./api";
function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  if (!email) navigate("/forgot");

  async function handleReset(e) {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${BASE_URL}/reset-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, new_password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password changed successfully 🎉 Now login!");
        navigate("/login");
      } else {
        setMessage(data.error);
      }
    } catch {
      setMessage("Something went wrong");
    }
  }

  return (
    <div className="container mt-5">
      <h3>Reset Password 🔁</h3>

      {message && <p className="text-success">{message}</p>}

      <form onSubmit={handleReset}>
        <label>New Password</label>
        <input
          type="password"
          className="form-control mb-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-success">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
