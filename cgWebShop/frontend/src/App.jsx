import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './Pages/MainPage'
import Header from './Components/Header'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Account from './Pages/Account'
import Order from './Pages/Order'

function App() {
  const cartArray = [];
  localStorage.setItem("cart", JSON.stringify(cartArray))
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState();
  const [filteredProducts, setFilteredProducts] = useState();
  const [searchValue, setSearchValue] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState(cartArray);

  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  return (
    <BrowserRouter>
      <Header isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} 
        setFilteredProducts={setFilteredProducts} 
        setSearchValue={setSearchValue} 
        filteredProducts={filteredProducts}
        products={products}
        setIsAdmin={setIsAdmin}/>

      <Routes>
        <Route path='/' element={<MainPage 
          products={products} 
          filteredProducts={filteredProducts} 
          setProducts={setProducts} 
          searchValue={searchValue} 
          cartArray={cartArray} 
          setCart={setCart}
          cart={cart}
          isAuthenticated={isAuthenticated}/>}/>

        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin}/>}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/account' element={<Account user={user} setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} isAdmin={isAdmin} cartArray={cartArray}/>}/>
        <Route path='/order' element={<Order cartArray={cartArray} user={user}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
