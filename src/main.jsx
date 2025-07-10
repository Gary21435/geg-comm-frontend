import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard.jsx'
import Login from './components/Login.jsx'
import './main.css'

// const router = createBrowserRouter([
//   {
//     path: 'dashboard',
//     element: <Dashboard />
//   },
//   {
//     path: '/',
//     element: <Login />
//   }
// ])

const Main = () => {
  const [token, setToken] = useState(null);
  if(token)
    console.log("token!");
  else console.log("nO!");
  return (
    <Routes>
      <Route path="/" element={<Login setToken={setToken} />} />
      <Route 
        path="/dashboard"
        element={token ? <Dashboard token={token} /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </StrictMode>
)
