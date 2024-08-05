import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../App'

import SearchForm from './SearchForm';
import "./css/Header.css"
import Modal from './Modal';

function Header(){
  const [showModal, setShowModal] = useState(false);

  var navigate = useNavigate();

  const { setShowAcc, products, isAuthenticated, setIsAuthenticated, filteredProducts, setFilteredProducts, searchValue, setSearchValue, setIsAdmin, categories } = useContext(Context)

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    setIsAdmin(false)

    navigate('/')
  }

  const onClickHome = () => {
    navigate('/')
    setFilteredProducts(null)
  }

  const onClickCategory = (c) => {

    if(searchValue != null){
      setFilteredProducts(products.filter(p => p.category.name == c.name && p.name.includes(searchValue)))

    } else {
      setFilteredProducts(products.filter(p => p.category.name == c.name))
    }
  }

  const onClickCategories = () => {
    setFilteredProducts(null)
  }

  const onClickCartIcon = () => {

    if(isAuthenticated){
      navigate('/account')
      setShowAcc("cart")
    } else {
      setShowModal(true)
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          <button className='btn' onClick={() => onClickHome()}>Home</button>
          <div className='dropdown'>
            <button className='btn' onClick={onClickCategories}>Categories</button>
            <div className='dropdown-content'>
              {categories && categories.map(c => {
                return(
                  <button key={c.id} className='dropdown-btn' onClick={() => onClickCategory(c)}>{c.name}</button>
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
              <button className='btn' onClick={() => navigate("/account")}>Account</button>
              <button className='btn' onClick={logout}>Logout</button>
            </>
          }
          <SearchForm setSearchValue={setSearchValue} searchValue={searchValue} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} products={products}/>
          <div className='cart-btn' onClick={() => onClickCartIcon()}>
            <i className="fas fa-shopping-cart"></i>
          </div>
        </div>
      </nav>
      <Modal onClose={() => setShowModal(false)} isOpen={showModal}>
        <h3>You need to log in to continue</h3>
      </Modal>
    </>
  )
}

export default Header