// 

import React from "react";
// import Footer from "./Footer";
// import Journeys from "./Journeys";
import { Link } from "react-router-dom";
import { FiPlus } from 'react-icons/fi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import './Journeys.css';
import { useState } from "react";
import { useEffect } from 'react';
import axios from "axios";
import ReactTable from "react-table";  
import useCollapse from 'react-collapsed';
import Navbar from "./navbar";
 
function Addjourney()
{
 
 
  const options = [' Video', 'Link', 'Document'];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [jname, setJname] = useState('');
    const [remainingChars1, setRemainingChars1] = useState(155);
    const [dname, setDname] = useState('');
    const [remainingChars2, setRemainingChars2] = useState(155);
    const [overview, setOverview] = useState('');
    const [remainingChars3, setRemainingChars3] = useState(1024);
    const [completion, setCompletion] = useState('');
    const [remainingChars4, setRemainingChars4] = useState(1024);
    const [sname, setSname] = useState('');
    const [remainingChars5, setRemainingChars5] = useState(155);
    const [soverview, setSoverview] = useState('');
    const [remainingChars6, setRemainingChars6] = useState(155);
    const [scompletion, setScompletion] = useState('');
    const [remainingChars7, setRemainingChars7] = useState(155);
 
    function handleChange1(event) {
        const { value } = event.target;
        setJname(value);
        setRemainingChars1(155 - value.length);
 
      }
 
      function handleChange2(event) {
        const { value } = event.target;
        setDname(value);
        setRemainingChars2(155 - value.length);
 
      }
 
      function handleChange3(event) {
        const { value } = event.target;
        setOverview(value);
        setRemainingChars3(1024 - value.length);
 
      }
      function handleChange4(event) {
        const { value } = event.target;
        setCompletion(value);
        setRemainingChars4(1024 - value.length);
 
      }
      function handleChange5(event) {
        const { value } = event.target;
        setSname(value);
        setRemainingChars5(1024 - value.length);
 
      }
      function handleChange6(event) {
        const { value } = event.target;
        setSoverview(value);
        setRemainingChars6(1024 - value.length);
 
      }
      function handleChange7(event) {
        const { value } = event.target;
        setScompletion(value);
        setRemainingChars7(1024 - value.length);
 
      }
 
 
 
     const submitHandler = (e) => {
      e.preventDefault();  
      axios.post('http://localhost:3005/post_journey', {journeys: {
              journey_name : jname, 
              display_name: dname, 
              overview_message: overview, 
              complete_message: completion,
 
              }
              }
              ).then((response) => {
                  console.log(response);
                  }, (error) => {
                  console.log(error);}
              );
    };
 
    return(
      <>
      {/* <Navbar/> */}
      
      
       <div className="jbox">
       <div className="jform">  
 
        <h4><Link to="/builder">Journeys</Link>{'>'}{'>'}New Journey</h4>
 
        <div className="insideform">
            <form onSubmit={submitHandler}>
 
 
            <div className="journeyform">
            <h4>Journey Details</h4>
            <hr/>
            <div className="form-group">
            <label htmlFor="journeyname">Journey Name </label><br/>
            <input className="jname" type="text" name="journeyname" id="journeyname" value= {jname} onChange={handleChange1} required/>
            <p>Characters remaining: {remainingChars1}</p>
            </div>
 
            <div className="form-group">
            <label htmlFor="displayname">Display name </label><br/>
            <input className= "display" type="text" name="displayname" id="displayname" value= {dname} onChange={handleChange2} required/>
            <p>Characters remaining: {remainingChars2}</p>
            </div>
 
            <div className="form-group">
            <label htmlFor="overview_message">Overview Message </label><br/>
            <input className="overview" type="text" name="overview_message" id="overview_message" value= {overview} onChange={handleChange3} required/>
            <p>Characters remaining: {remainingChars3}</p>
            </div>
 
            <div className="form-group">
            <label htmlFor="completion_message">Completion Message </label><br/>
            <input  className="completion" type="text" name="completion_message" id="completion_message" value= {completion} onChange={handleChange4} required/>
            <p>Characters remaining: {remainingChars4}</p>
            </div>
            <div className="collapsible">
          <div className="headerx" {...getToggleProps()}>
              {isExpanded ? 'Collapse' : 'Expand'}
          </div>
          <div {...getCollapseProps()}>
              <div className="content">
              <div>
            <form>
            <h4>Untitled Stages</h4>
            <div className="journeyform">
            <div className="form-group">
            <label htmlFor="stagename">Stage Name </label>
            <input className="sname" type="text" name="stagename" id="stagename" value= {sname} onChange={handleChange1} required/>
            <p>Characters remaining: {remainingChars1}</p>
            </div>
 
            <div className="form-group">
            <label htmlFor="overview_message">Overview Message </label>
            <input className="overview" type="text" name="overview_message" id="overview_message" value= {overview} onChange={handleChange2}/>
            <p>Characters remaining: {remainingChars2}</p>
            </div>
 
            <div className="form-group">
            <label htmlFor="completion_message">Completion Message </label>
            <input  className="completion" type="text" name="completion_message" id="completion_message" value= {completion} onChange={handleChange3}/>
            <p>Characters remaining: {remainingChars3}</p>
            </div>
 
            </div>
            </form>
            </div>
 
              </div>
          </div>
          </div>
        
        
            </div>
            </form>
            </div>
            <div>
        <ul>
            <Link to="/addstage"><FiPlus />Add Stage</Link>
            <Link to="/addjourneyresources"><FiPlus />Add Journey Resources</Link>
            <Link to="/copystage"><AiOutlineCloudUpload />Copy Stage</Link>
            </ul>
        </div>
        </div>
        
        <div className="status">
        <h4>Publish</h4>
        <hr />
        <h5>Status:Draft</h5>
        <button disabled={true}>Save Draft</button>
        <button disabled={true}>Preview</button>
        <br/>
        <hr/>
        <button disabled={true}>Discard Updates</button>
        <button>Publish</button>
        </div>
        <div className="notes">
        <h4>Notes</h4>
        <hr />
        <br/>
        <p>No Notes to Display</p>
        <p>Notes can be added to a journey in draft or published status</p>
        <br/><hr/>
        <button disabled={true}>Add</button>
        </div> 
        {/* <Footer /> */}
        </div>
        </>
    );
}
export default Addjourney;