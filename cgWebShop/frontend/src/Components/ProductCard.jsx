import { useNavigate } from 'react-router-dom'
import './css/ProductCard.css'

const ProductCard = ({ key, product, addToCart, isAuthenticated, setOpenModal }) => {
  const navigate = useNavigate();

  function nameConverter(name){
    return name.replace(/ /g, '-')
  }

  return(
      <div className="prod-card">
        <img src={ product.img ? product.img : "../public/images/no-img.jpg"} className="card-img"/>
        <div className="card-content">
          <h2 className='prod-name' onClick={() => navigate(`/products/${nameConverter(product.name)}`)}>{product.name}</h2>
          <p>{product.price}</p>
          <button className='btn' onClick={isAuthenticated ? () => addToCart(product) : () => setOpenModal(true)}>Add to Cart</button>
        </div>
      </div>
  )
}

export default ProductCard