import React from 'react';
import { useNavigate } from "react-router-dom";
import { useCart } from 'react-use-cart';
import './css/Shop.css';
import GradeIcon from '@material-ui/icons/Grade';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ToastContainer, toast } from 'react-toastify';

const Item = (props) => {
    // console.log(props);
    const { addItem } = useCart();
    let navigate = useNavigate();
    const viewDetailsBtnClicked = () => {
        navigate('/item_details', { state: props });
    }
    const addToCart = (ind, title) => {
        toast.success(`${title} is added to cart`, {
            position: "top-right",
            theme: "dark"
        });
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
                                .map((val, i) => <GradeIcon className="starIcon mt-3" key={i} />)
                            }
                        </span>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default Item;