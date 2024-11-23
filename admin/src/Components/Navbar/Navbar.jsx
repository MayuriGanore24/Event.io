/* eslint-disable no-unused-vars */
import React from 'react'
import "./Navbar.css";
import navlogo from "../../Admin_Assets/AdminLogo.png";
import navprofile from "../../Admin_Assets/nav-profile.svg";
const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='nav-logo' src={navlogo} alt="" />
      <img className='nav-profile' src={navprofile} alt=""/>
    </div>
  )
}

export default Navbar
