import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard.jsx'
import Login from './components/Login.jsx'
import App from './App.jsx'
import RequireAuth from './components/RequireAuth.jsx'
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

// {!token ?
//         <Login setToken={setToken} /> :
//         <App token={token} />
//       }

const Main = () => {
  // const [token, setToken] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="/" element={<Login setToken={setToken} />} /> */}
      <Route 
        path="/dashboard/*"
        element={
          <RequireAuth>
            <App />
          </RequireAuth>
        }
        // element={token ? <App token={token} /> : <Navigate to="/" replace />}
      >
        <Route path="orders" element={<Dashboard />} />
        {/* <Route path="orders" element={<Dashboard token={token} />} /> */}
        {/* <Route path="scheduling" element={<Scheduling />} /> */}
      </Route>
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
