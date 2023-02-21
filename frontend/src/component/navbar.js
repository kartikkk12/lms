import React from 'react'
import {NavLink} from 'react-router-dom'
// import './navcss.css'
const Navbar = () => {
  return (
    <nav><span className="wide">Cerner Learning</span>
        <NavLink to='/builder'>Builder</NavLink>
        <NavLink to='/user'>User</NavLink>
        <NavLink to='/reports'>Reports</NavLink>
    </nav>

  )
}

export default Navbar