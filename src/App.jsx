import Menu from "./components/Menu";
import { Outlet } from 'react-router-dom'



const App = () => {

    return (
        <div className="whole-app">
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default App