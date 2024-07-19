import { useState, useEffect } from "react";
import OrdersTable from "../Components/OrdersTable";
import OrderDetail from "../Components/OrderDetail";


const Orders = ({ user }) => {
  const [orders, setOrders] = useState();
  const [selectedOrder, setSelectedOrder] = useState();

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/Order/userId?userId=${user.id}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });

          const result = await response.json();

          if(result.status === 404){
            setOrders(null);
          } else {
            setOrders(result)
          }
          
        } catch (error) {
          console.error(error)
        }
      }

      fetchData();
  }, [])
  
  return(
    <>
      {orders == null ? 
      <h3>There are no orders yet.</h3>
      :
      (selectedOrder ? 
        <OrderDetail order={selectedOrder} setSelectedOrder={setSelectedOrder}/>
      :
        <OrdersTable orders={orders} setSelectedOrder={setSelectedOrder}/>
      )
      }
    </>
  )
};

export default Orders