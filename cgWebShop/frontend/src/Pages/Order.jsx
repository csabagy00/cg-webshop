import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ShippingInfo from '../Components/ShippingInfo.jsx'
import OrderConfirmation from "../Components/OrderConfirmation.jsx"

const Order = ({ cartArray, user }) => {
  const [orderState, setOrderState] = useState(1)
  const [address, setAddress] = useState()
  const [city, setCity] = useState()
  const [country, setCountry] = useState()
  const [postal, setPostal] = useState()

  return(
    orderState == 1 ? 
    <ShippingInfo address={address} setAddress={setAddress} city={city} setCity={setCity} country={country} setCountry={setCountry} postal={postal} setPostal={setPostal} setOrderState={setOrderState}/>
    :
    <OrderConfirmation cartArray={cartArray} address={address} city={city} country={country} postal={postal} user={user}/>
  )
}

export default Order