import React, { useState} from "react";
import Loginform from "./component/Loginform";
import { Routes, Route} from 'react-router-dom'
import './main.css'
import Footer from './Footer'
import ContentPage from './component/ContentPage'

function App() {
  return (
    <>
    <div className="page">
    <Routes>
      <Route path='/' element={<Loginform/>}></Route>
      <Route path='ContentPage' element={<ContentPage/>}></Route>
      

    </Routes>
    <Footer/>
    </div>
    </>
  )
}

export default App;
