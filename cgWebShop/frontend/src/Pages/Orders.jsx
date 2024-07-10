import { useState, useEffect } from "react";
import OrdersTable from "../Components/OrdersTable";


const Orders = ({ user }) => {
  const [orders, setOrders] = useState();

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
          }
  
          console.log(result);
  
          setOrders(result)
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
      <OrdersTable orders={orders}/>
      }
    </>
  )
};

export default Orders