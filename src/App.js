import './App.css';
import { BrowserRouter as Router, Route, Routes ,Redirect, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
function App() {


  return (
<div>

<Router>

  <Routes>
    
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/booking/:carid' element={<BookingCar/>} />
    <Route path='/userbookings/' element={<UserBookings/>} />
    <Route path='/addcar' element={<AddCar/>} />
    <Route path='/admin' element={<AdminHome/>} />
    <Route path='/editcar/:carid' element={<EditCar/>} />

  </Routes>
</Router>
</div>
  );
}

export default App;
