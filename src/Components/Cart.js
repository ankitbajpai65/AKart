import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import '../style/Cart.css';
import { auth } from './firebase';
import shirt from '../images/shirt.jpg';
import CartItem from './CartItem.js';
import cart from '../images/cart2.jpeg';

const Cart = () => {
    const [isLogin, setIsLogin] = useState(false)
    const { isEmpty, totalUniqueItems, items, cartTotal } = useCart();
    // console.log(items);
    let navigate = useNavigate();
    const shopBtnClicked = () => {
        navigate('/shop');
    }
    // const gotoItemDetails = (val) => {
    //     navigate('/item_details', { state: { val } });
    // }
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            // console.log(user);
            if (user) {
                setIsLogin(true);
            }
            else setIsLogin(false);
        })
    })
    return (
        <div className="cart container-fluid" style={{ minHeight: !isLogin && "70vh", background: "white" }}>
            {isLogin ?
                (<div className="row d-flex justify-content-center cartDiv">
                    <div className={isEmpty ? "col-md-7 col-11 catalogue emptyCart" : "col-md-7 col-11 catalogue"}>
                        {
                            (isEmpty) ? (
                                <div>
                                    <img src={cart} alt="" />
                                    <h1 className=" text-center">Your cart is empty</h1>
                                    <button className="btn btn-primary" onClick={shopBtnClicked}>Shop Now</button>
                                </div>) :
                                items.map((item, index) => {
                                    return (
                                        <>
                                            {/* {console.log(item)} */}
                                            <div className="row singleItem">
                                                <CartItem id={item.id} image={item.images[0]} title={item.title} price={item.price} quantity={item.quantity} key={index} item={item} />
                                            </div>

                                        </>
                                    )
                                })
                        }
                    </div>
                    <div className="col-md-3 col-11 totalPrice ms-md-4 d-flex flex-column justify-space-around">
                        <div className="row priceSec" id="head">
                            <span className="type col-6">PRICE DETAILS</span>
                        </div>
                        <div className="row priceSec">
                            <span className="type col-6">Price({totalUniqueItems} items)</span>
                            <span className="cost col-2 offset-3">₹{cartTotal}/-</span>
                        </div>
                        <div className="row priceSec">
                            <span className="type col-6">Taxes</span>
                            <span className="cost col-2 offset-3">-- --</span>
                        </div>
                        <div className="row priceSec">
                            <span className="type col-6">Delivery Charges</span>
                            <span className="cost col-2 offset-3 text-primary fw-semibold">FREE</span>
                        </div>
                        <div className="row priceSec">
                            <span className="type col-6 fw-bold">Total Amount</span>
                            <span className="cost col-2 offset-3 fw-bold">₹{cartTotal}/-</span>
                        </div>
                    </div>
                </div>) :
                (
                    <div className="warningDiv d-flex flex-column">
                        <span className="warning text-black mb-5">Please Login to see the cart</span>
                        <Link to="/login">
                            <button className="loginBtn btn btn-primary p-2">Login</button>
                        </Link>
                    </div>
                )
            }
        </div>
    );
}

export default Cart;
