import React from 'react'
import {NavLink} from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'
import {BiLogOut} from 'react-icons/bi'
// import './navcss.css'
const Navbar = () => {
  const [user,setUser] = useState('User')

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
  const logout=()=>{
    axios.get('http://localhost:3000/logout').then(response => console.log(response.data))
    console.log('logout executed')
  }
  return (
    <nav><span className="title">Cerner Learning</span>
    <div className='naver'>
        <NavLink to='/builder' className="navbox">Builder</NavLink>
        <NavLink to='/user' className="navbox">User</NavLink>
        <NavLink to='/rep' className="navbox">Reports</NavLink>
        <NavLink to='/' className='navbox' onClick={logout}><BiLogOut/></NavLink>
        <div className="navbox2">{user}</div>

    </div>
        {/* <div className='topright'>
        <NavLink to='/report' className="navbox">{user}</NavLink>

        </div> */}
    </nav>

  )
}

export default Navbar