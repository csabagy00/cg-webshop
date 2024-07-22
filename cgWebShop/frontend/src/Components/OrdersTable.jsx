import './css/OrdersTable.css'

const OrdersTable = ({ orders, setSelectedOrder }) => {
  return(
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Address</th>
              <th>Item(s)</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((o) => {
              return (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td className="table-row">{o.date}</td>
                <td className="table-row">{o.address}</td>
                <td className="table-row">{o.products.length}</td>
                <td>
                  <button onClick={() => setSelectedOrder(o)}>More</button>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
  )
}

export default OrdersTable
