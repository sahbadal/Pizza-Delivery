import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import DedicatedProduct from './pages/DedicatedProduct'
import cartContext from './pages/CartContext'
import { useState,useEffect } from 'react'

const App = () => {

  const [cart,setCart] = useState({});

  useEffect(() =>{

    const cart = window.localStorage.getItem('cart')
    setCart(JSON.parse(cart));

  },[])

  useEffect(()=>{

    window.localStorage.setItem('cart',JSON.stringify(cart))

  },[cart])

  return (
    <>
      <Router>
       <cartContext.Provider value={{ cart,setCart }}>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>} exact></Route>
            <Route path='/products' element={<Products/>} exact></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/products/:id' element={<DedicatedProduct/>}></Route>
          </Routes>
          </cartContext.Provider>
      </Router>
    </>
  )
}

export default App