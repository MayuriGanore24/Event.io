import React, { createContext, useState, useEffect } from "react";

export const BookEventContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 21; index++) {
    cart[index] = 0;
  }
  return cart;
};

const BookEventContextProvider = (props) => {
  const [all_events, setAllEvents] = useState([]);
  const [cartItem, setCartItem] = useState(getDefaultCart());
  const baseUrl = "http://localhost:4000"; // Base URL

  useEffect(() => {
    // Fetch all events
    fetch(`${baseUrl}/allevents`)
      .then((response) => response.json())
      .then((data) => setAllEvents(data));

    // Fetch cart data if auth token exists
    if (localStorage.getItem("auth_token")) {
      fetch(`${baseUrl}/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          auth_token: `${localStorage.getItem("auth_token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartItem(data));
    }
  }, []);

  const addToCart = (ItemId) => {
    setCartItem((prev) => ({
      ...prev,
      [ItemId]: prev[ItemId] + 1,
    }));

    if (localStorage.getItem("auth_token")) {
      fetch(`${baseUrl}/addtocart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          auth_token: `${localStorage.getItem("auth_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ItemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (ItemId) => {
    setCartItem((prev) => ({
      ...prev,
      [ItemId]: prev[ItemId] - 1,
    }));

    if (localStorage.getItem("auth_token")) {
      fetch(`${baseUrl}/removefromcart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          auth_token: `${localStorage.getItem("auth_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ItemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const itemInfo = all_events.find((event) => event.id === Number(item));
        totalAmount += itemInfo.new_booking_price * cartItem[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalItems += cartItem[item];
      }
    }
    return totalItems;
  };

  const contextValue = {
    all_events,
    cartItem,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <BookEventContext.Provider value={contextValue}>
      {props.children}
    </BookEventContext.Provider>
  );
};

export default BookEventContextProvider;
