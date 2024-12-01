import React, { useContext } from 'react'
import "./CartItems.css"
import { BookEventContext } from '../../context/BookEventContext'
import remove_icon from "../../assets/Assets/cross_icon.png"
const CartItems = () => {
    const { all_events, cartItem, removeFromCart,getTotalCartAmount } = useContext(BookEventContext);
    return (
        <div className='cartitems'>
            <div className="cartitem-format-main">
                <p>Events</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />

            {all_events.map((e) => {
                if (cartItem[e.id] > 0) {
                    return <div><div className='cartitemsformat cartitem-format-main'>
                        <img src={e.image} alt="" className='cartitem-event-icon' />
                        <p>{e.name}</p>
                        <p>${e.new_booking_price}</p>
                        <button className='cartitem-quantity'>{cartItem[e.id]}</button>
                        <p>{e.new_booking_price * cartItem[e.id]}</p>
                        <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                    </div>
                        <hr />
                    </div>


                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>CartTotal</h1>
                    <div className="cartitems-promocode-container">
                        <div className="cartitems-promocode">
                            <p>If you have a promocode enter here</p>
                            <div className="cartitem-promobox">
                                <input type="text" placeholder='promocode' />
                                <button>Apply</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="cartitems-total-item">
                            <p>SubTotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Booking Cost</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                        <button>Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems
