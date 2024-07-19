import './css/OrderDetail.css'

const OrderDetail = ({ order, setSelectedOrder }) => {
  let summary = 0;

  return(
    <>
    <div className='order-detail-back'>
      <button className='btn' onClick={() => setSelectedOrder()}>Back</button>
    </div>
    <div className="order-detail">
      <div className="order-info">
        <h4>Order ID</h4>
        <p>{order.id}</p>
        <h4>Date</h4>
        <p>{order.date}</p>
        <h4>Address</h4>
        <p>{order.address}</p>
        <h4>City</h4>
        <p>{order.city}</p>
        <h4>County</h4>
        <p>{order.country}</p>
        <h4>Postal</h4>
        <p>{order.postalCode}</p>
      </div>
      <div className="order-producttable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.products && order.products.map((op) => {
              summary += op.product.price

              return(
                <tr>
                  <td>{op.product.name}</td>
                  <td>Category Name</td>
                  <td>{op.product.price}</td>
                </tr>
              )
            })}
            <tr>
              <td className='order-summary'>Summary:</td>
              <td></td>
              <td className='order-summary'>{summary}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default OrderDetail