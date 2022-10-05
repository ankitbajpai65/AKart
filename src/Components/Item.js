import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useCart } from 'react-use-cart';
import './css/Shop.css';
import GradeIcon from '@material-ui/icons/Grade';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ItemDetails from './ItemDetails';
import shirt from '../images/shirt.jpg';

const Item = (props) => {
    // console.log(props);
    const { addItem } = useCart();
    let navigate = useNavigate();
    const viewDetailsBtnClicked = () => {
        navigate('/item_details', { state: props });
    }
    const addToCart = (ind, title) => {
        alert(`${title} is added to cart`);
        // console.log('cart click');
        // if (array.id === ind) {
        //     document.getElementsByClassName('cartIconinItem').style.display = 'none';
        //     document.getElementsByClassName('cartIconFilled').style.display = 'block';
        // }
    }
    return (
        <>
            <div className="item">
                <img src={props.image} className="itemImg" alt="" />
                <div className="middle">
                    <button className="viewDetailsBtn" data_image={props.image} onClick={viewDetailsBtnClicked}>View Details </button>
                </div>
                <div className="item_info">
                    <div>
                        <span>{props.title}</span>
                        <button onClick={() => { addItem(props.val) }}>
                            <i className="bi bi-cart3 cartIconinItem" onClick={() => addToCart(props.id, props.title)} ></i>
                            {/* <ShoppingCartIcon className="cartIconFilled" /> */}
                        </button>
                    </div>
                    <div>
                        <span>{`Rs.${props.price}/-`}</span>
                        <span className='product__rating'>
                            {Array(props.starId)
                                .fill()
                                .map((_, i) => <GradeIcon className="starIcon mt-3" key={i} />)
                            }
                        </span>
                        {/* <GradeIcon className="starIcon mt-3" />
                        <GradeIcon className="starIcon mt-3" />
                        <GradeIcon className="starIcon mt-3" /> */}
                        {/* {
                            for(let i=0;i<props.starId ; i++)
                              return (<GradeIcon />)
                        } */}
                        {/* <i className="bi bi-cart3 cartIcon"></i> */}
                    </div>
                </div>
            </div>
            {/* <Routes>
                <Route path="/item_details" element={<ItemDetails />} />
            </Routes> */}
        </>
        // <>
        //     {item.map((val) => {
        //         console.log(val);
        //         return (
        //             <>
        //                 <div className="item">
        //                     <img src={shirt} alt="" />
        //                     <div>
        //                         <span>Cotton T-shirt</span>
        //                         <i className="bi bi-cart3 cartIconinItem"></i>
        //                     </div>
        //                     <div>
        //                         <span>Rs.500/-</span>
        //                         {/* <i className="bi bi-cart3 cartIcon"></i> */}
        //                     </div>
        //                 </div>
        //             </>
        //         );
        //     })}
        // </>
    )
}

export default Item;