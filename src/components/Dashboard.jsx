import { useState, useEffect } from 'react'
import Order from './Order'
import Menu from './Menu'
import orderService from '../services/orders'
import { Link } from 'react-router-dom'

const Dashboard = ({ token }) => {
  const [orders, setOrders] = useState([]);
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
        setOrders(response.data);
        console.log(response.data);
      })
      .catch(response => console.error(response.message))
    }, [])
  
  return (
    <>
      <div className='app-logo'>
        <a href=""><img src="../../imgs/geg_logo.png" alt="logo" id="logo" /></a>
        <h1>GEG Comm</h1>
      </div>
      {orders.map(order => {
        return <Order key={order.order_id} {...order} />
      })}
    </>
  )
}

export default Dashboard
