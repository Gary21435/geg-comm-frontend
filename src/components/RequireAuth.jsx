// components/RequireAuth.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const RequireAuth = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null); // null = loading
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    axios.get('/api/login/auth', { withCredentials: true })
      .then(() => {
        console.log('calling requireAuth!');
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      })
      .finally(() => setChecking(false));
  }, []);

  if (checking) return <p>Loading...</p>;

  return children;//authenticated ? children : <Navigate to="/" replace />;
};

export default RequireAuth;
