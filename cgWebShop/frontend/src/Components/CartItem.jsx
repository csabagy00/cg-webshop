import './css/CartItem.css'

const CartItem = ({item}) => {


  return (
    <div className='item-details'>
      <p>{item.name}</p>
      <p>Price: {item.price}€</p>
    </div>
  )
}

export default CartItem