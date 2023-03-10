import React, { useState, useEffect } from 'react';
import HashLoader from "react-spinners/HashLoader";
import './css/Shop.css';
import Item from './Item';

const Shop = () => {
    const [loading, setLoading] = useState(false);
    const [itemToDisplay, setItemToDisplay] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [heading, setHeading] = useState("All Products")
    let data;
    useEffect(() => {
        setLoading(true);
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(response => {
                // console.log(response);
                return response.json();
            }).then(res => {
                data = res;
                // console.log(data);
                setItemToDisplay(data);
                setAllItems(data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }, []);

    const populateAllProducts = (val) => {
        // console.log('all click', val);
        setItemToDisplay(val);
        setHeading("All Products");
    }
    const populateWomen = (val) => {
        const filterWomen = val.filter((i) => {
            return i.category.name === 'Clothes';
        })
        // console.log(filterWomen);
        setItemToDisplay(filterWomen);
        setHeading("Women Products");
    }
    const populateShoes = (val) => {
        // console.log('shoes click', val);
        const filterShoes = val.filter((i) => {
            return i.category.name === 'Shoes';
        })
        // console.log(filterShoes);
        setItemToDisplay(filterShoes);
        setHeading("Shoe Products");
    }
    const populateWatches = (val) => {
        const filterWatches = val.filter((i) => {
            return i.category.name === 'Electronics';
        })
        // console.log(filterWatches);
        setItemToDisplay(filterWatches);
        setHeading("Watches");
    }
    const populateFurniture = (val) => {
        const filterFurniture = val.filter((i) => {
            return i.category.name === 'Furniture';
        })
        // console.log(filterFurniture);
        setItemToDisplay(filterFurniture);
        setHeading("Furniture and Interior Products");
    }
    return (
        <>
            <div>
                <div id="shop_main_div">
                    <h1 className="shop_heading display-5 fw-bold">{heading}</h1>
                    <nav className="container mb-5">
                        <div className="col-md-6 shop_navbar_div">
                            <ul className="row">
                                <li className="col-2">
                                    <button to="/" className="shop_navbar_links" onClick={() => populateAllProducts(allItems)}>All</button>
                                </li>
                                <li className="col-2">
                                    <button to="/" className="shop_navbar_links">Men</button>
                                </li>
                                <li className="col-2">
                                    <button to="/" className="shop_navbar_links" onClick={() => populateWomen(allItems)}>Women</button>
                                </li>
                                <li className="col-2">
                                    <button to="/" className="shop_navbar_links" onClick={() => populateShoes(allItems)}>Shoes</button>
                                </li>
                                <li className="col-2">
                                    <button to="/" className="shop_navbar_links" onClick={() => populateWatches(allItems)}>Watches</button>
                                </li>
                                <li className="col-2">
                                    <button to="/item_details" className="shop_navbar_links" onClick={() => populateFurniture(allItems)}>Furniture</button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="container-fluid">
                        <div className="row item_container">
                            {
                                loading ?
                                    <HashLoader
                                        className="mt-5"
                                        color={'#354BC1'}
                                        loading={loading}
                                        size={40}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                    :
                                    itemToDisplay.map((val, index) => {
                                        /* { console.log(val.images[0]); } */
                                        return <Item title={val.title} price={val.price} image={val.images[0]} val={val} starId={val.category.id} id={val.id} key={index} />
                                    })

                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Shop;