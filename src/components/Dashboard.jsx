import { useState, useEffect } from 'react'
import Order from './Order'
import Menu from './Menu'
import orderService from '../services/orders'
import loginService from '../services/login'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [schOrders, setSchOrders] = useState([]);
  const [token, setToken] = useState(false);
  const navigate = useNavigate();
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
  // if (!token) return (
  //   <>
  //     <h1>noting</h1>
  //   </>
  // )
  useEffect(() => {
    orderService
      .getAll()
      .then(response => {
        console.log("getall worked first time");
        const orders = response.data;
        orders.map(order => {
          return {...order, schedule: false};
        } )
        setToken(true);
        setOrders(orders);
      })
      .catch(async error => {
        console.error("token must be expired", error.message);
        // setToken(true);
        if (error.response.status === 401) {
          console.log("access token probably expired; calling refresh!");

          loginService
            .refresh()
            .then(() => {
              console.log("refresh worked! Let us now get the orders!");
              orderService
                .getAll()
                .then(response => {
                  const orders = response.data;
                  orders.map(order => {
                    return {...order, schedule: false};
                  } )
                  setToken(true);
                  setOrders(orders);
                })
                .catch(e => console.log("error after refresh???", e))
            })
            .catch(e => {
              console.log('idek', e);
              console.log("refreshToken has also expired or logged out");
              navigate('/');
            })
        }
      })
    }, [])

  const handleLogout = () => {
    loginService
      .logout()
      .then(r => {
        console.log("logged out!", r);
      })
      .catch(e => console.error(e.message))
    
    navigate('/');
  }
  
  // useEffect(() => {
  //   setTimeout(() => {
  //     if(!token)
  //       navigate('/');
  //   }, 100);
    
  // }, [])
  

  return (
    <>
      <div className='app-logo'>
        <a href=""><img src="../../imgs/geg_logo.png" alt="logo" id="logo" /></a>
        <h1>GEG Comm</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Link to="/privacy+policy">Privacy Policy</Link>
      <h2>Scheduling</h2>
      {schedule_orders.length ? schedule_orders.map(order => {
        return <Order key={order.order_id+1000} orders={orders} setOrders={setOrders} order_info={order} />
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
