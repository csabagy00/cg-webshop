import { useState, useContext } from "react";
import { Context } from "../App.jsx";
import ShippingInfo from '../Components/ShippingInfo.jsx'
import OrderConfirmation from "../Components/OrderConfirmation.jsx"

const Order = () => {
  const [orderState, setOrderState] = useState(1)
  const [address, setAddress] = useState()
  const [city, setCity] = useState()
  const [country, setCountry] = useState()
  const [postal, setPostal] = useState()

  const { setCart, cart, user } = useContext(Context);

  return(
    orderState == 1 ? 
    <ShippingInfo 
      address={address} 
      setAddress={setAddress} 
      city={city} 
      setCity={setCity}
      country={country} 
      setCountry={setCountry} 
      postal={postal} 
      setPostal={setPostal} 
    setOrderState={setOrderState}/>

    :
    <OrderConfirmation setCart={setCart} cart={cart} address={address} city={city} country={country} postal={postal} user={user}/>
  )
}

export default Order