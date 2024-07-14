import { useState, createContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './Pages/MainPage'
import Header from './Components/Header'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Account from './Pages/Account'
import Order from './Pages/Order'

export const Context = createContext();

function App() {
  const cartArray = [];
  localStorage.setItem("cart", JSON.stringify(cartArray))
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState();
  const [filteredProducts, setFilteredProducts] = useState();
  const [categories, setCategories] = useState();
  const [searchValue, setSearchValue] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState(cartArray);
  const [ordersRefresh, setOrdersRefresh] = useState(false);
  const [categoriesRefresh, setCategoriesRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
       const response = await fetch('/api/Category');
       const result = await response.json();
       setCategories(result);

      } catch (error) {
        console.error(error)
      }
    }

    fetchData();
  }, [categoriesRefresh])

  console.log(categoriesRefresh);

  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  return (
    <Context.Provider value={{ setProducts, products, isAuthenticated, setIsAuthenticated, filteredProducts, setFilteredProducts, searchValue, setSearchValue, setIsAdmin, isAdmin, cart, setCart, cartArray, user, categories, setCategoriesRefresh, categoriesRefresh }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<MainPage />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/account' element={<Account />}/>
          <Route path='/order' element={<Order />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  )
}


export default App