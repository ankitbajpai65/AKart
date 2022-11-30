import React, { useState } from 'react';
import './css/Cart.css';
import { useCart } from 'react-use-cart';
import shirt from '../images/shirt.jpg';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';

const CartItem = (props) => {
    // console.warn(items);
    const { isEmpty, totalUniqueItems, items, totalItems, cartTotal, updateItemQuantity, removeItem,
        emptyCart } = useCart();
    // const [quantity, setQuantity] = useState(1);
    // const increment = () => {
    //     setQuantity(quantity + 1);
    // }
    // const decrement = () => {
    //     if (quantity > 1)
    //         setQuantity(quantity - 1);
    // }
    // console.log(props);
    return (
        <>
            <div className="col-3 cart_page_img cartInfo d-flex align-items-center">
                <img src={props.image} alt="" />
            </div>
            <div className="col-lg-5 col-4 cartInfo p-sm-5">
                <span className="d-block fs-3 mb-3">{props.title}</span>
                <span className="fw-bold">₹{props.price}/-</span>
            </div>
            <div className="col-lg-3 col-4 cartInfo p-sm-4">
                <span className="d-block mt-4 ms-3 mb-3">
                    <RemoveIcon onClick={() => { updateItemQuantity(props.id, props.quantity - 1) }} className="removeIcon me-3 fs-3" />
                    <span className="figure">{props.quantity}</span>
                    <AddIcon onClick={() => { updateItemQuantity(props.id, props.quantity + 1) }} className="addIcon ms-3 fs-3" />
                </span>
                <span className="fw-bold mt-2 ms-4">₹{props.price * props.quantity}/-</span>
            </div>
            <div className="col-1 cartInfo">
                <ClearIcon className="deleteIcon m-3" onClick={() => { removeItem(props.id) }} />
            </div>
        </>
    );
}

export default CartItem;
