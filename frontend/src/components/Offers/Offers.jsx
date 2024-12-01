import React from 'react'
import "./Offers.css"
import exclusive_img from "../../assets/exclusive.png"
const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
        <h1>Exclusive Events</h1>
        <h1>Just for you!</h1>
        <p>Save Your Seat Now!!</p>
        <button>Book Now!!</button>
        </div>
        <div className="offers-right">
            <img src={exclusive_img} alt="" />
        </div>
    </div>
  )
}

export default Offers
