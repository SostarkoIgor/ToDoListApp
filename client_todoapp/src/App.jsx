
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Authorize from './auth/Authorize'
import ListEdit from './pages/ListEdit'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Authorize><Home /></Authorize>} />
        <Route path="/create/:id?" element={<Authorize><ListEdit mode="create"/></Authorize>} />
        <Route path="/edit/:id?" element={<Authorize><ListEdit mode="edit"/></Authorize>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
