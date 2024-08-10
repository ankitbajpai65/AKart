import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Shop from "../Shop/Shop";
import "./Home.css";

const dataSlider = [
  {
    id: 1,
    title: "Jackets & Coats",
    subtitle: "Quality Matters",
  },
  {
    id: 2,
    title: "Find The Best Outfit",
    subtitle: "With 30% Off",
  },
  {
    id: 3,
    title: "The Best Shoes",
    subtitle: "Comfort For your long day",
  },
  {
    id: 4,
    title: "Next Season Is here",
    subtitle: "Enjoy your summer with us",
  },
];

const Home = () => {
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    setSlideIndex(slideIndex !== dataSlider.length ? slideIndex + 1 : 1);
  };

  const prevSlide = () => {
    setSlideIndex(slideIndex !== 1 ? slideIndex - 1 : dataSlider.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000);
    return () => clearInterval(slideInterval);
  }, [slideIndex]);

  return (
    <>
      <div className="container-slider homeDiv">
        {dataSlider.map((obj, index) => {
          return (
            <div
              key={obj.id}
              className={
                slideIndex === index + 1 ? "row slide active-anim" : "row slide"
              }
            >
              <div className="col-6 offset-1">
                <h1 className="title">{obj.title}</h1>
                <h1 className="subtitle">{obj.subtitle}</h1>
                <Link to="/shop" className="homeBtn">
                  Shop now
                </Link>
              </div>
            </div>
          );
        })}
        <button onClick={prevSlide} className="btn-slide prev">
          <i className="bi bi-chevron-left"></i>
        </button>
        <button onClick={nextSlide} className="btn-slide next">
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      <div className="container-fluid sections">
        <div className="sections_subDiv">
          <div className="card_home men">
            <h1 className="card_heading">Men</h1>
            <Link to="/shop" className="shop_btn">
              Shop Now
            </Link>
          </div>
          <div className="card_home women">
            <h1 className="card_heading">Women</h1>
            <Link to="/shop" className="shop_btn">
              Shop Now
            </Link>
          </div>
          <div className="card_home accessories">
            <h1 className="card_heading">Accessories</h1>
            <Link to="/shop" className="shop_btn">
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <Shop />
    </>
  );
};
export default Home;
