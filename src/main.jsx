import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Login from './components/Login.jsx'
import './main.css'

// const router = createBrowserRouter([
//   {
//     path: 'dashboard',
//     element: <App />
//   },
//   {
//     path: '/',
//     element: <Login />
//   }
// ])

const Main = () => {
  const [token, setToken] = useState(null);
  return (
    <>
      {!token ?
        <Login setToken={setToken} /> :
        <App token={token} />
      }
    </>
  )
}



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </StrictMode>
)
