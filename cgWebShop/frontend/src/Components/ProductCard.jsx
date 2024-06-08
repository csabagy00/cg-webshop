import './css/ProductCard.css'

const ProductCard = ({ product }) => {

  return(
    <>
      <div className="prod-card">
        <img src="../public/images/no-img.jpg" className="card-img"/>
        <div className="card-content">
          <h2>{product.name}</h2>
          <p>{product.category.name}</p>
          <p>{product.price}</p>
        </div>
      </div>
    </>
  )
}

export default ProductCard