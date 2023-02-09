import { useState } from 'react'
import './App.css'
import Header from './Header'
import Post from './Post'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/Register'
import Homepage from './pages/Homepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />


      </Route>
    </Routes>
  )
}

export default App
