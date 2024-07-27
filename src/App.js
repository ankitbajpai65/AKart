import React from "react";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "react-use-cart";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

const App = () => {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Footer />
      </CartProvider>
    </>
  );
};

export default App;
