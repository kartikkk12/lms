import React, { useState} from "react";
import Loginform from "./component/Loginform";
import { Routes, Route} from 'react-router-dom'
import './main.css'
import Footer from './Footer'
// import ContentPage from './component/ContentPage'
import Builder from "./component/builder";
import User from "./component/user"
import Navbar from "./component/navbar";
// import Temp from "./component/temp"
import Report from "./component/report"
import Addjourney from "./component/Addjourney";
import Adduser from "./component/adduser";
function App() {
  return (
    <>
    <div className="page">
    <Routes>
      <Route path='/' element={<Loginform/>}></Route>
      <Route path='/builder' element={<Builder />}></Route>
      <Route path='/user' element={<User/>}></Route>
      <Route path='/addjourney' element={<Addjourney/>}/>
      <Route path='/report' element={<Report/>}></Route>
      <Route path='/adduser' element={<Adduser/>}/>


    </Routes>
    <Footer/>
    </div>
    </>
  )
}

export default App;
