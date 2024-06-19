import './css/ProductCard.css'

const ProductCard = ({ key, product, addToCart, isAuthenticated, setOpenModal }) => {


  return(
      <div className="prod-card">
        <img src="../public/images/no-img.jpg" className="card-img"/>
        <div className="card-content">
          <h2>{product.name}</h2>
          <p>{product.price}</p>
          <button className='btn' onClick={isAuthenticated ? () => addToCart(product) : () => setOpenModal(true)}>Add to Cart</button>
        </div>
      </div>
  )
}

export default ProductCard