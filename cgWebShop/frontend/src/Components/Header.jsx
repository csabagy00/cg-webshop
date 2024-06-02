import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchForm from './SearchForm';
import "./css/Header.css"

function Header({ isAuthenticated, setIsAuthenticated }){
  var navigate = useNavigate();
  

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch()
    }
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
        <button className="btn">Categories</button>
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