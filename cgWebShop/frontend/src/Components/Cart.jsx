import CartItem from '../Components/CartItem';

const Cart = ({ cart, navigate }) => {
  return(
    <div className='acc-cart-items'>
        {cart.length == 0 ? 
          <p>No products in the cart</p> 
        :
          cart.map(item => {
            return (<CartItem item={item}/>)
          })
        }
        {cart.length == 0 ? 
          <></>
        :
          <div className='field-post-cart'>
            <input type='button' onClick={() => navigate('/order')} value="Proceed to order"/>
          </div>
        }
    </div> 
  )
}

export default Cart