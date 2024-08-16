import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function isValidToken(token) {
    try{
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
    } catch (e) {
        return false;
    }
}

function Authorize({ children }) {
  const token = localStorage.getItem('token');

  if (token && isValidToken(token))
    return children
  else{
    localStorage.removeItem('token')
    return <Navigate to="/login" />
  }
}

export default Authorize;
