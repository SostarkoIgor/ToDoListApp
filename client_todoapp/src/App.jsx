import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { useNavigate, BrowserRouter, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Authorize from './auth/Authorize'

function App() {

  const navigate = useNavigate()

  useEffect(() => {
    

  }, [])

  return (
    <BrowserRouter>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Authorize><Home /></Authorize>} />
    </BrowserRouter>
  )
}

export default App
