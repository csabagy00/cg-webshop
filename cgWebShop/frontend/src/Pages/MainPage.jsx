import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import Header from "../Components/Header";


function MainPage({ products, filteredProducts, setProducts, searchValue }){

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
  }, [])





  return(
    <>
      <div className="main-products">
        {filteredProducts && filteredProducts ?

        filteredProducts.map(p => {
          return(
            <ProductCard product={p}/>
          )
        })

        : products && products ?

        products.map(p => {
          return(
            <ProductCard product={p}/>
          )
        }) : 
        <div>No products available</div>}
      </div>
    </>
  )
}

export default MainPage;