import { Routes, Route, Link } from 'react-router-dom'
import CarDetailsPage from './views/CarDetailsPage'
import Cars from './views/Cars'
import LoginPage from './views/LoginPage'
import { useAuth } from './context/AuthContext'
import BookingPage from './views/BookingPage'
import ProfileRentalsPage from './views/ProfileRentalsPage'
import RegisterPage from './views/RegisterPage'

function App() {
  const auth = useAuth();

  return (
    <div>
      <div className='navbar'>
        <Link to="/cars" className="brand">CarRent</Link>
        {auth.token && <Link to={"/rents/me"} className="navbar-user">{auth.username}</Link>}
        <Link to="/cars">Cars</Link>
        {!auth.token && <Link to="/login">Log in</Link>}
        {!auth.token && <Link to="/register">Sign up</Link>}
        
        {auth.token && <button className="logout-btn" onClick={auth.logout}>Log out</button>}
       
      </div>

    <Routes>
        <Route path='/' element={<Cars/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/cars/:id' element={<CarDetailsPage/>}/>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
        <Route path='/booking/:carId' element={<BookingPage/>}></Route>
        <Route path='/rents/me' element={<ProfileRentalsPage/>}></Route>
      </Routes>
    </div>
    
  )
}

export default App
