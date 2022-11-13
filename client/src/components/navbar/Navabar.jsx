import React from 'react'
import './Navbar.css'
import profile from '../../images/profile.jpg'
import { Link, NavLink } from 'react-router-dom'

function Navabar({ userData }) {
  return (
    <div className='navbar'>
        <Link to="/"><h1>Employer Space</h1></Link>
        <ul className='nav'>
           <NavLink to='/services'><li>Services</li></NavLink>
           <NavLink to='/bookings'><li>My Bookings</li></NavLink>
           <NavLink to="/profile"><img src={userData.profileIamge? 'http://localhost:5000/'+userData.profileIamge : profile} alt="profile" /></NavLink>
        </ul>
    </div>
  )
}

export default Navabar