import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CartItem from '../Components/CartItem';
import './css/Account.css'

const Account = ({ user, setIsAuthenticated, setIsAdmin, isAdmin, cartArray }) => {
  const[show, setShow] = useState(null);
  const navigate = useNavigate();

  console.log(isAdmin);
  console.log(cartArray);
 
  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    setIsAdmin(false)
    navigate('/')

  }

  return (
    <>
    <div className='acc-container'>
      <div className='acc-options'>
        <div className='acc-h2-bg'>
          <h2>{user.first + (user.middle ? " " + user.middle + " " : " ") + user.last}</h2>
        </div>
        <button onClick={() => setShow("cart")}>Cart</button>
        <button onClick={() => setShow("details")}>Details</button>
        <button>Orders</button>
        { isAdmin ? <button>Admin page</button> : <></>}
        <button onClick={logout}>Logout</button>
      </div>
        { show == "cart" ?
        <div className='acc-cart-items'>
          {cartArray.length == 0 ? 
          <p>No products in the cart</p> 
          :
          cartArray.map(item => {
            return (<CartItem item={item}/>)
          })}
        </div> 
        : 
        show == "details" ? (
          <div className="acc-page">
          <div className="acc-info">
            <div className="acc-detail">
              <label>Email:</label>
              <p className='acc-value'>{user.email}</p>
            </div>
            <div className="acc-detail">
              <label>Full name:</label>
              <p className='acc-value'>{user.first + (user.middle ? " " + user.middle + " " : " ") + user.last}</p>
            </div>
            <div className="acc-detail">
              <label>Username:</label>
              <p className='acc-value'>{user.username}</p>
            </div>
            <div className="acc-detail">
              <label>Phone:</label>
              <p className='acc-value'>{user.phone}</p>
            </div>
            <button className='btn'>Edit</button>
          </div>
          <div className='acc-edit'>

          </div>
        </div>
        ):
        <></>
        }
        
      </div>
    </> 
  )
}


export default Account