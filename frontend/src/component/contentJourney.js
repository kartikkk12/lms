import React from 'react'
import {Route, Routes} from 'react-router-dom'
function ContentJourney() {
  return (
    <div>
      <Routes>
        <Route path='/journeytable' element={<div>Journey table</div>}></Route>
        <Route path='/activitiestable' element={<div>activities table</div>}></Route>
        <Route path='/eventstable' element={<div>events table</div>}></Route>
      </Routes>
    </div>
  )
}

export default ContentJourney
