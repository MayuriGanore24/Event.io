import React, { useContext, useRef, useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom';
import logoimage from "../../assets/footer_logo.jpeg"
import wishlisticom from "../../assets/wishlisticon.png";
import { BookEventContext } from '../../context/BookEventContext';
import drop_down from "../../assets/Assets/Frontend_Assets/nav_dropdown.png"
const Navbar = () => {
    const { getTotalCartItems } = useContext(BookEventContext);
    const [menu, setMenu] = useState("/")
    const menuRef = useRef();
    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open')
    }
    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <Link style={{ textDecoration: 'none' }} to="/">
                    <img src={logoimage} alt='' /></Link>
                <Link style={{ textDecoration: 'none' }} to="/">
                    <p>Event.io</p>
                </Link>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={drop_down} alt="" />
            <ul className='nav-menu' ref={menuRef}>
                <li onClick={() => { setMenu("sports") }}><Link style={{ textDecoration: 'none' }} to="/sports">Sports</Link>{menu === "sports" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("cultural") }}><Link style={{ textDecoration: 'none' }} to="/cultural">Cultural</Link>{menu === "cultural" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("technical") }}><Link style={{ textDecoration: 'none' }} to="/technical">Technial</Link>{menu === "technical" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("competions") }}><Link style={{ textDecoration: 'none' }} to="/competitions">Competions</Link>{menu === "competions" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth_token') ? (
                    <button onClick={() => {
                        localStorage.removeItem('auth_token');
                        window.location.replace("/");
                    }}>
                        Logout
                    </button>
                ) : (
                    <Link style={{ textDecoration: 'none' }} to="/login">
                        <button>Login</button>
                    </Link>
                )}

                <Link style={{ textDecoration: 'none' }} to="/cart">
                    <img src={wishlisticom} alt='Cart Icon' />
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar
