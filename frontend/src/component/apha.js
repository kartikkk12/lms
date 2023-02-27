import React from 'react'
import { FiPlus , FiUpload, FiDownload} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BiArchiveIn } from "react-icons/bi";
import {BsFillShareFill } from "react-icons/bs";
import Table from 'terra-table'
import {useState, useEffect} from 'react'
import axios from 'axios'
import SearchSelect from 'terra-form-select/lib/SearchSelect';
import classNames from 'classnames/bind';
// import styles from './beta.scss';

function Alpha () {

  const [data,setData] = useState([])

  useEffect ( () => {
      getJourneys()
  },[])

  const getJourneys = () => {
    axios.get ('http://localhost:3000/journey/showall').then( json => setData(json.data))
  }

  const renderTable = () => {
    return data.filter((user) => {
      if(term==''){
        return user
      }
      else if(user.journey_name.toLowerCase().includes(term.toLowerCase())){
        return user
      }
    }).
      map(user => {
      return (
        <tr>
          <td>{user.journey_name}</td>
          <td>{user.journey_status}</td>
          <td>{user.j_last_updated.slice(0,10)}</td>

          {/* add link to in last two columns */}
        </tr>
      )
    })
  }
  const [term,setTerm]= useState('')
 
  return (
    <>

    <div className='marg'>
      <br/>
    <Link to="" className='linker'>
      Add Journey Instructions
    </Link>
    <br/>
    <br/>
    </div>
  

    <div className='linkgaps'>
    <Link to="/addjourney" className="linker"><FiPlus />Journey</Link>
    <Link to="" className="linker"><FiUpload/>Import Journeys</Link>
    <Link to="" className="linker"><BsFillShareFill/>Share Previews</Link>
    <Link to="" className="linker"><FiDownload />Content Report</Link>
    <div class="sear2">
      <input type="text" className="leng" placeholder="Search by Journey"  onChange={(event)=> {
        setTerm(event.target.value);
      }}/>
    </div>
    </div>
    <br/>
 
    {/* <div class="input-group mb-3">
      <input type="text" className="form-control" placeholder="Search by Journey" aria-label="Username" aria-describedby="basic-addon1" onChange={(event)=> {
        setTerm(event.target.value);
      }}/>
    </div> */}

        <table className="table">
            <thead >
              <tr  className='table-secondary'>
                <th scope='col'>Journey</th>
                <th scope='col'> Status</th>
                <th scope='col'>Last Updated</th>
                
              </tr>
            </thead>
            <tbody >{renderTable()}</tbody>
          </table>


    </>
  )
}

export default Alpha 
