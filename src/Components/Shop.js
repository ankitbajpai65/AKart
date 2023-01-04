import React, { useState, useEffect } from 'react';
import HashLoader from "react-spinners/HashLoader";
import './css/Shop.css';
import Item from './Item';

const Shop = () => {
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState([]);
    const [itemToDisplay, setItemToDisplay] = useState([]);
    const [heading, setHeading] = useState("All Products")
    let data;
    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(response => {
                // console.log(response);
                setLoading(true);
                return response.json();
            }).then(res => {
                data = res;
                // console.log(data);
                setItem(data);
                setItemToDisplay(data);
                setLoading(false);
                // console.log(item);
                // console.log(itemToDisplay);

            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }, []);
    // useEffect(() => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 2000);
    // }, [item])

    const populateAllProducts = (val) => {
        // console.log('all click', val);
        let head = "All Products"
        setItem(val);
        setHeading(head);
    }
    const populateWomen = (val) => {
        const filterWomen = val.filter((i) => {
            return i.category.name === 'Clothes';
        })
        // console.log(filterShoes);
        setItem(filterWomen);
        let head = "Women Products"
        setHeading(head);
    }
    const populateShoes = (val) => {
        // console.log('shoes clcik', val);
        const filterShoes = val.filter((i) => {
            return i.category.name === 'Shoes';
        })
        // console.log(filterShoes);
        setItem(filterShoes);
        let head = "Shoe Products"
        setHeading(head);
    }
    const populateWatches = (val) => {
        const filterWatches = val.filter((i) => {
            return i.category.name === 'Electronics';
        })
        // console.log(filterShoes);
        setItem(filterWatches);
        let head = "Watches";
        setHeading(head);
    }
    const populateFurniture = (val) => {
        const filterFurniture = val.filter((i) => {
            return i.category.name === 'Furniture';
        })
        // console.log(filterShoes);
        setItem(filterFurniture);
        let head = "Furniture and Interior Products"
        setHeading(head);
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
                                    <button to="/" className="shop_navbar_links" onClick={() => populateAllProducts(itemToDisplay)}>All</button>
                                </li>
                                <li className="col-2">
                                    <button to="/" className="shop_navbar_links">Men</button>
                                </li>
                                <li className="col-2">
                                    <button to="/" className="shop_navbar_links" onClick={() => populateWomen(itemToDisplay)}>Women</button>
                                </li>
                                <li className="col-2">
                                    <button to="/" className="shop_navbar_links" onClick={() => populateShoes(itemToDisplay)}>Shoes</button>
                                </li>
                                <li className="col-2">
                                    <button to="/" className="shop_navbar_links" onClick={() => populateWatches(itemToDisplay)}>Watches</button>
                                </li>
                                <li className="col-2">
                                    <button to="/item_details" className="shop_navbar_links" onClick={() => populateFurniture(itemToDisplay)}>Furniture</button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="container-fluid">
                        <div className="row item_container">
                            {
                                loading ?
                                    <HashLoader
                                        color={'#354BC1'}
                                        loading={loading}
                                        // cssOverride={override}
                                        size={40}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                    :
                                    item.map((val, index) => {
                                        {/* console.log(val.images[0]); */ }
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