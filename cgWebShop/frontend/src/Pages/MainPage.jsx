import React, { useEffect, useState, useContext } from "react";
import { Context } from "../App";
import ProductCard from "../Components/ProductCard";
import Modal from "../Components/Modal";
import './css/MainPage.css'


function MainPage(){
  const [openModal, setOpenModal] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(900);

  const { addToCart, products, filteredProducts, isAuthenticated } = useContext(Context)

  return(
    <div className="main">
      <div className="filter">
        <div className="range_container">
          <h4>Price Range</h4>
            <div className="sliders_control">
              <input id="fromSlider" type="range" value={minPrice} min="0" max="999" onChange={(e) => setMinPrice(e.target.value)}/>
              <input id="toSlider" type="range" value={maxPrice} min="0" max="999" onChange={(e) => setMaxPrice(e.target.value)}/>
            </div>
            <div className="form_control">
              <div className="form_control_container">
                <div className="form_control_container__time">Min</div>
                  <input className="form_control_container__time__input" type="number" id="fromInput" value={minPrice} min="0" max="1000" onChange={(e) => setMinPrice(e.target.value)}/>
              </div>
              <div className="form_control_container">
                <div className="form_control_container__time">Max</div>
                  <input className="form_control_container__time__input" type="number" id="toInput" value={maxPrice} min="0" max="1000" onChange={(e) => setMaxPrice(e.target.value)}/>
              </div>
            </div>
          </div>
        </div>
      <div className="main-products">
        {filteredProducts && filteredProducts ?

        filteredProducts.filter(p => p.price >= minPrice && p.price <= maxPrice).map(p => {
          return(
            <ProductCard product={p} addToCart={addToCart} isAuthenticated={isAuthenticated} setOpenModal={setOpenModal}/>
          )
        })

        : products && products ?

        products.filter(p => p.price >= minPrice && p.price <= maxPrice).map(p => {
          return(
            <ProductCard product={p} addToCart={addToCart} isAuthenticated={isAuthenticated} setOpenModal={setOpenModal}/>
          )
        }) : 
        <div>No products available</div>}
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
          <p>Login to continue!</p>
        </Modal>
      </div>
    </div>
  )
}

export default MainPage;