import React, { useState, useEffect } from 'react';
import './css/Home.css';
import { useNavigate } from 'react-router-dom';
import men from '../images/men9.jpg';
import women from '../images/woman9.jpg';
import women2 from '../images/woman8.jpeg';
import shoe from '../images/shoe3.png';
import { Link } from 'react-router-dom';
import Home_card from './Home_card';
import Shop from './Shop.js';

const dataSlider = [
    {
        id: 1,
        title: 'Jackets & Coats',
        subtitle: 'Quality Matters.',
        image: men
    },
    {
        id: 2,
        title: 'Find The Best Outfit',
        subtitle: 'With 30% Off',
        image: women
    },
    {
        id: 3,
        title: 'The Best Shoes',
        subtitle: 'Comfort For your long day',
        image: shoe
    },
    {
        id: 4,
        title: 'Next Season Is here',
        subtitle: 'Enjoy your summer with us.',
        image: women2
    }
];
const Home = () => {
    const [slideIndex, setSlideIndex] = useState(1);
    const [auto, setauto] = useState(true);

    const nextSlide = () => {
        if (slideIndex !== dataSlider.length)
            setSlideIndex(slideIndex + 1);
        else if (slideIndex === dataSlider.length)
            setSlideIndex(1);
    }
    const prevSlide = () => {
        if (slideIndex !== 1)
            setSlideIndex(slideIndex - 1);
        else if (slideIndex === 1)
            setSlideIndex(dataSlider.length);
    }
    const enableHover = () => {
        console.log('hover');
        let btn = document.querySelector('.homeBtn');
        for (let i in btn.length) {
            i.style.color = 'white';
            i.style.background = 'transparent';
            i.style.border = '2px solid white';
        }
    }
    const disableHover = () => {
        console.log('hatao hover');
        let btn = document.querySelector('.homeBtn');
        for (let i in btn.length) {
            i.style.color = '';
            i.style.background = '';
            i.style.border = '';
        }
    }
    let slideinterval;
    useEffect(() => {
        setauto(true)
        if (auto) {
            slideinterval = setInterval(nextSlide, 3000);
        }
        return () => {
            setauto(false);
            clearInterval(slideinterval);
        }
    })
    return (
        <>
            <div className="container-slider homeDiv">
                {dataSlider.map((obj, index) => {
                    {/* console.log(obj); */ }
                    return (
                        <div key={obj.id} className={slideIndex === index + 1 ? "row slide active-anim" : "row slide"}>
                            <div className="col-6 offset-1">
                                <h1 className="title">{obj.title}</h1>
                                <h1 className="subtitle">{obj.subtitle}</h1>
                                {/* <button className="btn homeBtn" id="shopNowBtn">Shop now</button> */}
                                <Link to="/shop" className="homeBtn" onMouseEnter={enableHover} onMouseLeave={disableHover} style={{ zIndex: 1 }}>Shop now</Link>
                            </div>
                        </div>
                    )
                })}
                <button onClick={nextSlide} className="btn-slide prev">
                    <i class="bi bi-chevron-left"></i>
                </button>
                <button onClick={prevSlide} className="btn-slide next">
                    <i class="bi bi-chevron-right"></i>
                </button>
            </div>
            <div className="container-fluid sections">
                <div className="sections_subDiv">
                    <div className="card_home men">
                        <h1 className="card_heading">Men</h1>
                        <Link to="/shop" className="shop_btn">Shop Now</Link>
                    </div>
                    <div className="card_home women">
                        <h1 className="card_heading">Women</h1>
                        <Link to="/shop" className="shop_btn">Shop Now</Link>
                    </div>
                    <div className="card_home accessories">
                        <h1 className="card_heading">Accessories</h1>
                        <Link to="/shop" className="shop_btn">Shop Now</Link>
                    </div>
                </div>
            </div>
            <Shop />
        </>
    );
}
export default Home;