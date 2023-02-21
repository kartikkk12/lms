import React from 'react'
import {Menu} from 'antd'
import ContentJourney from './contentJourney'
function MenuBar() {
  return (
    <>
  <div className="sidebar">
    <Menu items= {[
      {label:'Journeys'},
      {label:'Activites'},
      {label:'Events'}
    ]}>
    </Menu>
    </div>
    <ContentJourney/>
    </>
  )
}

export default MenuBar

