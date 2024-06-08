import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchForm from './SearchForm';
import "./css/Header.css"

function Header({ isAuthenticated, setIsAuthenticated }){
  var navigate = useNavigate();
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/Category')
        const result = await response.json()
        setCategories(result)

      } catch (error) {
        console.error(error)
      }
    }

    fetchData();
  }, [])

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setIsAuthenticated(false)

    console.log(localStorage.getItem("token") == null);

  }

  return (
    <nav className="navbar">
      <div className="nav-content">
        <button className='btn' onClick={() => navigate("/")}>Home</button>
        <div className='dropdown'>
          <button className='btn'>Categories</button>
          <div className='dropdown-content'>
            {categories && categories.map(c => {
              return(
                <button className='dropdown-btn'>{c.name}</button>
              )
            })}
          </div>
        </div>
        {
          !isAuthenticated ? 
          <>
            <button className="btn" onClick={() => navigate("/login")}>Login</button>
            <button className="btn" onClick={() => navigate("/register")}>Register</button>
          </>
            :
          <>
            <button className='btn' onClick={logout}>Logout</button>
            <button className='btn'>Account</button>
          </>
        }
        <SearchForm />
      </div>
    </nav>
  )
}

export default Header