import './Order.css'


const Order = ({ order_info, orders, setOrders }) => {
    const expand = (id) => {
        const table = document.querySelector(`#${"order"+id}.table-div`);
        table.classList.toggle('expand');
    }

    // to copy text (address, phone, etc.)
    // const copyToClipboard = (text) => {
    //     navigator.clipboard.writeText(text);
    // }

    const handleClick = (id) => {
        console.log("handleClick!");
        const orderIndex = orders.findIndex(order => order.order_id === id);
        if (orderIndex !== -1) {
            setOrders(prevOrders => 
                prevOrders.map((order, idx) => 
                    idx === orderIndex
                        ? { ...order, schedule: !order.schedule }
                        : order
                )
            );
        }
    }

    return (
        <>
            <div className='order-container'>
                <div className="order" onClick={() => expand(order_info.order_id)}>#{order_info.order_id} {order_info.first_name} {order_info.last_name} <span className='order-status'>{order_info.custom_status}</span></div>
                <div className='wrapper'>
                    <div className='table-div' id={String("order"+order_info.order_id)}>
                        <table className='info-table'>
                            <tbody>
                                {Object.keys(order_info).map((thing, i) => 
                                    <tr key={i}>
                                        <td>{thing}: </td>
                                        <td>{order_info[thing]}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <button onClick={() => handleClick(order_info.order_id)}>schedule</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order;