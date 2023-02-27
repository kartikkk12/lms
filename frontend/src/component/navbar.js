import React from 'react'
import {NavLink} from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'
// import './navcss.css'
const Navbar = () => {
  const [user,setUser] = useState('aasssss')

  useEffect(() => {
      axios.get('http://localhost:3000/logged_in', {withCredntials: true}).then(response => {
        if(!response.data.logged_in){
          setUser('kartikkk')
          console.log(response.data)
        }
        else{
          setUser(response.data.users_name)
      } 
      })
  }, [user])
  return (
    <nav><span className="title">Cerner Learning</span>
    <div className='naver'>
        <NavLink to='/builder' className="navbox">Builder</NavLink>
        <NavLink to='/user' className="navbox">User</NavLink>
        <NavLink to='/report' className="navbox">Reports</NavLink>
        <div className="navbox2">{user}</div>

    </div>
        {/* <div className='topright'>
        <NavLink to='/report' className="navbox">{user}</NavLink>

        </div> */}
    </nav>

  )
}

export default Navbar