import { useState, useContext } from 'react';
import { Context } from '../App';
import { useNavigate } from 'react-router-dom';
import Details from '../Components/Details';
import Cart from '../Components/Cart';
import './css/Account.css';
import Admin from '../Components/Admin';
import Orders from './Orders';

const Account = () => {
  const [ordersRefresh, setOrdersRefresh] = useState(false)
  const navigate = useNavigate();

  const { setShowAcc, showAcc, user, setIsAuthenticated, setIsAdmin, isAdmin, cart, setCart} = useContext(Context);
 
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
        <button onClick={() => setShowAcc("cart")}>Cart</button>
        <button onClick={() => setShowAcc("details")}>Details</button>
        <button onClick={() => setShowAcc("orders")}>Orders</button>
        { isAdmin ? <button onClick={() => setShowAcc("admin")}>Admin page</button> : <></>}
        <button onClick={logout}>Logout</button>
      </div>
        { showAcc == "cart" ?
          <Cart cart={cart} navigate={navigate} setOrdersRefresh={setOrdersRefresh} user={user} setCart={setCart}/>
        : 
        showAcc == "details" ? 
          <Details user={user}/>
        :
        showAcc == "admin" ? 
          <Admin /> 
        :
        showAcc == "orders" ?
          <Orders user={user} />
        :
        <></>
      }
      </div>
    </> 
  )
}

export default Account