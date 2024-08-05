import React, { useEffect, useState, useContext } from "react";
import { Context } from "../App";
import ProductCard from "../Components/ProductCard";
import Modal from "../Components/Modal";


function MainPage(){
  const [openModal, setOpenModal] = useState(false)

  const { products, filteredProducts, setProducts, setCart, isAuthenticated, productsRefresh } = useContext(Context)
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/Products');
        const result = await response.json();
        setProducts(result);
        
      } catch (error) {
        console.error(error)
      }
    }

    fetchData();
  }, [productsRefresh])


  const addToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("user"))

    const response = await fetch(`/api/Cart/Item?userId=${user.id}&quantity=1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: product.id,
        category: {
          id: product.category.id,
          name: product.category.name,
          products: [
          ]
        },
        name: product.name,
        inStock: product.inStock,
        price: product.price,
        img: product.img
      })
    })

    if(response.ok){
      const cartResp = await fetch(`/api/Cart?userId=${user.id}`);

      if(cartResp.ok){
        const result = await cartResp.json();
        setCart(result.cartItems)
        
      };
    };
  }

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