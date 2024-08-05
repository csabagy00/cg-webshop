import { useState, useContext } from 'react';
import { Context } from '../App';
import { useNavigate } from 'react-router-dom';
import Details from '../Components/Details';
import Cart from '../Components/Cart';
import './css/Account.css';
import Admin from '../Components/Admin';
import Orders from './Orders';

const Account = () => {
  const [show, setShow] = useState(null);
  const [ordersRefresh, setOrdersRefresh] = useState(false)
  const navigate = useNavigate();

  const { user, setIsAuthenticated, setIsAdmin, isAdmin, cart, setCart} = useContext(Context);
 
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
          <h2 id='acc-fullname'>{user.first + (user.middle ? " " + user.middle + " " : " ") + user.last}</h2>
        </div>
        <button onClick={() => setShow("cart")}>Cart</button>
        <button onClick={() => setShow("details")}>Details</button>
        <button onClick={() => setShow("orders")}>Orders</button>
        { isAdmin ? <button onClick={() => setShow("admin")}>Admin page</button> : <></>}
        <button onClick={logout}>Logout</button>
      </div>
        { show == "cart" ?
          <Cart cart={cart} navigate={navigate} setOrdersRefresh={setOrdersRefresh} user={user} setCart={setCart}/>
        : 
        show == "details" ? 
          <Details user={user}/>
        :
        show == "admin" ? 
          <Admin /> 
        :
        show == "orders" ?
          <Orders user={user} />
        :
        <></>
      }
      </div>
    </> 
  )
}

export default Account