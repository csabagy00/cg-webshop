import { useState, useEffect } from 'react'
import "./css/Header.css"

function Header(){

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch()
    }
  }, [])

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className='dropdown'>
          <button className="btn">Categories</button>
          <div className='dd-content'>
            <a></a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header