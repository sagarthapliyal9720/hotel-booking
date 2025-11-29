import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Footer from "./footer";
function Rooms() {
  const [slider, setSlider] = useState(0);
  const [rooms, setRooms] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const hotel = location.state?.hotel;

  // ------------------- Fetch Rooms -------------------
  async function fetchRooms() {
    try {
      const response = await fetch(`https://hotel-booking-5-9w3p.onrender.com/room/${id}/`);
      const data = await response.json();
      console.log("ROOM API RESPONSE:", data);
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  }

  // ------------------- Slider -------------------
  function setPlus() {
    if (!hotel?.images) return;

    setSlider((prev) =>
      prev === hotel.images.length - 1 ? 0 : prev + 1
    );
  }

  useEffect(() => {
    const intervalId = setInterval(setPlus, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [id]);

  if (!hotel) return <h2>No hotel data found</h2>;

  // ------------------- JSX -------------------
  return (
    <>
      <div className="container-fluid">
        {/* Carousel */}
        <div id="carouselExampleCaptions" className="carousel slide m-2">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={`https://hotel-booking-5-9w3p.onrender.com${hotel.images[slider].img}`}

                className="d-block w-100"
                style={{ height: "450px", objectFit: "cover" }}
                alt="Hotel"
              />
            </div>
          </div>
        </div>

        {/* Hotel Description */}
        <div className="row text-center">
          <h1>About The Hotel</h1>
          <p className="fs-3 fw-normal">{hotel.description}</p>
        </div>

        {/* Rooms Section */}
        <div className="row">
          <h1>Available Rooms</h1>

          {rooms.map((room) => (
          <div key={room.id} className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
  <div className="card h-100 w-100">

    <img
      src={`https://hotel-booking-5-9w3p.onrender.com${room.room_img}`}
      className="card-img-top"
      style={{ height: "200px", objectFit: "cover" }}
      alt="Room"
    />

    <div className="card-body">
      <p className="card-title">Room number: {room.room_number}</p>
      <h5 className="card-title">{room.room_type}</h5>
      <p className="card-text">Price: ₹{room.price_per_night}</p>

      <Link
        to={`/room_booking/${room.id}`}
        state={{ room, hotel }}
        className="btn btn-primary w-100"
      >
        Book Room
      </Link>
    </div>

  </div>
</div>

          ))}

        </div>
      <Footer></Footer>
      </div>
    </>
  );
}

export default Rooms;
