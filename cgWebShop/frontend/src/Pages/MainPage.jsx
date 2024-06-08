import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import Header from "../Components/Header";


function MainPage(){
  const [products, setProducts] = useState();

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
        {products && products.map(p => {
          return(
            <ProductCard product={p}/>
          )
        })}
      </div>
    </>
  )
}

export default MainPage;