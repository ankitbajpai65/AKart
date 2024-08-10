import React, { useState, useEffect, useRef } from "react";
import HashLoader from "react-spinners/HashLoader";
import SearchIcon from "@material-ui/icons/Search";
import Item from "./Item";
import "./Shop.css";

const Shop = () => {
  const search = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [heading, setHeading] = useState("All Products");
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState("Sort by:");

  useEffect(() => {
    fetchAllItems();
  }, []);

  async function fetchAllItems() {
    setLoading(true);
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      const res = await response.json();

      console.log(res);
      setFilteredItems(res);
      setAllItems(res);

      const categories = new Set();
      for (let i of res) {
        categories.add(i.category.name);
      }
      setCategories([...categories]);
    } catch (err) {
      console.log("Error fetching items:", err);
      setError("Failed to fetch items. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const populateAllProducts = () => {
    setFilteredItems(allItems);
    setHeading("All Products");
    setInput("");
    setSelected("Sort by:");
  };

  function handleFilter(category) {
    const filteredItems = allItems.filter(
      (item) => item.category.name === category
    );
    console.log(filteredItems);

    setFilteredItems(filteredItems);
    setHeading(category);
    setInput("");
    setSelected("Sort by:");
  }

  const handleSearch = (e) => {
    if (e.type === "click" || (e.type === "keyup" && e.key === "Enter")) {
      console.log("line 73");
      const searchedItems = filteredItems.filter((val) =>
        val.title.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredItems(searchedItems);
    }
  };

  const handleSort = (e) => {
    const elem = e.target.value;
    let sorted = [...filteredItems].sort((a, b) => a.price - b.price);
    if (elem === "Price : High to Low") {
      sorted.reverse();
    }
    setFilteredItems(sorted);
    setSelected(elem);
  };

  return (
    <div id="shop_main_div">
      <h1 className="shop_heading display-5 fw-bold">{heading}</h1>
      <nav className="mb-5">
        <div className="shopNavbar d-flex align-items-center gap-5 justify-content-between flex-wrap ">
          <ul className="shopNav mb-0">
            <li className="">
              <button
                to="/"
                className={`shop_navbar_links`}
                onClick={() => populateAllProducts(allItems)}
              >
                All
              </button>
            </li>
            {categories.map((category, index) => (
              <li key={index}>
                <button
                  onClick={() => handleFilter(category)}
                  className="shop_navbar_links"
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>

          <div className="filterDiv">
            <div className="">
              <span className="position-relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="searchBar"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyUp={handleSearch}
                />
                <SearchIcon
                  className="searchIcon"
                  onClick={handleSearch}
                  ref={search}
                />
              </span>
            </div>

            <select value={selected} onChange={handleSort}>
              <option disabled hidden>
                Sort by:
              </option>
              <option>Price : Low to High</option>
              <option>Price : High to Low</option>
            </select>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="loaderDiv d-flex align-items-center justify-content-center">
          {loading ? (
            <HashLoader
              className="hashLoader"
              color={"#354BC1"}
              loading={loading}
              size={40}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : error ? (
            <h2 className="text-center fw-semibold">{error}</h2>
          ) : filteredItems.length === 0 ? (
            <h2 className="text-center fw-semibold">No items found!</h2>
          ) : (
            <div className="row item_container">
              {filteredItems.map((val, index) => {
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
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Shop;
