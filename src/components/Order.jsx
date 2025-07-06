import './Order.css'

const name = 'Esmeralda Reyes'
const order_info_items = ['Name', 'Phone', 'Address', 'Status']
const order_info = [name, '818-221-2222', '17320 Burbank Blvd', 'New']


const Order = ({ orderNum, status, name }) => {

    const expand = () => {
        const table = document.querySelector('.table-div');
        table.classList.toggle('expand')
    }

    return (
        <>
            <div className='order-container' onClick={expand}>
                <div className="order">#{orderNum} {name} <span className='order-status'>{status}</span></div>
                <div className='wrapper'>
                    <div className='table-div'>
                        <table className='info-table'>
                            <tbody>
                                {order_info_items.map((info, i) => 
                                <tr key={i}>
                                    <td>{info}: </td>
                                    <td>{order_info[i]}</td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order;