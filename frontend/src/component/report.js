import React from 'react'
import meeting_vid from './meeting_vid.mp4'
function report() {
  return (
    <div className="mainy">
      <div className="overlay"></div>
      <video src={meeting_vid} autoPlay loop muted />
      <div className="contenty">WELCOME TO REPORTS</div>
    </div>
  )
}

export default report
