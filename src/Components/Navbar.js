import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from './Home';
import Shop from './Shop';
import Contact from './Contact';
import Cart from './Cart';
import ItemDetails from './ItemDetails';
import Login from './Login';
import Signup from './Signup';
import './css/Navbar.css';

const Navbar = () => {
    const [scroll, setScroll] = useState(false);
    const location = useLocation();
    const scrolling = () => {
        if (window.scrollY >= 2) {
            setScroll(true);
        }
        else {
            setScroll(false);
        }
    }
    window.addEventListener('scroll', scrolling);
    return (
        <>
            <div className={`container-fluid main_nav_div p-3 ps-3 pe-3 text-white ${scroll ? 'active' : ''}`}>
                <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-2 offset-1 name">
                        <Link to="/" style={{ color: ((location.pathname === "/shop") || (location.pathname === "/cart") || (location.pathname === "/item_details")) && "black" }} className={`logo ${scroll ? 'logoAfterScroll' : ''}`}>AnkitKart</Link>
                    </div>
                    <div className="col-6 linkDiv">
                        <ul className="row">
                            <li className="col-3 mt-3">
                                <Link to="/" style={{ color: ((location.pathname === "/shop") || (location.pathname === "/cart") || (location.pathname === "/item_details")) && "black" }} className={`${scroll ? 'navLinksAfterScroll' : 'navLinks'}`}>Home</Link>
                            </li>
                            <li className="col-3 mt-3">
                                <Link style={{ color: ((location.pathname === "/shop") || (location.pathname === "/cart") || (location.pathname === "/item_details")) && "black" }} to="/shop" className={`${scroll ? 'navLinksAfterScroll' : 'navLinks'}`}>Shop</Link>
                            </li>
                            <li className="col-3 mt-3">
                                <Link to="/contact" style={{ color: ((location.pathname === "/shop") || (location.pathname === "/cart") || (location.pathname === "/item_details")) && "black" }} className={`${scroll ? 'navLinksAfterScroll' : 'navLinks'}`}>Contact</Link>
                                {/* <a href="/contact" className={`${scroll ? 'navLinksAfterScroll' : 'navLinks'}`}>Contact</a> */}
                            </li>
                        </ul>
                    </div>
                    <div className="col-2 login d-flex justify-content-evenly">
                        <Link to="/cart"><i style={{ color: ((location.pathname === "/shop") || (location.pathname === "/cart") || (location.pathname === "/item_details")) && "black" }} className={`bi bi-cart3 cartIcon ${scroll ? 'cartIconAfterScroll' : ''}`} /></Link>
                        <Link to="/login">
                            <button className="loginBtn btn btn-primary">Login</button>
                        </Link>
                    </div>
                </div>
            </div>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/item_details" element={<ItemDetails />} />
            </Routes>
        </>
    );
}
export default Navbar;

