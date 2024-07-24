import './css/CartItem.css'

const CartItem = ({ item, user, setCart }) => {

  const removeFromCart = async () => {
    const response = await fetch(`/api/Cart?itemId=${item.id}`, {
      method: 'DELETE'
    })

    if(response.ok){
      const cartResp = await fetch(`/api/Cart?userId=${user.id}`)

      if(cartResp.ok){
        const result = await cartResp.json();
        console.log(result);

        setCart(result.cartItems)
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