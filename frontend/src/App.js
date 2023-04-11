import React, { useState } from 'react'
import Loginform from './component/Loginform'
import { Routes, Route } from 'react-router-dom'
import './main.css'
import Footer from './Footer'
// import ContentPage from './component/ContentPage'
import Builder from './component/builder'
import User from './component/user'
import Navbar from './component/navbar'
// import Temp from "./component/temp"
import Report from './component/report'
import Addjourney from './component/Addjourney'
import Adduser from './component/adduser'
import Journeydetail from './component/Journeydetail'
import JourneyRedux from './component/journey_redux'
import AddJourneyRedux from './component/Add_Journey_Redux'
function App() {
  return (
    <>
      <div className="page">
        <Routes>
          <Route path="/" element={<Loginform />}></Route>
          <Route path="/builder" element={<Builder />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/addjourney" element={<Addjourney />} />
          <Route path="/addjourneyredux" element={<AddJourneyRedux />} />
          <Route path="/report" element={<Report />}></Route>
          <Route path="/adduser" element={<Adduser />} />
          <Route path="/details/:id" element={<Journeydetail />} />
          <Route path="/details2/:id" element={<JourneyRedux />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
