import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";
import BASE_URL from "./api";
function Home() {
  const [hotel, setHotel] = useState([]);

  async function FetchHotel() {
    try {
      const response = await fetch(`${BASE_URL}/hotel`);
      const data = await response.json();
      setHotel(data);
      console.log(data)
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

        {/* 🌟 Responsive Carousel */}
        <div id="carouselExampleCaptions" className="carousel slide">

          <div className="carousel-inner">
            {[
              {
                img: "https://picsum.photos/id/1018/1200/500",
                title: "Luxury Comfort",
                text: "Enjoy premium rooms and amazing hospitality."
              },
              {
                img: "https://picsum.photos/id/1025/1200/500",
                title: "Beautiful Views",
                text: "Stay where every window shows a story."
              },
              {
                img: "https://picsum.photos/id/1031/1200/500",
                title: "Feel Like Home",
                text: "Comfort, food, and peace of mind all together."
              }
            ].map((item, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <img
                  src={item.img}
                  className="d-block w-100 img-fluid"
                  style={{ objectFit: "cover", height: "450px" }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{item.title}</h5>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
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

        {/* Welcome Section */}
        <div className="row text-center py-5">
          <h2>Welcome to Our Hotel Booking App</h2>
          <p className="text-muted">Search, compare, and book your ideal stay instantly.</p>
        </div>

        {/* 🏨 Responsive Hotel Cards */}
        <div className="row g-4 px-3 pb-5">

          {hotel.slice(0, 4).map((item) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={item.id}
            >
              <div className="card h-100 shadow-sm">

                <img
                 src={
  item.images && item.images.length > 0
    ? `${BASE_URL}${item.images[0].img}`
    : "https://via.placeholder.com/300x200?text=No+Image"
}

                  className="card-img-top img-fluid"
                  style={{ padding: "5px", height: "200px", objectFit: "cover" }}
                  alt={item.name}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text text-truncate">{item.description}</p>

                  <Link
                    to={`/room/${item.id}`}
                    state={{ hotel: item }}
                    className="btn btn-primary mt-auto w-100"
                  >
                    View More
                  </Link>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
