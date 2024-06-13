import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './css/Account.css'

const Account = ({ user, setIsAuthenticated }) => {
  const[show, setShow] = useState(null);
  const navigate = useNavigate();
 
  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    navigate('/')

  }

  return (
    <>
    <div className='acc-container'>
      <div className='acc-options'>
        <div className='acc-h2-bg'>
          <h2>{user.first + (user.middle ? " " + user.middle + " " : " ") + user.last}</h2>
        </div>
        <button onClick={() => setShow("details")}>Details</button>
        <button>Orders</button>
        <button onClick={logout}>Logout</button>
      </div>
        { show == "details" ? (
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