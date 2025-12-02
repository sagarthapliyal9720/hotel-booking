import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";
import BASE_URL from "./api";
function AllHotel() {
  const [hotels, setHotels] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [search, setSearch] = useState("");

  async function FetchHotels() {
    try {
     const response = await fetch(`${BASE_URL}/hotel/`);

      const data = await response.json();
      setHotels(data);
      setFilterdata(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  }

  useEffect(() => {
    FetchHotels();
  }, []);

  // 🔍 SEARCH
  function handlesearchonchange(e) {
    const searchItem = e.target.value.toLowerCase();
    setSearch(searchItem);

    if (searchItem.length > 0) {
      const searchHoteldata = filterdata.filter((item) =>
        item.name.toLowerCase().includes(searchItem)
      );
      setHotels(searchHoteldata);
    } else {
      setHotels(filterdata);
    }
  }

  // ⬇️ SORT BY PRICE 
  function handlesubmit() {
    const sortedHotel = [...filterdata].sort(
      (a, b) => parseFloat(a.price) - parseFloat(b.price)
    );
    setHotels(sortedHotel);
  }

  return (
    <>
      <div className="container py-5">

        {/* 🔍 Search + Sort */}
        <div className="row mb-4 d-flex justify-content-center">
          <div className="col-md-6">
            <input
              type="text"
              value={search}
              onChange={handlesearchonchange}
              className="form-control form-control-lg"
              placeholder="Search hotels by name..."
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary btn-lg w-100" onClick={handlesubmit}>
              Sort by Price
            </button>
          </div>
        </div>

        <h2 className="text-center mb-4">🏨 Explore Our Hotels</h2>

        <div className="row g-4">
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <div key={hotel.id} className="col-md-4 col-lg-3">

                <div className="card shadow-sm h-100">

                  {/* Image */}
                  <img
                    src={
                      hotel.images && hotel.images.length > 0
                        ? `${BASE_URL}/${hotel.images[0].img}`
                        : "https://via.placeholder.com/400x250?text=No+Image"
                    }
                    className="card-img-top"
                    alt={hotel.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />

                  {/* Card Body */}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{hotel.name}</h5>
                    <p className="text-muted mb-1">📍 {hotel.city}</p>
                    <p className="card-text">
                      {hotel.description.slice(0, 80)}...
                    </p>

                    {/* Price + Button */}
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-danger">₹{hotel.price}</span>

                      <Link
                        to={`/room/${hotel.id}`}
                        state={{ hotel }}
                        className="btn btn-dark btn-sm"
                      >
                        View Rooms →
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-4">No hotels found 🏕️</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AllHotel;
