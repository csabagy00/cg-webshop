import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import SearchForm from './SearchForm';
import "./css/Header.css"

function Header({ isAuthenticated, setIsAuthenticated, setFilteredProducts, setSearchValue, products, filteredProducts, searchValue, setIsAdmin }){
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
    setIsAdmin(false)

    navigate('/')

    console.log(localStorage.getItem("token") == null);

  }

  const onClickCategory = (c) => {
    console.log("clicked category");

    if(searchValue != null){
      console.log("search + cat");
      setFilteredProducts(products.filter(p => p.category.name == c.name && p.name.includes(searchValue)))
    } else {
      console.log("cat");
      setFilteredProducts(products.filter(p => p.category.name == c.name))
    }
  }

  const onClickCategories = () => {
    setFilteredProducts(null)
  }

  return (
    <nav className="navbar">
      <div className="nav-content">
        <button className='btn' onClick={() => navigate("/")}>Home</button>
        <div className='dropdown'>
          <button className='btn' onClick={onClickCategories}>Categories</button>
          <div className='dropdown-content'>
            {categories && categories.map(c => {
              return(
                <button className='dropdown-btn' onClick={() => onClickCategory(c)}>{c.name}</button>
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
            <button className='btn' onClick={() => navigate("/account")}>Account</button>
          </>
        }
        <SearchForm setSearchValue={setSearchValue} searchValue={searchValue} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} products={products}/>
        <div className='cart-btn'>
          <i className="fas fa-shopping-cart"></i>
        </div>
      </div>
    </nav>
  )
}

export default Header