import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './Pages/MainPage'
import Header from './Components/Header'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Account from './Pages/Account'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [products, setProducts] = useState();
  const [filteredProducts, setFilteredProducts] = useState();
  const [searchValue, setSearchValue] = useState(null);

  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  return (
    <BrowserRouter>
      <Header isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} 
        setFilteredProducts={setFilteredProducts} 
        setSearchValue={setSearchValue} 
        filteredProducts={filteredProducts}
        products={products}/>

      <Routes>
        <Route path='/' element={<MainPage products={products} filteredProducts={filteredProducts} setProducts={setProducts} searchValue={searchValue}/>}/>
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/account' element={<Account user={user} setIsAuthenticated={setIsAuthenticated}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
