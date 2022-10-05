import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import './css/Cart.css';
import shirt from '../images/shirt.jpg';
import CartItem from './CartItem.js';
import cart from '../images/cart2.jpeg';

const Cart = () => {
    let location = useLocation();
    const { isEmpty, totalUniqueItems, items, totalItems, cartTotal, updateItemQuantity, removeItem,
        emptyCart } = useCart();
    let navigate = useNavigate();
    const shopBtnClicked = () => {
        navigate('/shop');
    }

    return (
        <div className="cart container-fluid">
            <div className="row d-flex justify-content-center cartDiv">
                <div className={isEmpty ? "col-7 catalogue me-4 emptyCart" : "col-7 catalogue me-4"}>
                    {
                        (isEmpty) ? (
                            <div>
                                <img src={cart} alt="" />
                                <h1 className=" text-center">Your cart is empty</h1>
                                <button className="btn btn-primary" onClick={shopBtnClicked}>Shop Now</button>
                            </div>) :
                            items.map((item, index) => {
                                return (
                                    <div className="row singleItem">
                                        <CartItem id={item.id} image={item.images[0]} title={item.title} price={item.price} quantity={item.quantity} key={index} />
                                    </div>
                                )
                            })
                    }
                </div>
                <div className="col-3 totalPrice ms-4 d-flex flex-column justify-space-around">
                    <div className="row priceSec" id="head">
                        <span className="type col-6">PRICE DETAILS</span>
                    </div>
                    {/* <hr /> */}
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
            </div>
        </div>
    );
}

export default Cart;
