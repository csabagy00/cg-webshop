import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Details from '../Components/Details';
import Cart from '../Components/Cart';
import './css/Account.css'
import Admin from '../Components/Admin';

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
        { isAdmin ? <button onClick={() => setShow("admin")}>Admin page</button> : <></>}
        <button onClick={logout}>Logout</button>
      </div>
        { show == "cart" ?
          <Cart cartArray={cartArray} navigate={navigate}/>
        : 
        show == "details" ? 
          <Details user={user}/>
        :
        show == "admin" ? 
          <Admin /> 
        :
        <></>
        }
        
      </div>
    </> 
  )
}


export default Account