import React, { useContext } from 'react'
import "./EventDisplay.css"
import star_img from "../../assets/Assets/Frontend_Assets/star_icon.png";
import star_dull from "../../assets/Assets/Frontend_Assets/star_dull_icon.png";
import { BookEventContext } from '../../context/BookEventContext';
const EventDisplay = (props) => {
  const {event}=props;
  const {addtoCart}=useContext(BookEventContext)
  return (
    <div className='event-display'>
      <div className="event-display-left">
        <div className="eventdisplau-img-list">
          <img src={event.image} alt="" />
          <img src={event.image} alt="" />
          <img src={event.image} alt="" />
          <img src={event.image} alt="" />
        </div>
        <div className="eventdisplay-img">
          <img className='eventdisplay-main-img' src={event.image} alt="" />
        </div>
      </div>
      <div className="eventdisplay-right">
        <h1>{event.name}</h1>
        <div className="eventdisplay-right-star">
          <img src={star_img} alt="" />
          <img src={star_img} alt="" />
          <img src={star_img} alt="" />
          <img src={star_img} alt="" />
          <img src={star_dull} alt="" />
          <p>(122)</p>
        </div>
        <div className="eventdisplay-right-prices">
          <div className="eventdisplay-rightprices-old">
            ${event.old_booking_price}
          </div>
          <div className="eventdisplay-rightprices-new">
            ${event.new_booking_price}
          </div>
        </div>
        <div className="eventdisplayright-description">
          A vey good and Cheerful event!!
        </div>
        <button onClick={()=>{addtoCart(event.id)}}>Add to Cart</button>
      </div>
    </div>
  )
}

export default EventDisplay
