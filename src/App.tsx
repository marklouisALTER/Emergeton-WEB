import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { Login } from './pages/Login'
// import { Homepage } from './pages/Homepage'
// import Layout from './layout/Layout'
// import { Register } from './pages/Register'
import AdminLogin from './pages/AdminLogin'
import { UserLayout } from './layout/UserLayout'
import Dashboard from './pages/admin/Dashboard'
import Profile from './pages/admin/Profile'
import { Department } from './pages/admin/Department'
import { Residents } from './pages/admin/Residents'
function App() {
  
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<Layout />}> */}
          {/* <Route index element={<Homepage />} /> */}
          {/* <Route path="register" element={<Register />} /> */}
        {/* </Route> */}
        <Route path='admin' element={<UserLayout />} >
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='profile' element={<Profile />} />
          <Route path='department' element={<Department />} />
          <Route path='residents' element={<Residents />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='/' element={<AdminLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
