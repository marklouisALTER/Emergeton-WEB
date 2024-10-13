import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { Login } from './pages/Login'
import { Homepage } from './pages/Homepage'
import Layout from './layout/Layout'
import { Register } from './pages/Register'
import AdminLogin from './pages/AdminLogin'
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
