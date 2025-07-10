import { Link } from 'react-router-dom'
import './menu.css'

const Menu = () => {

    return (
        <nav className="menu">
            <Link to='/dashboard/orders' className='link'>Orders</Link>
            {/* <Link to='/dashboard/scheduling'>Scheduling</Link> */}
        </nav>
    )
}

export default Menu