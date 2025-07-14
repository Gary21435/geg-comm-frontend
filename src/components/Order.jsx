import { useState } from 'react';
import './Order.css'
import orderService from '../services/orders'

// Generate time options in 24-hour format for the form
const generateTimeOptions = () => {
  const options = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hh = String(h).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      options.push(`${hh}:${mm}`);
    }
  }
  return options;
};

// Convert "HH:mm" to "h:mm AM/PM"
const formatTime12hr = (time24) => {
  const [hourStr, minuteStr] = time24.split(':');
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${minuteStr} ${ampm}`;
};

// Format YYYY-MM-DD to "Weekday, Month day, Year"
const formatDateLong = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const DeliveryScheduler = ({ id, delivery, setOrders, schedule }) => {
  const [scheduled, setScheduled] = useState(delivery);
  const [dateSet, setDateSet] = useState(schedule)
  let deliv = {
    date: null,
    time_from: null,
    time_to: null,
  };
  if(delivery) {
    deliv.date = delivery.date;
    deliv.time_from = delivery.time_from;
    deliv.time_to = delivery.time_to;
  }
  const [formData, setFormData] = useState({
    date: deliv.date || '',
    time_from: deliv.time_from || '',
    time_to: deliv.time_to || '',
  });

  const timeOptions = generateTimeOptions();

  const changeSch = (bool) => {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === id
            ? { ...order, schedule: bool }
            : order
        )
      );
    }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { date, time_from, time_to } = formData;
    if (!date || !time_from || !time_to) {
      alert('Please fill out all fields.');
      return;
    }
    if (time_from >= time_to) {
      alert('Start time must be before end time.');
      return;
    }

    setScheduled({
      date: formatDateLong(date),
      time_from: formatTime12hr(time_from),
      time_to: formatTime12hr(time_to),
    });
    // to update ui
    changeSch(true);
    setDateSet(true);

    orderService
      .updateOrder(id, {
        date: date,
        time_from: time_from,
        time_to: time_to
      })
      .then(r => {
        console.log("schedule saved/updated.", r);
      })
      .catch(e => console.log("error:", e))
  };

  const handleRemove = () => {
    setDateSet(false);
    changeSch(false);

    orderService
      .setSchFalse(id)
      .then(r => {
        console.log("schedule set to false", r);
      })
      .catch(e => console.log("error schedule set to false:", e))
  }

  if (dateSet) {
    return (
      <div>
        <h3>Delivery Scheduled</h3>
        <p>Date: <strong>{scheduled.date}</strong></p>
        <p>Time: <strong>{scheduled.time_from}</strong> to <strong>{scheduled.time_to}</strong></p>
        <button onClick={() => {setScheduled(null); setDateSet(false);}}>Edit Delivery time/date</button>
        <button onClick={handleRemove}>Remove from Scheduling</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Time From:
        <select
          name="time_from"
          value={formData.time_from}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </label>
      <br />

      <label>
        Time To:
        <select
          name="time_to"
          value={formData.time_to}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </label>
      <br />

      <button type="submit">Schedule Delivery</button>
    </form>
  );
};


// const CustomTimeInput15Min = () => {
//   const [hour, setHour] = useState('09');
//   const [minute, setMinute] = useState('00');

//   const handleHourChange = (event) => {
//     setHour(event.target.value);
//   };

//   const handleMinuteChange = (event) => {
//     setMinute(event.target.value);
//   };

//   const generateMinuteOptions = () => {
//     const options = [];
//     for (let i = 0; i < 60; i += 15) {
//       options.push(
//         <option key={i} value={String(i).padStart(2, '0')}>
//           {String(i).padStart(2, '0')}
//         </option>
//       );
//     }
//     return options;
//   };

//   return (
//     <div>
//       <label htmlFor="hour-select">Select Time:</label>
//       <select id="hour-select" value={hour} onChange={handleHourChange}>
//         {Array.from({ length: 24 }, (_, i) => (
//           <option key={i} value={String(i).padStart(2, '0')}>
//             {String(i).padStart(2, '0')}
//           </option>
//         ))}
//       </select>
//       <span>:</span>
//       <select id="minute-select" value={minute} onChange={handleMinuteChange}>
//         {generateMinuteOptions()}
//       </select>
//     </div>
//   );
// }


const Order = ({ order_info, orders, setOrders }) => {
    const [folastExpired, setFolastExpired] = useState(false);
    const [folast, setFolast] = useState(null);
    const date = new Date(); // Get the current date and time

    const expand = (id) => {
        const table = document.querySelector(`#${"order"+id}.table-div`);
        table.classList.toggle('expand');
    }

    // to copy text (address, phone, etc.)
    // const copyToClipboard = (text) => {
    //     navigator.clipboard.writeText(text);
    // }
    
    const getFolast = (e) => {
      orderService
        .getFolast(order_info.order_id)
        .then(folast => {
          setFolastExpired(true);
          const td = e.target.parentNode;
          setFolast(folast.data.folast);
          setTimeout(() => {
             setFolastExpired(false);
             setFolast(null)
          }, 50 * 1000)
        })
        .catch(error => console.log("folast:",error));
    }


    return (
        <>
            <div className='order-container'>
                <div className="order" onClick={() => expand(order_info.order_id)}>#{order_info.order_id} {order_info.first_name} {order_info.last_name} <span className='order-status'>{order_info.custom_status}</span></div>
                <div className='wrapper'>
                    <div className='table-div' id={String("order"+order_info.order_id)}>
                        <table className='info-table'>
                            <tbody>
                                {Object.keys(order_info).map((thing, i) => {
                                    if(thing !== "delivery") {
                                      return <tr key={i}>
                                          <td>{thing}: </td>
                                          <td>{order_info[thing]}</td>
                                      </tr>
                                    } else return;
                                  }
                                )}
                                {
                                  <tr>
                                    <td>folast: </td>
                                    <td>
                                      {folast ? (
                                          folast
                                        ) : (
                                          <button onClick={getFolast}>get folast</button>
                                        )}
                                      </td>
                                  </tr>
                                }
                                {/* {order_info.delivery && Object.keys(order_info.delivery).map((thing, i) => {
                                  return <tr key={i}>
                                              <td>{thing}: </td>
                                              <td>{order_info.thing}</td>
                                          </tr>
                                        }
                                )} */}
                            </tbody>
                        </table>
                        <div className='schedule-form-container'>
                            <DeliveryScheduler id={order_info.id} delivery={order_info.delivery} setOrders={setOrders} schedule={order_info.schedule} />
                            {/* <button onClick={(e) => handleScheduleForm(e, order_info.order_id)}>schedule</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order;