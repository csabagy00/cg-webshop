import './css/CartItem.css'

const CartItem = ({item}) => {


  return (
    <div className='item-details'>
      <p>{item.product.name}</p>
      <p>Price: {item.product.price}€</p>
    </div>
  )
}

export default CartItem