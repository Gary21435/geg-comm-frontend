import './Order.css'

const name = 'Esmeralda Reyes'
const order_info_items = ['Name', 'Phone', 'Address', 'Status']
const order_info = [name, '818-221-2222', '17320 Burbank Blvd', 'New']


const Order = (props) => {

    const expand = (id) => {
        const table = document.querySelector(`#${"order"+id}.table-div`);
        table.classList.toggle('expand');
        console.log("is it running?", id);
    }

    // to copy text (address, phone, etc.)
    // const copyToClipboard = (text) => {
    //     navigator.clipboard.writeText(text);
    // }

    Object.keys(props).forEach((thing, i) => {
        console.log(`${thing}: `, props[thing]);
    }
    )

    return (
        <>
            <div className='order-container'>
                <div className="order" onClick={() => expand(props.order_id)}>#{props.order_id} {props.first_name} {props.last_name} <span className='order-status'>{props.custom_status}</span></div>
                <div className='wrapper'>
                    <div className='table-div' id={String("order"+props.order_id)}>
                        <table className='info-table'>
                            <tbody>
                                {Object.keys(props).map((thing, i) => 
                                    <tr key={i}>
                                        <td>{thing}: </td>
                                        <td>{props[thing]}</td>
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