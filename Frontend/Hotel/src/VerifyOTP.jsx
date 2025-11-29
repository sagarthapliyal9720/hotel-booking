import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  if (!email) navigate("/forgot");  // safety 🔐

  async function handleVerify(e) {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("https://hotel-booking-5-9w3p.onrender.com/verify-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("OTP Verified ✔️ Now reset password");
        navigate("/reset", { state: { email } });
      } else {
        setMessage(data.error);
      }
    } catch {
      setMessage("Something went wrong");
    }
  }

  return (
    <div className="container mt-5">
      <h3>Verify OTP 🔑</h3>
      {message && <p className="text-info">{message}</p>}

      <form onSubmit={handleVerify}>
        <label>OTP</label>
        <input
          className="form-control mb-2"
          type="number"
          onChange={(e) => setOtp(e.target.value)}
        />

        <button className="btn btn-warning">Verify OTP</button>
      </form>
    </div>
  );
}

export default VerifyOTP;
