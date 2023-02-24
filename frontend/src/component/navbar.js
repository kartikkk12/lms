import React from 'react'
import {NavLink} from 'react-router-dom'
// import './navcss.css'
const Navbar = () => {
  return (
    <nav><span className="title">Cerner Learning</span>
    <div className='naver'>
        <NavLink to='/builder' className="navbox">Builder</NavLink>
        <NavLink to='/user' className="navbox">User</NavLink>
        <NavLink to='/reports' className="navbox">Reports</NavLink>
        </div>
    </nav>

  )
}

export default Navbar