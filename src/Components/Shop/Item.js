import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import GradeIcon from "@material-ui/icons/Grade";
import { ToastContainer, toast } from "react-toastify";
import "./Shop.css";

const Item = (props) => {
  const { addItem } = useCart();
  let navigate = useNavigate();

  const [isAdded, setIsAdded] = useState(false);

  const viewDetailsBtnClicked = () => {
    navigate("/item_details", { state: props });
  };

  const addToCart = (ind, title) => {
    toast.success(`Your item is added to cart`, {
      position: "top-right",
      theme: "dark",
    });
  };

  return (
    <div className="item">
      {props.image ? (
        <img src={props.image} className="itemImg" alt="" />
      ) : (
        <div className="fallbackImg"></div>
      )}
      <div className="middle">
        <button
          className="viewDetailsBtn"
          data_image={props.image}
          onClick={viewDetailsBtnClicked}
        >
          View Details
        </button>
      </div>
      <div className="item_info">
        <div>
          <span>
            {props.title.length > 18
              ? `${props.title.slice(0, 18)}...`
              : props.title}
          </span>

          {!isAdded ? (
            <button
              onClick={() => {
                addItem(props.val);
                setIsAdded(true);
              }}
            >
              <i
                className="bi bi-cart cartIconinItem"
                onClick={() => addToCart(props.id, props.title)}
              ></i>
            </button>
          ) : (
            <button>
              <i className="bi bi-cart-check-fill text-red cartIconinItem"></i>
            </button>
          )}
        </div>
        <div>
          <span>{`Rs.${props.price}/-`}</span>
          <span className="product__rating">
            {Array(props.starId)
              .fill()
              .map((val, i) => (
                <GradeIcon className="starIcon mt-3" key={i} />
              ))}
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Item;
