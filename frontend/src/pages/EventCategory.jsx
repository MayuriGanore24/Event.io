import React, { useContext } from 'react'
import "./CSS/EventCategory.css"
import { BookEventContext } from '../context/BookEventContext'
import dropdown_icon from "../assets/Assets/Frontend_Assets/dropdown_icon.png"
import Item from '../components/Items/Item'
const EventCategory = (props) => {
  const {all_events}=useContext(BookEventContext)
  console.log(props.name)
  return (
    <div className='eventcategory'>
      <img className='eventcategory-banner' src={props.banner} alt="" />
      <div className="bookeventcategoryindexsort">
        <p>
          <span>Showing 1-12</span>out of 26 products 
        </p>
        <div className="shopcategoey-sort">
          Sort by<img src={dropdown_icon} alt=''/>
        </div>
      </div>
    <div className="eventcategory-event">
      {all_events.map((item,i)=>{
        if(props.category===item.category)
        {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_booking_price} old_price={item.old_booking_price}/>
        }
        else
        {
          return null;
        }
      })}
    </div>
    <div className="eventcategory-exploremore">
      Explore More
    </div>
    </div>
  )
}

export default EventCategory
