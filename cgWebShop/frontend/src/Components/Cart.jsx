import CartItem from '../Components/CartItem';

const Cart = ({ cartArray, navigate }) => {
  return(
    <div className='acc-cart-items'>
        {cartArray.length == 0 ? 
          <p>No products in the cart</p> 
        :
          cartArray.map(item => {
            return (<CartItem item={item}/>)
          })
        }
      <div className='field-post'>
        <input type='button' onClick={() => navigate('/order')} value="Proceed to order"/>
      </div>
    </div> 
  )
}

export default Cart