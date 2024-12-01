import React, { useState } from 'react'
import "./CSS/LoginSignup.css"
import { Link } from 'react-router-dom'
const LoginSignup = () => {
  const [state, setState] = useState("login")
  const [formdata,setFormData] = useState({
    username:"",
    password:"",
    email:""
  })
  const changeHandler=(e)=>{
      setFormData({
        ...formdata,[e.target.name]:e.target.value
      })
  }
  const login=async()=>{
      console.log("Login Function executed",formdata)
      let responseData;
    await fetch("https://eventbackend-f53q.onrender.com/login",{
      method:'POST',
      headers:{
        Accept:"application/json",
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formdata),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    console.log("Response data:", responseData);
    if (responseData.success){
      localStorage.setItem('auth_token',responseData.token)
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
  }
  const signup=async()=>{
    console.log("Signup Function executed",formdata)
    let responseData;
    await fetch("https://eventbackend-f53q.onrender.com/signup",{
      method:'POST',
      headers:{
        Accept:"application/json",
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formdata),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    console.log("Response data:", responseData);
    if (responseData.success){
      localStorage.setItem('auth_token',responseData.token)
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
  }
  return (
    <div className='loginsighup'>
      <div className="loginsighnup-container">
        <h1>{state}</h1>
        <div className="loginsighup-fields">
          {state === 'signup' ? <input name='username' value={formdata.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}
          <input name='email' value={formdata.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formdata.password} onChange={changeHandler} type="password" placeholder='Enter Password' />
          <button onClick={()=>{state==="login"?login():signup()}}>{state}</button>
          {
            state === 'signup' ?
            <p className='loginsighup-login'>Already have an Account?<span onClick={()=>{setState("login")}}><Link to="/login">Login</Link></span></p>
            :
          <p className='loginsighup-login'>Create an Account?<span onClick={()=>{setState("signup")}}><Link to="/login">Click here</Link></span></p>
          }
          <div className="loginsignup-agree">
            <input className='checkbox' type="checkbox" name='' id='' />
            <p>By continuing I agree to terms and privacy policy!</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LoginSignup
