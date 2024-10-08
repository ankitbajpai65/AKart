import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "react-use-cart";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import StarIcon from "@material-ui/icons/Star";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { ToastContainer, toast } from "react-toastify";
import "./ItemDetails.css";

export default function ItemDetails() {
  const location = useLocation();
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [img, setImg] = useState(location?.state?.val.images[0]);

  const increment = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleSelectImg = (url) => {
    setImg(url);
  };

  return (
    <>
      <div>
        <div className="container itemDetails">
          <div className="row h-100">
            <div className="col-md-5 col-10 offset-md-0 offset-1 imageSec">
              <div className="imageDiv">
                <div className="sideImgDiv">
                  <img
                    src={location.state?.val.category.image}
                    alt=""
                    className="sideImg"
                    onClick={(e) =>
                      handleSelectImg(location.state?.val.category.image)
                    }
                  />
                  <img
                    src={location.state?.val.images[1]}
                    alt=""
                    className="sideImg"
                    onClick={() =>
                      handleSelectImg(location.state?.val.images[1])
                    }
                  />
                  <img
                    src={location.state?.val.images[2]}
                    alt=""
                    className="sideImg"
                    onClick={() =>
                      handleSelectImg(location.state?.val.images[2])
                    }
                  />
                </div>
                <div className="mainImgDiv mb-5">
                  <img src={img} alt="" className="mainImg" />
                </div>
              </div>
              <div className="d-flex justify-content-center gap-4 mt-5 mb-md-0 mb-5">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    addItem(location.state?.val);
                    toast.success("Your item has been added to the cart!", {
                      position: "top-right",
                      theme: "dark",
                    });
                  }}
                >
                  <i class="bi bi-cart3"></i>
                  ADD TO CART
                </button>
                <button className="btn btn-primary">
                  <i class="bi bi-bag"></i>
                  BUY NOW
                </button>
              </div>
            </div>

            <div className="col-md-6 col-10 offset-1 infoDiv">
              <div className="">
                <p className="fw-semibold">{location.state?.val.title}</p>
                <span>
                  <h1 className="d-inline">₹ {location.state?.val.price}/- </h1>
                  <strike className="d-inline-block">
                    ₹{Math.round(location.state?.val.price * (1 + 20 / 100))}
                  </strike>
                  <span className="discount d-inline-block fw-semibold ms-4">
                    20% off
                  </span>
                </span>
                <span className="d-block mt-4 mb-3 rating">
                  {location.state?.val.category.id}
                  <StarIcon className="ms-1 mn-1 fs-4" />
                </span>
              </div>
              <div className="h-50">
                <span className="fs-2">About the item:</span>
                <div
                  className="d-flex flex-column justify-content-evenly"
                  id="aboutInfo"
                >
                  <span className="info">
                    <LabelImportantIcon className="labelIcon me-3" />
                    <span className="fs-3 fw-semibold">Size</span>

                    <select name="size" id="size" className="d-block mb-3">
                      <option>Select size</option>
                    </select>
                  </span>
                  <span className="info">
                    <LabelImportantIcon className="labelIcon me-3" />
                    <span className="fs-3 fw-semibold">Status : </span>
                    <span className="d-inline-block fs-3">In stock</span>
                  </span>
                  <span className="info d-block">
                    <LabelImportantIcon className="labelIcon me-3" />
                    <span className="fs-3 fw-semibold">Description : </span>
                    <span className="fs-3">
                      {location.state?.val.description}
                    </span>
                  </span>
                  <span className="info d-block">
                    <LabelImportantIcon className="labelIcon me-3" />
                    <span className="fs-3 fw-semibold">Qty : </span>
                    <span className="d-block mt-4 ms-3">
                      <RemoveIcon
                        onClick={decrement}
                        className="removeIcon me-3 fs-3"
                      />
                      <span className="figure">{quantity}</span>
                      <AddIcon
                        onClick={increment}
                        className="addIcon ms-3 fs-3"
                      />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
