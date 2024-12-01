import React, { useEffect, useState } from 'react'
import "./Popular.css"
import Item from '../Items/Item'
// import data_product from "../../assets/Assets/Frontend_Assets/data"
const Popular = () => {
  const [popularEvents,setPopularEvents] =useState([]);
  useEffect(()=>{
    fetch("https://eventbackend-f53q.onrender.com/popularinSports")
    .then((response=>response.json()))
    .then((data)=>setPopularEvents(data))
  },[])
  return (
    <div className='popular'>
      <h1>Popular Sports Events</h1>
      <hr/>
      <div className="popular-item">
        {popularEvents.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default Popular
