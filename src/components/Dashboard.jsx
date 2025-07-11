import { useState, useEffect } from 'react'
import Order from './Order'
import Menu from './Menu'
import orderService from '../services/orders'
import { Link } from 'react-router-dom'

const Dashboard = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [schOrders, setSchOrders] = useState([]);
  const [schIds, setSchIds] = useState([]);

  const schedule_orders = orders.filter(order => order.schedule);

  // console.log("schorders:", schOrders);
  // console.log("shcids:", schIds);
  // setTimeout(() => {
  //   console.log("orders:", orders);
  // }, 100)
  // schIds.forEach(id => {
  //   setOrders(orders.filter(order => order.order_id !== id))
  // });
  console.log("orders", orders);

  // You'd use useEffect to load Order data from the DB at initial App mount
  if (!token) return (
    <>
      <h1>noting</h1>
    </>
  )
  useEffect(() => {
    orderService
      .getAll(token)
      .then(response => {
        const orders = response.data;
        orders.map(order => {
          return {...order, schedule: false};
        } )
        setOrders(orders);
      })
      .catch(response => console.error(response.message))
    }, [])
  
  return (
    <>
      <div className='app-logo'>
        <a href=""><img src="../../imgs/geg_logo.png" alt="logo" id="logo" /></a>
        <h1>GEG Comm</h1>
      </div>
      <h2>Scheduling</h2>
      {schedule_orders.length ? schedule_orders.map(order => {
        return <Order key={order.order_id+1000} orders={orders} setOrders={setOrders} set order_info={order} />
      })
      : <p>Nothing to schedule!</p>
      }
      <h2>Orders</h2>
      {orders.filter(order => !order.schedule).map(order => {
        return <Order key={order.order_id} orders={orders} setOrders={setOrders} order_info={order} />
      })}
    </>
  )
}

export default Dashboard
