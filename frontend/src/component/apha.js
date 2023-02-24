import React from 'react'
import { FiPlus , FiUpload, FiDownload} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BiArchiveIn } from "react-icons/bi";
import {BsFillShareFill } from "react-icons/bs"

function Alpha () {
  return (
    <>
    <div className='linker'>
      Add Journey Instructions
    </div>
    <br></br>

    <div className='linkgaps'>
    <Link to="/addjourney" className="linker"><FiPlus />Journey</Link>
    <Link to="" className="linker"><FiUpload/>Import Journeys</Link>
    <Link to="" className="linker"><BsFillShareFill/>Share Previews</Link>
    <Link to="" className="linker"><FiDownload />Content Report</Link>

    </div>

    </>
  )
}

export default Alpha 
