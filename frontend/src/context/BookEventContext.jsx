import React ,{createContext, useState,useEffect} from "react";
// import {all_events} from "../assets/all_events.jsx"
export const BookEventContext=createContext(null);
const getDefaultcart=()=>{
    let cart={};
    for(let index=0 ;index<20+1;index++)
    {
        cart[index]=0;
    }
    return cart;    
}
const BookEventContextProvider=(props)=>{
    const [all_events,setAllEvents]=useState([]);
    const [cartItem,setCartItem]=useState(getDefaultcart());
    useEffect(()=>{
        fetch("http://localhost:4000/allevents")
        .then((response)=>response.json())
        .then((data)=>setAllEvents(data))
        if(localStorage.getItem("auth_token")){
            fetch("http://localhost:4000/getcart",{
                method:"POST",
                headers:{
                    Accept:'application/form-data',
                    'auth_token':`${localStorage.getItem('auth_token')}`,
                    'Content-Type':"application/json",
                },
                body:"",
            })
            .then((response)=>response.json())
            .then(data=>setCartItem(data))
        }
    },[])
    const addtoCart=(ItemId)=>{
        setCartItem((prev)=>({...prev,[ItemId]:prev[ItemId]+1}))
        if (localStorage.getItem('auth_token')){
            fetch("http://localhost:4000/addtocart",{
                method:"POST",
                headers:{
                    Accept:'application/form-data',
                    'auth_token':`${localStorage.getItem('auth_token')}`,
                    'Content-Type':"application/json",
                },
                body:JSON.stringify({"ItemId":ItemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    }
    const removeFromCart=(ItemId)=>{
        setCartItem((prev)=>({...prev,[ItemId]:prev[ItemId]-1}))
        if(localStorage.getItem('auth_token')){
            fetch("http://localhost:4000/removefromcart",{
                method:"POST",
                headers:{
                    Accept:'application/form-data',
                    'auth_token':`${localStorage.getItem('auth_token')}`,
                    'Content-Type':"application/json",
                },
                body:JSON.stringify({"ItemId":ItemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    }
    const getTotalCartAmount=()=>{
        let totalAmout=0;
        for(const item in cartItem)
        {
            if(cartItem[item]>0)
            {
                let itemInfo=all_events.find((event)=>event.id===Number(item));
                totalAmout+=itemInfo.new_booking_price*cartItem[item]
            }
        }
        return totalAmout;
    }
    const getTotalCartItems=()=>{
        let totalItem=0;
        for(const item in cartItem)
        {
            if(cartItem[item]>0)
            {
                totalItem+=cartItem[item];
            }
        }
        return totalItem;
    }
    const contextValue={all_events,cartItem,removeFromCart,addtoCart,getTotalCartAmount,getTotalCartItems};

    return (
        <BookEventContext.Provider value={contextValue}>
            {props.children}
        </BookEventContext.Provider>
    )
}
export default BookEventContextProvider;