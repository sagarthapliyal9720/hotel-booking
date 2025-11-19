import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

function RoomBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const room = location.state?.room; // ✅ safe optional access
  const hotel = location.state?.hotel; // ✅ get hotel data
  console.log(hotel);

  const [formdata, setFormdata] = useState({
    check_in: "",
    check_out: "",
  });

  const { id } = useParams(); // get room id from route like /room_booking/:id

  function handlechange(e) {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  }

  async function handlesubmite(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(`https://hotel-booking-5-9w3p.onrender.com/booking/${id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formdata),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Room booked successfully!");
        console.log("Booking data:", data);
        navigate("/MyBooking");
      } else {
        alert(`❌ ${data.message || "Booking failed"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Something went wrong!");
    }
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        backgroundColor: "#f9fafc",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* 🏨 Hotel Info */}
      {hotel && (
        <div
          style={{
            backgroundColor: "#e8f0fe",
            padding: "15px 20px",
            borderRadius: "8px",
            marginBottom: "20px",
            borderLeft: "6px solid #4facfe",
          }}
        >
          <h2 style={{ margin: "0 0 5px 0", color: "#333" }}>
            🏨 {hotel.name}
          </h2>
          {hotel.location && (
            <p style={{ margin: 0, color: "#666" }}>
              📍 {hotel.location}
            </p>
          )}
        </div>
      )}

      {/* 🛏️ Room Details */}
      {room ? (
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "25px",
            borderLeft: "6px solid #4facfe",
          }}
        >
          <h3 style={{ color: "#333", marginBottom: "10px" }}>
            Room {room.room_number}
          </h3>
          <p style={{ margin: "5px 0", color: "#555" }}>
            Type: <strong>{room.room_type}</strong>
          </p>
          <p style={{ margin: "5px 0", color: "#555" }}>
            Price: <strong>₹{room.price_per_night}</strong> / night
          </p>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#777" }}>
          ⚠️ Room details not available.
        </p>
      )}

      {/* 📅 Booking Form */}
      <form
        onSubmit={handlesubmite}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <label style={{ fontWeight: "500" }}>Check-In Date</label>
        <input
          type="date"
          onChange={handlechange}
          name="check_in"
          value={formdata.check_in}
          required
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <label style={{ fontWeight: "500" }}>Check-Out Date</label>
        <input
          type="date"
          onChange={handlechange}
          name="check_out"
          value={formdata.check_out}
          required
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#4facfe",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Book Room
        </button>
      </form>
    </div>
  );
}

export default RoomBooking;
