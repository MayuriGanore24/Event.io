import React from 'react'
import "./Hero.css"
import hero_img from "../../assets/Hero.png" 
import hand_icon from "../../assets/Assets/Frontend_Assets/hand_icon.png";
import arrow_icon from "../../assets/Assets/Frontend_Assets/arrow.png";
const Hero = () => {
    return (
        <div className='hero'>
            <div className="hero-left">
                <h2>Latest Events Near You!!</h2>
                <div>
                <div className="hero-hand-icon">
                    <p>Upcoming Events</p>
                    <img src={hand_icon} alt='/' />
                </div>
                <p>Grab the Opportunity!!</p>
                <p>Register Now!</p>
            </div>
            <div className="hero-latest-btn">
                <div>
                    Latest Events
                </div>
                <img src={arrow_icon} alt="" />
            </div>
            </div>

        <div className="hero-right">
        <img src={hero_img} alt="" />
        </div>
        </div>
    )
}

export default Hero
