import React, { useState, useEffect, useRef } from "react";
import HashLoader from "react-spinners/HashLoader";
import "./Shop.css";
import SearchIcon from "@material-ui/icons/Search";
import Item from "./Item";

const Shop = () => {
  const search = useRef();
  const [loading, setLoading] = useState(false);
  const [itemToDisplay, setItemToDisplay] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [heading, setHeading] = useState("All Products");
  const [input, setInput] = useState();
  const [selected, setSelected] = useState("Sort by:");
  const [sort, setSort] = useState([]);
  const [noFilteredItems, setNoFilteredItems] = useState(false);
  let data;

  useEffect(() => {
    setItemToDisplay(sort);
  }, [sort]);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.escuelajs.co/api/v1/products")
      // fetch('https://fakestoreapi.com/products')
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((res) => {
        data = res;
        // console.log(data);
        setItemToDisplay(data);
        setAllItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const populateAllProducts = (val) => {
    // console.log('all click', val);
    setItemToDisplay(val);
    setHeading("All Products");
    document.querySelector("input").value = "";
    setSelected("Sort by:");
  };

  const populateWomen = (val) => {
    const filterWomen = val.filter((i) => {
      return i.category.name === "Clothes";
    });
    // console.log(filterWomen);
    setItemToDisplay(filterWomen);
    setHeading("Women Products");
    document.querySelector("input").value = "";
    setSelected("Sort by:");
  };

  const populateShoes = (val) => {
    // console.log('shoes click', val);
    const filterShoes = val.filter((i) => {
      return i.category.name === "Shoes";
    });
    // console.log(filterShoes);
    setItemToDisplay(filterShoes);
    setHeading("Shoe Products");
    document.querySelector("input").value = "";
    setSelected("Sort by:");
  };

  const populateWatches = (val) => {
    const filterWatches = val.filter((i) => {
      return i.category.name === "Electronics";
    });
    // console.log(filterWatches);
    setItemToDisplay(filterWatches);
    setHeading("Watches");
    document.querySelector("input").value = "";
    setSelected("Sort by:");
  };

  const populateFurniture = (val) => {
    const filterFurniture = val.filter((i) => {
      return i.category.name === "Furniture";
    });
    // console.log(filterFurniture);
    setItemToDisplay(filterFurniture);
    setHeading("Furniture and Interior Products");
    setSelected("Sort by:");
    document.querySelector("input").value = "";
    let select = document.querySelector("select");
    // console.log(selected);
  };

  const inputEvent = (e) => {
    setInput(e.target.value);
  };
  const populateSearch = (e) => {
    if (e.key === "Enter") {
      const filteredItems = itemToDisplay.filter((val) => {
        return val.title.toLowerCase().includes(input.toLowerCase());
      });
      // console.log(filteredItems);
      setItemToDisplay(filteredItems);
      if (filteredItems.length == 0) setNoFilteredItems(true);
    }
  };

  const populateSearchOnClick = (e) => {
    const filteredItems = itemToDisplay.filter((val) =>
      val.title.toLowerCase().includes(input.toLowerCase())
    );
    setItemToDisplay(filteredItems);
    if (filteredItems.length == 0) setNoFilteredItems(true);
  };

  const sortFunc = (e) => {
    let elem = e.target.value;
    // console.log(elem)
    let sorted = itemToDisplay.sort((a, b) => {
      return a.price - b.price;
    });
    if (elem === "Price : Low to High") {
      setSort(sorted);
      setSelected("Price : Low to High");
    } else if (elem === "Price : High to Low") {
      setSort(sorted.reverse());
      setSelected("Price : High to Low");
    }
  };

  return (
    <>
      <div>
        <div id="shop_main_div">
          <h1 className="shop_heading display-5 fw-bold">{heading}</h1>
          <nav className="mb-5">
            <div className="col-12 shop_navbar_div">
              <ul className="row">
                <li className="col-2 col-md-1">
                  <button
                    to="/"
                    className="shop_navbar_links"
                    onClick={() => populateAllProducts(allItems)}
                  >
                    All
                  </button>
                </li>
                <li className="col-2 col-md-1">
                  <button to="/" className="shop_navbar_links">
                    Men
                  </button>
                </li>
                <li className="col-2 col-md-1">
                  <button
                    to="/"
                    className="shop_navbar_links"
                    onClick={() => populateWomen(allItems)}
                  >
                    Women
                  </button>
                </li>
                <li className="col-2 col-md-1">
                  <button
                    to="/"
                    className="shop_navbar_links"
                    onClick={() => populateShoes(allItems)}
                  >
                    Shoes
                  </button>
                </li>
                <li className="col-2 col-md-1">
                  <button
                    to="/"
                    className="shop_navbar_links"
                    onClick={() => populateWatches(allItems)}
                  >
                    Watches
                  </button>
                </li>
                <li className="col-2 col-md-1">
                  <button
                    to="/item_details"
                    className="shop_navbar_links"
                    onClick={() => populateFurniture(allItems)}
                  >
                    Furniture
                  </button>
                </li>
                <li className="offset-md-1 col-6 col-sm-5 col-5 col-md-3 mt-5 mt-md-0">
                  <span className="position-relative">
                    <input
                      type="text"
                      placeholder="Search"
                      className="searchBar"
                      onChange={inputEvent}
                      onKeyUp={populateSearch}
                    />
                    <SearchIcon
                      className="searchIcon"
                      onClick={populateSearchOnClick}
                      ref={search}
                    />
                  </span>
                </li>
                <li className="col-3 col-sm-2 col-2 col-md-1 mt-5 mt-md-0">
                  <select defaultValue={selected} onChange={sortFunc}>
                    <option value={selected} disabled hidden>
                      Sort by:
                    </option>
                    <option>Price : Low to High</option>
                    <option>Price : High to Low</option>
                  </select>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container-fluid">
            <div className="row item_container">
              {loading ? (
                <HashLoader
                  className="mt-5"
                  color={"#354BC1"}
                  loading={loading}
                  size={40}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : noFilteredItems == true ? (
                <h1 className="display-3 text-center mt-5 fw-semibold">
                  Search Not Found!
                </h1>
              ) : (
                itemToDisplay.map((val, index) => {
                  return (
                    <Item
                      title={val.title}
                      price={val.price}
                      image={val.images[0]}
                      val={val}
                      starId={val.category.id}
                      id={val.id}
                      key={index}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Shop;
