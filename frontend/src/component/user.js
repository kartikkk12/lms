import React from 'react'
import Navbar from './navbar'
// import MenuBar from './MenuBar'
// import Data from './Data'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Userpage from './userpage'
function User() {
  const [active, setActive] = useState('first')

  return (
    //   <frameset rows="5,95">
    //     <frame  name="navbar"><Navbar/></frame>
    //         <frameset cols="15,85">
    //             <frame name="sidebar"><MenuBar/></frame>
    //             <frame src={<data/>} name="data"></frame>
    //         </frameset>
    //     </frameset>

    <div>
      <Navbar />
      <div className="row">
        <div className="side">
          <div className="sidebar">
            <div className="nav">
              <ul>
                <li>
                  <Link to="">Users</Link>
                </li>
                <li>
                  <Link to="">Groups</Link>
                </li>
                <li>
                  <Link to="">Session Rosters</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="right">
          <Userpage />
        </div>
      </div>
    </div>
  )
}

export default User
