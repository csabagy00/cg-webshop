import { useContext } from 'react'
import { Context } from '../App'
import './css/CartItem.css'

const CartItem = ({ item, user, setCart }) => {

  const { setCartCounter } = useContext(Context)

  const removeFromCart = async () => {
    const response = await fetch(`/api/Cart?itemId=${item.id}`, {
      method: 'DELETE'
    })

    if(response.ok){
      const cartResp = await fetch(`/api/Cart?userId=${user.id}`)

      if(cartResp.ok){
        const result = await cartResp.json();

        setCart(result.cartItems)
        setCartCounter(result.cartItems.length)
      }
    }
  }

  return (
    <div className='item-details'>
      <p>{item.product.name}</p>
      <p>Price: {item.product.price}€</p>
      <button onClick={() => removeFromCart()}>Remove</button>
    </div>
  )
}

export default CartItem