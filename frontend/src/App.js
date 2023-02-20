import React, { useState} from "react";
import Loginform from "./component/Loginform";
import { Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
    <div className="page">
    <Routes>
      <Route path='/' element={<Loginform/>}></Route>
    </Routes>
    </div>
    </>
  )
}

export default App;
