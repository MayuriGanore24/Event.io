import React from 'react'
import "./Footer.css"
import footer_logo from "../../assets/footer_logo.jpeg"
import insta_icon from "../../assets/Assets/Frontend_Assets/instagram_icon.png";
import printrest_icon from "../../assets/Assets/Frontend_Assets/pintester_icon.png"
import wp_icon from "../../assets/Assets/Frontend_Assets/whatsapp_icon.png"
const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>Event.io</p>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Events</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icons">
            <div className="footer-icons-cotainer">
                <img src={insta_icon} alt="" />
            </div>
            <div className="footer-icons-cotainer">
                <img src={printrest_icon} alt="" />
            </div>
            <div className="footer-icons-cotainer">
                <img src={wp_icon} alt="" />
            </div>
        </div>
        <div className="footer-copyright">
<hr />
<p>Copyright@2024- All Rights Reserved!</p>
        </div>
    </div>
  )
}

export default Footer
