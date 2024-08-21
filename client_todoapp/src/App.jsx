
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Authorize from './auth/Authorize'
import CreateList from './pages/CreateList'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Authorize><Home /></Authorize>} />
        <Route path="/create" element={<Authorize><CreateList/></Authorize>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
