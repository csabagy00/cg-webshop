import { useNavigate } from "react-router-dom"
import './css/SmallProductCard.css'

const SmallProductCard = ({ product }) => {
  const navigate = useNavigate();

  function nameConverter(name){
    return name.replace(/ /g, '-')
  }

  return (
    <div className='prod-card-s' onClick={() => navigate(`/products/${nameConverter(product.name)}`)} >
      <img className='prod-img-s' src={product.img ? product.img : "../public/images/no-img.jpg"}/>
      <div className='prod-name-s'>
        <h3>{product.name}</h3>
      </div>
    </div>
  )
}

export default SmallProductCard