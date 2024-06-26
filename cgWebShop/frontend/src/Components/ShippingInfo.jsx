import { useState } from 'react'
import './css/Form.css'
import Modal from './Modal'

const ShippingInfo = ({ address, setAddress, city, setCity, country, setCountry, postal, setPostal, setOrderState}) => {
  const [invalidShipping, setInvalidShipping] = useState(false)

  const isShippingValid = () => {
    if( isNullOrEmpty(address) || isNullOrEmpty(city) || isNullOrEmpty(country) || isNullOrEmpty(postal)){
      setInvalidShipping(true)
    } else {
      setOrderState(2)
    }
  }

  function isNullOrEmpty(value){
    return value == null || value === "";
  }

  return(
    <div className='form-page'>
      <div className='form-wrapper'>
        <form className='fields'>
          <div className="field">
            <label htmlFor='address'>Address:</label>
            <input type="text" onChange={(e) => setAddress(e.target.value)} value={address}/>
          </div>
          <div className="field">
            <label htmlFor='city' >City:</label>
            <input type="text" onChange={(e) => setCity(e.target.value)} value={city}/>
          </div>
          <div className="field">
            <label htmlFor='country' >Country:</label>
            <input type="text" onChange={(e) => setCountry(e.target.value)} value={country}/>
          </div>
          <div className="field">
            <label htmlFor='postal' >Postal:</label>
            <input type="text" onChange={(e) => setPostal(e.target.value)} value={postal}/>
          </div>
          <div className="field-post">
            <input type="button" value="Next" onClick={isShippingValid}/>
          </div>
        </form>
      </div>
      <Modal isOpen={invalidShipping} onClose={() => setInvalidShipping(false)}>
        <p>Enter valid shipping information to continue!</p>
      </Modal>
    </div>
  )
}

export default ShippingInfo