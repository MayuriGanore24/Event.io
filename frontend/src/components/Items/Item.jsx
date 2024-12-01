import React from 'react'
import "./Item.css";
import { Link } from 'react-router-dom';
const Item = (props) => {
  return (
    <div className='item'>
        <Link to={`/events/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
        <p className='event-name'>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-old">
                <p>₹{props.old_price}</p>
            </div>
            <div className="item-price-new">
                <p>Book for ₹{props.new_price} Only</p>
            </div>
        </div>
    </div>
  )
}

export default Item
