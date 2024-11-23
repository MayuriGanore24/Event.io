/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import "./Addevent.css"
import upload_ares from "../../Admin_Assets/upload_area.svg"
const Addevent = () => {
  const [image,setimage]=useState(false);
  const [eventdetails,seteventdetails]=useState({
    name:"",
    image:"",
    category:"sports",
    old_price:"",
    new_price:""
  });
  const ImageHandler=(e)=>{
      setimage(e.target.files[0]);
  }
  const changeHandler=(e)=>{
    seteventdetails({...eventdetails,[e.target.name]:e.target.value})
  }
  const addEvent=async()=>{
      console.log(eventdetails);
      let responseData;
      let event=eventdetails;
      let formData=new FormData();
      formData.append('event',image);
      await fetch('http://localhost:4000/upload',{
        method:'POST',
        headers:{
          Accept:"application/json"
        },
        body:formData,
      }).then((resp)=>resp.json()).then((data)=>{responseData=data})
      if(responseData.success)
      {
        event.image=responseData.image_url;
        console.log(event)
        await fetch('http://localhost:4000/addevent',{
          method:'POST',
          headers:{
            Accept:"application/json",
            'Content-Type':'application/json'
          },
          body:JSON.stringify(event)
        }) .then((resp)=>resp.json()).then((data)=>{
          data.success?alert("Event added successfully"):
          alert("Failed to add event")
        })
      }
  }
  return (
    <div className='addevent'>
      <div className="addevent-itemfield">
        <p>Event title</p>
        <input value={eventdetails.name} onChange={changeHandler} type="text" name="name" placeholder='type here' />
      </div>
      <div className="addevent-price">
      <div className="addevent-itemfield">
        <p>Booking price</p>
        <input value={eventdetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='type here' />
      </div>
      <div className="addevent-itemfield">
        <p>Booking Offer price</p>
        <input value={eventdetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='type here' />
      </div>
      </div>
      <div className="addevent-itemfield">
        <p>Event Category</p>
        <select value={eventdetails.category} onChange={changeHandler} name="category" className='addeventselector'>
          <option value="sports">Sports</option>
          <option value="competitions">Competitions</option>
          <option value="cultural">Cultural</option>
          <option value="technical">Technical</option>
        </select>
      </div>
      <div className="addevent-itemfield">
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_ares} className='addevent-thumbnailimg' alt="" />
        </label>
        <input onChange={ImageHandler} type="file" name='image' id="file-input" hidden/>
      </div>
      <button onClick={addEvent} className='addeventbtn'>Add Event</button>
    </div>
  )
}

export default Addevent
