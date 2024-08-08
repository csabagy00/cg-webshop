import { useState } from "react";
import { useParams } from "react-router-dom"
import './css/ProductInfo.css'
import ImagePopup from "../Components/ImagePopup";

const ProductInfo = ({ products, addToCart }) => {
  const [isOpen, setIsOpen] = useState(false)

  const { productName } = useParams();

  function nameConverter(name){
    return name.replace(/-/g, ' ')
  }

  const nameResult = nameConverter(productName)

  let product;
  
  for (const element of products) {
    console.log(element.name)
    if(element.name === nameResult){
      product = element
    }
  }

  return(
    <div className="product-info">
      <div className="product-inner">
        <div className="product-img" onClick={() => setIsOpen(true)}>
          <img src={ product.img ? product.img : "../public/images/no-img.jpg"} className="product-img"/>
        </div>
        <div className="product-detail">
          <h3 className="product-p">{product.name}</h3>
          <p className="product-p">{product.category.name}</p>
          <p className="product-p">{product.price} €</p>
        </div>
        <div className="field-post-cart">
          <input type="button" value="Add to Cart" onClick={() => addToCart(product)}/>
        </div>
      </div>
      <ImagePopup src={product.img ? product.img : "../public/images/no-img.jpg"} isOpen={isOpen} onClose={() => setIsOpen(false)}/>
    </div>
  )
}

export default ProductInfo