/* eslint-disable no-unused-vars */
import React from 'react'
import "./Admin.css"
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import Addevent from '../../Components/AddEvent/Addevent'
import Listevent from '../../Components/ListEvent/Listevent'
const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addevent' element={<Addevent/>}/>
        <Route path='/listevents' element={<Listevent/>}/>
      </Routes>
    </div>
  )
}

export default Admin
