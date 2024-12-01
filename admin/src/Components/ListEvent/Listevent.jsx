/* eslint-disable no-unused-vars */
import React from 'react'
import "./Listevent.css"
import { useState } from 'react'
import { useEffect } from 'react';
import cross_icon from "../../Admin_Assets/cross_icon.png"
const Listevent = () => {
  const [allevents, setallevents]=useState([]);
  const fetchInfo=async()=>{
    await fetch("http://localhost:4000/allevents")
    .then((res)=>res.json())
    .then((data)=>{setallevents(data)})
  }
  useEffect(()=>{
    fetchInfo();
  },[])
  const removeEvent=async(id)=>{
    await fetch("http://localhost:4000/removeevent",{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id}),
    })
    await fetchInfo();
  }
  return (
    <div className='listevent'>
      <h1>All Events List</h1>
      <div className="list-event-format-main">
        <p>Events</p>
        <p>Title</p>
        <p>Old_price</p>
        <p>New_price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="list-events-allevents">
        <hr />
        {
        allevents.map((event,index)=>{
          return <><div key={index} className="list-event-format-main listevent-format">
              <img className='listevent-event-icon' src={event.image} alt="" />
              <p>{event.name}</p>
              <p>${event.old_price}</p>
              <p>${event.new_price}</p>
              <p>{event.category}</p>
              <img onClick={()=>{removeEvent(event.id)}} className='listevent-removeicon' src={cross_icon} alt="" />
          </div>
          <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default Listevent
