import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useCart } from "react-use-cart";
import Home from "../Home/Home";
import Shop from "../Shop/Shop";
import Contact from "../Contact/Contact";
import Cart from "../Cart/Cart";
import ItemDetails from "../ItemDetails/ItemDetails";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Error from "../Error/Error";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import MenuIcon from "@material-ui/icons/Menu";

const Navbar = () => {
  const [mobileView, setMobileView] = useState(false);
  const [hamburgerClick, setHamburgerClick] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [displayLogoutBtn, setDisplayLogoutBtn] = useState(false);

  const location = useLocation();
  const { totalUniqueItems } = useCart();

  const scrolling = () => {
    window.scrollY >= 2 ? setScroll(true) : setScroll(false);
  };

  window.addEventListener("scroll", scrolling);

  useEffect(() => {
    if (window.innerWidth <= 769) setMobileView(true);
  }, [mobileView]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // console.log(user);
      if (user) setDisplayLogoutBtn(true);
      else setDisplayLogoutBtn(false);
    });
  });

  const handleLogout = () => {
    // console.log('logout');
    signOut(auth)
      .then(() => {
        toast.success("Your have been successfully logged out!", {
          position: "top-center",
          theme: "dark",
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleHamburgerClick = () => {
    setHamburgerClick(!hamburgerClick);
  };

  const disableHamburger = () => {
    setHamburgerClick(!hamburgerClick);
  };

  return (
    <>
      <div
        className={`container-fluid main_nav_div p-3 ps-3 pe-3 text-white ${
          scroll ? "active" : ""
        } ${hamburgerClick ? "showMobNav navAnim" : ""}`}
      >
        {mobileView ? (
          <div className="row d-flex justify-content-between align-items-center">
            <div className="col-1">
              <Link>
                <MenuIcon
                  onClick={handleHamburgerClick}
                  className={`hamburger ${
                    hamburgerClick || scroll ? "changeHamburgerStyle" : ""
                  }`}
                  style={{
                    color:
                      location.pathname === "/" ||
                      location.pathname == "/contact" ||
                      location.pathname === "/login" ||
                      location.pathname === "/signup"
                        ? "white"
                        : "black",
                  }}
                />
              </Link>
            </div>
            <div className="items_in_cart_div col-5 login d-flex justify-content-evenly">
              <Link to="/cart">
                <i
                  className={`bi bi-cart3 cartIcon ${
                    scroll || hamburgerClick
                      ? "cartIconAfterScrollOrHamburgerClick"
                      : ""
                  }`}
                  style={{
                    color:
                      location.pathname === "/" ||
                      location.pathname === "/contact" ||
                      location.pathname === "/login" ||
                      location.pathname === "/signup"
                        ? "white"
                        : "black",
                  }}
                />
              </Link>
              {totalUniqueItems > 0 && (
                <span className="items_in_cart bg-red text-white">
                  {totalUniqueItems}
                </span>
              )}
              {displayLogoutBtn ? (
                <Link>
                  <button
                    className="loginBtn btn btn-secondary"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="loginBtn btn btn-primary offset-1">
                    Login
                  </button>
                </Link>
              )}
            </div>
            {hamburgerClick && (
              <div className="linkDiv mobileNav">
                <ul className="row h-100">
                  <li className="col-2 offset-5 mt-5">
                    <Link
                      to="/"
                      className="navLinks text-dark"
                      onClick={disableHamburger}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="col-2 offset-5 mt-5">
                    <Link
                      to="/shop"
                      className="navLinks text-dark"
                      onClick={disableHamburger}
                    >
                      Shop
                    </Link>
                  </li>
                  <li className="col-2 offset-5 mt-5">
                    <Link
                      to="/contact"
                      className="navLinks text-dark"
                      onClick={disableHamburger}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="row d-flex justify-content-between align-items-center">
            <div className="col-2 offset-1 name">
              <Link
                to="/"
                style={{
                  color:
                    location.pathname === "/" ||
                    location.pathname === "/contact" ||
                    location.pathname === "/login" ||
                    location.pathname === "/signup"
                      ? "white"
                      : "black",
                }}
                className={`logo ${scroll ? "logoAfterScroll" : ""}`}
              >
                AKart
              </Link>
            </div>
            <div className="col-5 offset-1 linkDiv">
              <ul className="row">
                <li className="col-3 mt-3">
                  <Link
                    to="/"
                    style={{
                      color:
                        location.pathname === "/" ||
                        location.pathname === "/contact" ||
                        location.pathname === "/login" ||
                        location.pathname === "/signup"
                          ? "white"
                          : "black",
                    }}
                    className={`${scroll ? "navLinksAfterScroll" : "navLinks"}`}
                  >
                    Home
                  </Link>
                </li>
                <li className="col-3 mt-3">
                  <Link
                    style={{
                      color:
                        location.pathname === "/" ||
                        location.pathname === "/contact" ||
                        location.pathname === "/login" ||
                        location.pathname === "/signup"
                          ? "white"
                          : "black",
                    }}
                    to="/shop"
                    className={`${scroll ? "navLinksAfterScroll" : "navLinks"}`}
                  >
                    Shop
                  </Link>
                </li>
                <li className="col-3 mt-3">
                  <Link
                    to="/contact"
                    style={{
                      color:
                        location.pathname === "/" ||
                        location.pathname === "/contact" ||
                        location.pathname === "/login" ||
                        location.pathname === "/signup"
                          ? "white"
                          : "black",
                    }}
                    className={`${scroll ? "navLinksAfterScroll" : "navLinks"}`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-xl-2 col-3 login d-flex justify-content-evenly items_in_cart_div">
              <Link to="/cart">
                <i
                  style={{
                    color:
                      location.pathname === "/" ||
                      location.pathname === "/contact" ||
                      location.pathname === "/login" ||
                      location.pathname === "/signup"
                        ? "white"
                        : "black",
                  }}
                  className={`bi bi-cart3 cartIcon ${
                    scroll ? "cartIconAfterScrollOrHamburgerClick" : ""
                  }`}
                />
                {totalUniqueItems > 0 && (
                  <span className="items_in_cart bg-red text-white">
                    {totalUniqueItems}
                  </span>
                )}
              </Link>

              {displayLogoutBtn ? (
                <Link>
                  <button
                    className="loginBtn btn btn-secondary"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="loginBtn btn btn-primary">Login</button>
                </Link>
              )}
            </div>
          </div>
        )}
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
};
export default Navbar;
