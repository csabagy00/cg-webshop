import { useNavigate } from 'react-router-dom';
import './css/OrderConfirmation.css'
import { useContext } from 'react';
import { Context } from '../App';

const OrderConfirmation = ({ setCart, cart, address, city, country, postal, user }) => {
  const navigate = useNavigate();

  const { setCartCounter } = useContext(Context)

  const orderObj = {
    products: cart.map(c => c.product),
    date: new Date().toISOString(),
    address: address,
    city: city,
    country: country,
    postalCode: postal
  }

  let summary = 0;

  const postOrder = async () => {
    try {
      const response = await fetch('/api/Order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(orderObj)
      })

      if(response.ok){
        const result = await response.json();
        console.log(result);

        const removeResp = await fetch(`/api/Cart/Cart?userId=${result.appUser.id}`, {
          method: 'DELETE'
        })

        if(removeResp.ok){
          setCart([])
          setCartCounter(0)
          navigate("/")
        }

      } 

    } catch (error) {
      console.error(error)
    }
  };

  return(
    <div className='confirm-outer'>
      <div className="confirm-page">
        <div className="confirm-info">
          <h2>{user.first + (user.middle ? " " + user.middle + " " : " ") + user.last}</h2>
          <label>Email:</label>
          <p>{user.email}</p>
          <label>Phone:</label>
          <p>{user.phone}</p>
          <label>Address:</label>
          <p>{address}</p>
          <label>City:</label>
          <p>{city}</p>
          <label>Country:</label>
          <p>{country}</p>
          <label>Postal code:</label>
          <p>{postal}</p>
          <div className='field-post'>
            <input type='button' value='Confirm Order' onClick={() => postOrder()}/>
          </div>
        </div>
        <div className="confirm-table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart && cart.map((ci, i) => {
                summary += ci.product.price
              
                return (
                <tr key={ci.id}>
                  <td>{i + 1}</td>
                  <td>{ci.product.name}</td>
                  <td>{ci.product.category.name}</td>
                  <td>{ci.product.price}</td>
                </tr>)
              })}
              <tr>
                <td>Summary</td>
                <td></td>
                <td></td>
                <td>{summary}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation