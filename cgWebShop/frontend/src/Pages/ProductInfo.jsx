import { useState } from "react";
import { useParams } from "react-router-dom"
import './css/ProductInfo.css'
import ImagePopup from "../Components/ImagePopup";
import SmallProductCard from "../Components/SmallProductCard";
import Modal from "../Components/Modal";

const ProductInfo = ({ products, addToCart, isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)

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

  const filtered = products.filter(p => p.category.name === product.category.name && p.name !== product.name);

  return(
    <>
      <div className="product-info">
        <div className="product-inner">
          <div className="product-img" onClick={() => setIsOpen(true)}>
            <img src={ product.img ? product.img : "../public/images/no-img.jpg"} className="product-img"/>
          </div>
          <div className="product-detail">
            <div>
              <h3 className="product-p">{product.name}</h3>
              <p className="product-p">{product.category.name}</p>
              <p className="product-p">{product.price} €</p>
            </div>
            <div className="field-post-cart">
              <input type="button" value="Add to Cart" onClick={isAuthenticated ? () => addToCart(product) : () => setOpenModal(true)}/>
            </div>
          </div>
        </div>
        <ImagePopup src={product.img ? product.img : "../public/images/no-img.jpg"} isOpen={isOpen} onClose={() => setIsOpen(false)}/>
      </div>
      <h4>Products in the same category</h4>
      <div className="similar">    
        { filtered.length > 0 ? 
          filtered.map(fp => {
          console.log(fp);
          return(
            <SmallProductCard product={fp}/>
          )
        }) :
        <h3>No more product in this category</h3>
        }
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <h3>Please log in to continue</h3>
      </Modal>
    </>
  )
}

export default ProductInfo