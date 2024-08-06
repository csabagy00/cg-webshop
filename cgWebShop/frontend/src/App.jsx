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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState();
  const [filteredProducts, setFilteredProducts] = useState();
  const [categories, setCategories] = useState();
  const [searchValue, setSearchValue] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState();
  const [categoriesRefresh, setCategoriesRefresh] = useState(false);
  const [productsRefresh, setProductsRefresh] = useState(false);
  const [showAcc, setShowAcc] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch('/api/Category'),
          fetch('/api/Products')
        ])

        if(!categoriesResponse.ok || !productsResponse.ok){
          throw new Error('One or more fetch request failed')
        }

        const categoriesResult = await categoriesResponse.json();
        const productsResult = await productsResponse.json();

        setCategories(categoriesResult);
        setProducts(productsResult)

      } catch (error) {
        console.error(error)
      }
    }

    fetchData();
  }, [categoriesRefresh, productsRefresh])

  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  return (
    <Context.Provider value={{ setShowAcc, showAcc, products, isAuthenticated, setIsAuthenticated, filteredProducts, setFilteredProducts, searchValue, setSearchValue, setIsAdmin, isAdmin, cart, setCart, user, categories, setCategoriesRefresh, categoriesRefresh, productsRefresh, setProductsRefresh }}>
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