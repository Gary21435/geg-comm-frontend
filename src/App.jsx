import { useState, useEffect } from 'react'
import Order from './components/Order'
import orderService from './services/orders'

const App = () => {
  const [orders, setOrders] = useState([]);

  // You'd use useEffect to load Order data from the DB at initial App mount
  useEffect(() => {
    orderService
      .getAll()
      .then(response => {
        setOrders(response.data);
        console.log(response.data);
      })
      .catch(response => console.error(response.message))
    }, [])
  
  return (
    <>
      <h1>GEG Comm</h1>
      {orders.map(order => {
        return <Order key={order.order_id} {...order} />
      })}
    </>
  )
}

export default App
