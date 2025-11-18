import React from "react";
function Footer(){
    return(
        <>
        <footer className="bg-dark text-white mt-5 py-4">
  <div className="container">

    <div className="row">

      {/* Column 1 */}
      <div className="col-md-4">
        <h5>Hotel Booking</h5>
        <p className="text">
          Your trusted partner for finding the best hotels at the best prices.
        </p>
      </div>

      {/* Column 2 */}
      <div className="col-md-4">
        <h5>Quick Links</h5>
        <ul className="list-unstyled">
          <li><a href="#" className="text-white text-decoration-none">Home</a></li>
          <li><a href="#" className="text-white text-decoration-none">Hotels</a></li>
          <li><a href="#" className="text-white text-decoration-none">About</a></li>
          <li><a href="#" className="text-white text-decoration-none">Contact</a></li>
        </ul>
      </div>

      {/* Column 3 */}
      <div className="col-md-4">
        <h5>Contact Us</h5>
        <p className="text m-0">📍 Rishikesh,Uttarakhand India</p>
        <p className="text m-0">📞 +91 9720544---</p>
        <p className="text m-0">✉️ sagar@gmail.com</p>
      </div>

    </div>

    <hr className="border-light" />

    <div className="text-center mt-2">
      <p className="m-0">© 2025 Hotel Booking App. All Rights Reserved.</p>
    </div>

  </div>
</footer>
</>
    )
}
export default Footer