import React, { useState, useEffect } from "react";

function MyBooking() {
  const [bookings, setBookings] = useState([]);

  async function FetchingBooking() {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("https://hotel-booking-4-v2we.onrender.com/mybooking/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      console.log("Bookings data:", data);
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  }

  useEffect(() => {
    FetchingBooking();
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>🧳 My Bookings</h2>

      {bookings.length > 0 ? (
        <ul
          style={{
            listStyle: "none",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            padding: 0,
          }}
        >
          {bookings.map((b, index) => (
            <li
              key={index}
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
            <p><strong>Hotel:</strong> {b.hotel_name}</p>
<p><strong>City:</strong> {b.hotel_city}</p>
<p><strong>Room:</strong> {b.room_number} ({b.room_type})</p>
<p><strong>Check-in:</strong> {b.check_in}</p>
<p><strong>Check-out:</strong> {b.check_out}</p>

            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center", color: "#777" }}>No bookings yet 🏕️</p>
      )}
    </div>
  );
}

export default MyBooking;

