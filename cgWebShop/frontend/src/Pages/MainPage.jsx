import React, { useEffect, useState, useContext } from "react";
import { Context } from "../App";
import ProductCard from "../Components/ProductCard";
import Modal from "../Components/Modal";


function MainPage(){
  const [openModal, setOpenModal] = useState(false)

  const { addToCart, products, filteredProducts, isAuthenticated } = useContext(Context)

  return(
    <>
      <div className="main-products">
        {filteredProducts && filteredProducts ?

        filteredProducts.map(p => {
          return(
            <ProductCard product={p} addToCart={addToCart} isAuthenticated={isAuthenticated} setOpenModal={setOpenModal}/>
          )
        })

        : products && products ?

        products.map(p => {
          return(
            <ProductCard product={p} addToCart={addToCart} isAuthenticated={isAuthenticated} setOpenModal={setOpenModal}/>
          )
        }) : 
        <div>No products available</div>}
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
          <p>Login to continue!</p>
        </Modal>
      </div>
    </>
  )
}

export default MainPage;