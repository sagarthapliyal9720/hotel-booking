import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    // localStorage.removeItem("refresh");

    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("access_token"); // check correct token

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
        padding: "15px 40px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-3" to="/">
          🏨 HotelBooking
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto gap-3 fs-5">

            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/allhotel">All Hotel</Link>
            </li>

            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/MyBooking">
                  My Booking
                </Link>
              </li>
            )}

            {/* Login / Logout */}
            {!isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold" to="/login">
                  Login
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-light fw-bold"
                  style={{
                    borderRadius: "8px",
                    padding: "5px 15px",
                    fontSize: "17px",
                  }}
                >
                  Logout
                </button>
              </li>
            )}

            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/register">
                  Register
                </Link>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
