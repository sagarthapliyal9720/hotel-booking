import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './navbar'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import AllHotel from './AllHotel'
import ForgotPassword from "./ForgotPassword";
import VerifyOTP from "./VerifyOTP";
import ResetPassword from "./ResetPassword";
import { Routes, Route } from "react-router-dom";
import Rooms from './Room'
import RoomBooking from './RoomBooking'
import MyBooking from './MyBooking'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
<Navbar></Navbar>
   
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allhotel" element={<AllHotel />} />
         <Route path="/room/:id" element={<Rooms />} />
         <Route path="/room_booking/:id" element={<RoomBooking/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
           <Route path="/MyBooking" element={<MyBooking/>} />
           <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/verify" element={<VerifyOTP />} />
          <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </>
  )
}

export default App
