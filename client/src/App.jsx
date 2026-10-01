import {Routes, Route } from 'react-router-dom'
import './App.css'

import NavBar from './components/NavBar'
import Home from './pages/Home'
import AddHotel from './pages/AddHotel'
import EditHotel from './pages/EditHotel'
import HotelDetails from './pages/HotelDetails'


function App() {
  return (
    <>
    <NavBar />
    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/hotels/add" element={<AddHotel />} />
      <Route path="/hotels/edit/:id" element={<EditHotel />} />
      <Route path="/hotels/:id" element={<HotelDetails />} />
    </Routes>
    </>
  )
}
export default App