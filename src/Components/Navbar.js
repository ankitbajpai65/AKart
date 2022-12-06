import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from './Home';
import Shop from './Shop';
import Contact from './Contact';
import Cart from './Cart';
import ItemDetails from './ItemDetails';
import Login from './Login';
import Signup from './Signup';
import Error from './Error';
import './css/Navbar.css';
import { signOut } from "firebase/auth";
import { auth } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import MenuIcon from '@material-ui/icons/Menu';

const Navbar = () => {
    const [mobileView, setMobileView] = useState(false);
    const [hamburgerClick, setHamburgerClick] = useState(false);
    const [scroll, setScroll] = useState(false);
    const [displayLogoutBtn, setDisplayLogoutBtn] = useState(false);
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
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            // console.log(user);
            if (user) setDisplayLogoutBtn(true);
            else setDisplayLogoutBtn(false)
        })
    })
    const handleLogout = () => {
        console.log('logout');
        signOut(auth).then(() => {
            toast.success("Your have been successfully logged out!", {
                position: "top-center",
                theme: "dark"
            });
        }).catch((error) => {
            alert(error.message);
        });
    }
    const handleHamburgerClick = () => {
        setHamburgerClick(!hamburgerClick)
    }
    const disableHamburger = () => {
        setHamburgerClick(!hamburgerClick)
    }
    useEffect(() => {
        if (window.innerWidth <= 641)
            setMobileView(true);
    }, [mobileView])
    return (
        <>
            <div className={`container-fluid main_nav_div p-3 ps-3 pe-3 text-white ${scroll ? 'active' : ''} ${hamburgerClick ? 'showMobNav navAnim' : ''}`}>
                {mobileView ?
                    <>
                        <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-1">
                                <Link>
                                    <MenuIcon
                                        onClick={handleHamburgerClick}
                                        className={`hamburger ${hamburgerClick ? 'changeHamburgerStyle' : ''} ${scroll ? 'changeHamburgerStyle' : ''}`}
                                        style={{ color: location.pathname === "/" || location.pathname == "/contact" || location.pathname === "/login" || location.pathname === "/signup" ? "white" : "black" }}
                                    />
                                </Link>
                            </div>
                            <div className="col-5 login d-flex justify-content-evenly">
                                <Link to="/cart">
                                    <i
                                        className={`bi bi-cart3 cartIcon ${scroll ? 'cartIconAfterScroll' : ''} ${hamburgerClick ? 'cartIconInMob' : ''}`}
                                        style={{ color: location.pathname === "/" || location.pathname == "/contact" || location.pathname === "/login" || location.pathname === "/signup" ? "white" : "black" }}
                                    />
                                </Link>
                                {displayLogoutBtn ?
                                    (<Link>
                                        <button className="loginBtn btn btn-secondary" onClick={handleLogout}>Logout</button>
                                    </Link>)
                                    :
                                    (<Link to="/login">
                                        <button className="loginBtn btn btn-primary offset-1">Login</button>
                                    </Link>)
                                }
                            </div>
                            {hamburgerClick &&
                                <div className="linkDiv mobileNav" style={{ height: "35.5%" }}>
                                    <ul className="row h-100">
                                        <li className="col-2 offset-5 mt-5">
                                            <Link to="/" className='navLinks text-dark' onClick={disableHamburger}>Home</Link>
                                        </li>
                                        <li className="col-2 offset-5 mt-5">
                                            <Link to="/shop" className='navLinks text-dark' onClick={disableHamburger}>Shop</Link>
                                        </li>
                                        <li className="col-2 offset-5 mt-5">
                                            <Link to="/contact" className='navLinks text-dark' onClick={disableHamburger}>Contact</Link>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </>
                    :
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-2 offset-1 name">
                            <Link
                                to="/"
                                style={{ color: location.pathname === "/" || location.pathname == "/contact" || location.pathname === "/login" || location.pathname === "/signup" ? "white" : "black" }}
                                className={`logo ${scroll ? 'logoAfterScroll' : ''}`}>
                                aKart
                            </Link>
                        </div>
                        <div className="col-6 linkDiv">
                            <ul className="row">
                                <li className="col-3 mt-3">
                                    <Link
                                        to="/"
                                        style={{ color: location.pathname === "/" || location.pathname == "/contact" || location.pathname === "/login" || location.pathname === "/signup" ? "white" : "black" }} className={`${scroll ? 'navLinksAfterScroll' : 'navLinks'}`}>
                                        Home
                                    </Link>
                                </li>
                                <li className="col-3 mt-3">
                                    <Link
                                        style={{ color: location.pathname === "/" || location.pathname == "/contact" || location.pathname === "/login" || location.pathname === "/signup" ? "white" : "black" }} to="/shop"
                                        className={`${scroll ? 'navLinksAfterScroll' : 'navLinks'}`}>
                                        Shop
                                    </Link>
                                </li>
                                <li className="col-3 mt-3">
                                    <Link
                                        to="/contact"
                                        style={{ color: location.pathname === "/" || location.pathname == "/contact" || location.pathname === "/login" || location.pathname === "/signup" ? "white" : "black" }}
                                        className={`${scroll ? 'navLinksAfterScroll' : 'navLinks'}`}>
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-xl-2 col-3 login d-flex justify-content-evenly">
                            <Link
                                to="/cart">
                                <i
                                    style={{ color: location.pathname === "/" || location.pathname == "/contact" || location.pathname === "/login" || location.pathname === "/signup" ? "white" : "black" }}
                                    className={`bi bi-cart3 cartIcon ${scroll ? 'cartIconAfterScroll' : ''}`}
                                />
                            </Link>
                            {displayLogoutBtn ?
                                (<Link>
                                    <button className="loginBtn btn btn-secondary" onClick={handleLogout}>Logout</button>
                                </Link>)
                                :
                                (<Link to="/login">
                                    <button className="loginBtn btn btn-primary">Login</button>
                                </Link>)
                            }
                        </div>
                    </div>
                }
            </div>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/item_details" element={<ItemDetails />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <ToastContainer />
        </>
    );
}
export default Navbar;

