/* eslint-disable no-unused-vars */
import React from 'react'
import "./Sidebar.css"
import addproducticon from "../../Admin_Assets/Product_Cart.svg"
import listevents from "../../Admin_Assets/Product_list_icon.svg"
import {Link} from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addevent'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
        <img src={addproducticon} alt="" />
        <p>Add Event</p>
      </div>
      </Link>
      <Link to={'/listevents'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
        <img src={listevents} alt="" />
        <p>List Events</p>
      </div>
      </Link>
    </div>
  )
}

export default Sidebar
