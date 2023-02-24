import {Menu} from 'antd'
import React from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'

function MenuBar() {
  const Navigate = useNavigate()
  return (
    <>
  <div className="sidebar">
    <Menu onClick={(key)=> {
      Navigate('/ContentPage/journeytable')
      } } items= {[
      {label:'Journeys', key: "/journeytable"},
      {label:'Activites', key: '/activitiestable'},
      {label:'Events', key: '/eventstable'}
    ]}>
    </Menu>
    </div>
    </>
  )
}

function ContentJourney() {
  return (
    <div>
      <Routes>
        <Route path='/ContentPage/journeytable' element={<div>Journey table</div>}></Route>
        <Route path='/activitiestable' element={<div>activities table</div>}></Route>
        <Route path='/eventstable' element={<div>events table</div>}></Route>
      </Routes>
    </div>
  )
}


export default MenuBar

