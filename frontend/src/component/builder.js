import React from 'react'
import NavBar from './navbar'
import { Link } from 'react-router-dom'
import { useState } from 'react'
// import Temp from './Addjourney'
import Alpha from './apha'
function Builder() {
  // const [active,setActive] = useState('first')

  // const handleclick = (x) => {
  //   setActive(x)
  // }
  return (
    <div>
      <NavBar />
      <div className="row">
        <div className="side">
          <div className="sidebar">
            <div className="nav">
              <ul>
                <li>
                  <Link to="" className="zf">
                    Journeys
                  </Link>
                </li>
                <li>
                  <Link to="">Activities</Link>
                </li>
                <li>
                  <Link to="">Events</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="right">
          <Alpha />
        </div>
      </div>
    </div>
  )
}

export default Builder
