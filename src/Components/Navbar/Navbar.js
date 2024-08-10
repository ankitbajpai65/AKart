import React, { useState, useEffect, useCallback, useRef } from "react";
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
import "./Navbar.css";

const Navbar = () => {
  const navbarRef = useRef(null);
  const [mobileView, setMobileView] = useState(false);
  const [hamburgerClick, setHamburgerClick] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [displayLogoutBtn, setDisplayLogoutBtn] = useState(false);

  const location = useLocation();
  const { totalUniqueItems } = useCart();

  const condition = ["/", "/contact", "/login", "/signup"].includes(
    location.pathname
  );
  const navLinkColor = condition ? "white" : "black";
  const linkClassName =
    scroll || !condition ? "navLinksAfterScroll" : "navLinks";

  const handleScroll = useCallback(() => {
    setScroll(window.scrollY >= 2);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // useEffect(() => {
  //   const handleResize = () => setMobileView(window.innerWidth <= 769);
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    if (window.innerWidth <= 769) setMobileView(true);
    else setMobileView(false);
  }, []);

  useEffect(() => {
    const logout = auth.onAuthStateChanged((user) => {
      if (user) setDisplayLogoutBtn(true);
      else setDisplayLogoutBtn(false);
    });
    return () => logout();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setHamburgerClick(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
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
    setHamburgerClick((prev) => !prev);
  };

  const disableHamburger = () => {
    setHamburgerClick(!hamburgerClick);
  };

  return (
    <>
      <div
        ref={navbarRef}
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
                  style={{ color: navLinkColor }}
                />
              </Link>
            </div>
            <div className="col-5 login d-flex justify-content-evenly">
              <Link to="/cart">
                <span className="position-relative">
                  <i
                    className={`bi bi-cart3 cartIcon ${
                      scroll || hamburgerClick
                        ? "cartIconAfterScrollOrHamburgerClick"
                        : ""
                    }`}
                    style={{ color: navLinkColor }}
                  />
                  {totalUniqueItems > 0 && (
                    <span className="cartItem bg-red text-white">
                      {totalUniqueItems}
                    </span>
                  )}
                </span>
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
                  <button className="loginBtn btn btn-primary offset-1">
                    Login
                  </button>
                </Link>
              )}
            </div>
            {hamburgerClick && (
              <div className="linkDiv mobileNav">
                <ul className="h-100 flex flex-col">
                  <li className="mt-5 text-center">
                    <Link
                      to="/"
                      className="navLinks text-dark"
                      onClick={disableHamburger}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="mt-4 text-center">
                    <Link
                      to="/shop"
                      className="navLinks text-dark"
                      onClick={disableHamburger}
                    >
                      Shop
                    </Link>
                  </li>
                  <li className="mt-4 text-center">
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
          <div className="navbar row d-flex justify-content-between align-items-center">
            <div className="col-2 offset-1 name">
              {scroll || !condition ? (
                <img
                  src="/logo-no-background.svg"
                  alt="logo"
                  className="logo"
                />
              ) : (
                <img src="/logo.svg" alt="logo" className="logo" />
              )}
            </div>
            <div className="col-5 offset-1 linkDiv">
              <ul className="row">
                <li className="col-3 mt-3">
                  <Link
                    to="/"
                    style={{ color: navLinkColor }}
                    className={linkClassName}
                  >
                    Home
                  </Link>
                </li>
                <li className="col-3 mt-3">
                  <Link
                    style={{ color: navLinkColor }}
                    to="/shop"
                    className={linkClassName}
                  >
                    Shop
                  </Link>
                </li>
                <li className="col-3 mt-3">
                  <Link
                    to="/contact"
                    style={{ color: navLinkColor }}
                    className={linkClassName}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-xl-2 col-3 login d-flex justify-content-evenly">
              <Link to="/cart">
                <span className="position-relative">
                  <i
                    style={{ color: navLinkColor }}
                    className={`bi bi-cart3 cartIcon ${
                      scroll ? "cartIconAfterScrollOrHamburgerClick" : ""
                    }`}
                  />
                  {totalUniqueItems > 0 && (
                    <span className="cartItem bg-red text-white">
                      {totalUniqueItems}
                    </span>
                  )}
                </span>
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
