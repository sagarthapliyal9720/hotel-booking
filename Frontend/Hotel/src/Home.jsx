import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";
const API = import.meta.env.VITE_API_URL;
function Home() {
  const [hotel,setHotel]=useState([])
async function FetchHotel() {
  try {
    const response = await fetch("https://hotel-booking-5-9w3p.onrender.com/hotel/"); 
    const data = await response.json();                           
    setHotel(data);
    // console.log(data);
    // console.log(hotel)
  } catch (error) {
    console.log("Error fetching hotels", error);
  }
}

useEffect(() => {
  FetchHotel();
}, []);

  return (
    <>
      <div className="container-fluid p-0 mt-1">

        {/* 🌟 Carousel Section */}
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active" style={{ height: "450px" }}>
              <img
                src="https://picsum.photos/id/1018/1200/500"
                className="d-block w-100"
                style={{ objectFit: "cover", height: "100%" }}
                alt="slide-1"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Luxury Comfort</h5>
                <p>Enjoy premium rooms and amazing hospitality.</p>
              </div>
            </div>

            <div className="carousel-item" style={{ height: "450px" }}>
              <img
                src="https://picsum.photos/id/1025/1200/500"
                className="d-block w-100"
                style={{ objectFit: "cover", height: "100%" }}
                alt="slide-2"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Beautiful Views</h5>
                <p>Stay where every window shows a story.</p>
              </div>
            </div>

            <div className="carousel-item" style={{ height: "450px" }}>
              <img
                src="https://picsum.photos/id/1031/1200/500"
                className="d-block w-100"
                style={{ objectFit: "cover", height: "100%" }}
                alt="slide-3"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Feel Like Home</h5>
                <p>Comfort, food, and peace of mind all together.</p>
              </div>
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>

        {/* ⭐ Features Section */}
        <div className="row text-center py-4 border-top">

          <div className="col-4 border-end">
            <h1>🏨</h1>
            <p className="fw-bold">Best Prices</p>
          </div>

          <div className="col-4 border-end">
            <h1>⭐</h1>
            <p className="fw-bold">Top Rated Hotels</p>
          </div>

          <div className="col-4">
            <h1>⚡</h1>
            <p className="fw-bold">Fast Booking</p>
          </div>

        </div>

        {/* Extra Section */}
        <div className="row text-center py-5">
          <h2>Welcome to Our Hotel Booking App</h2>
          <p className="text-muted">Search, compare, and book your ideal stay instantly.</p>
        </div>
<div className="row text-center m-2">
  {/* <div className="col-3">
    <div className="card" style={{ width: "18rem" }}>
  <img src="..." className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>
  </div> */}

 {
  hotel.slice(0, 4).map((hotel, id) => (
    <div className="col-3" key={hotel.id}>
      <div className="card" style={{ width: "18rem" }}>
        
       <img 
       style={{
        padding:"5px"
       }}
  src={
    hotel.images && hotel.images.length > 0
      ? `https://hotel-booking-5-9w3p.onrender.com${hotel.images[0].img}`
      : "https://via.placeholder.com/300x200?text=No+Image"
  }
  className="card-img-top"
  alt={hotel.name}
/>

        <div className="card-body">
          <h5 className="card-title">{hotel.name}</h5>
          <p className="card-text">{hotel.description}</p>
         
           <Link 
        to={`/room/${hotel.id}`} 
        state={{ hotel }}
        className="btn btn-primary w-100"
>
  View More
</Link>
               </div>
      </div>
    </div>
  ))
}

</div>

      </div>
      <Footer></Footer>
    </>
  );
}

export default Home;
