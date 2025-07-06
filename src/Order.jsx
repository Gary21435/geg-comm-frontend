import './App.css'

const Order = ({ orderNum, status }) => {
    return (
        <>
            <div className="order">{orderNum} {status}</div>
        </>
    )
}

export default Order;