import './css/OrderConfirmation.css'

const OrderConfirmation = ({ cartArray, address, city, country, postal, user }) => {
console.log(cartArray);

  const orderObj = {

  }

  return(
    <div className='confirm-outer'>
      <div className="confirm-page">
        <div className="confirm-info">
          <h2>{user.first + (user.middle ? " " + user.middle + " " : " ") + user.last}</h2>
          <label>Email:</label>
          <p>{user.email}</p>
          <label>Phone:</label>
          <p>{user.phone}</p>
          <label>Address:</label>
          <p>{address}</p>
          <label>City:</label>
          <p>{city}</p>
          <label>Country:</label>
          <p>{country}</p>
          <label>Postal code:</label>
          <p>{postal}</p>
          <div className='field-post'>
            <input type='button' value='Confirm Order' onClick={console.log('clicked')}/>
          </div>
        </div>
        <div className="confirm-table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartArray && cartArray.map((p, i) => {
                return (
                <tr key={p.id}>
                  <td>{i + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.category.name}</td>
                  <td>{p.price}</td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation