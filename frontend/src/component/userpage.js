import React from 'react'
import { FiPlus , FiUpload, FiDownload} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BiArchiveIn } from "react-icons/bi";
import {BsFillShareFill } from "react-icons/bs";
import Table from 'terra-table'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { AiOutlineImport } from 'react-icons/ai';
import { AiOutlineCloudUpload,AiOutlineSearch } from 'react-icons/ai';
import Overlay from 'terra-overlay';
import OverlayContainer from 'terra-overlay/lib/OverlayContainer';
import classNames from 'classnames/bind';
import styles from './OverlayDocCommon.module.scss';
import _ from "lodash";
function Userpage() {


    const [data,setData] = useState([])
    const [pageSize,setpagesize]=useState(3)
    const cx = classNames.bind(styles);
    const pageCount= data ? Math.ceil(data.length/pageSize) : 0 ;
    const pages= _.range(1,pageCount+1)
    const [term,setTerm]= useState('')
    const [paginatedPage,setPaginatedPage]=useState([])

    useEffect ( () => {
        getJourneys()
    },[])
  
    const getJourneys = () => {
      axios.get ('http://localhost:3000/user/show').then( json => {
        setData(json.data)
        setPaginatedPage(_(json.data).slice(0).take(pageSize).value())
    })
    }
    const [show, setShow] = useState(false);
    const [relative, setRelative] = useState(true);
    const handleTriggerFullScreenOverlay = () => {
      setShow(true);
      setRelative(false);
    };

    const [currentPage,setCurrentPage]=useState(1)

    const pager = (page) =>{
        setCurrentPage(page)
        const ind= (page-1)*pageSize
        const x=_(data).slice(ind).take(pageSize).value()
        setPaginatedPage(x)
    }
    const pager2 = (page) =>{
      const ind= (page-1)*pageSize
      const x=_(data).slice(ind).take(pageSize).value()
      setPaginatedPage(x)
      setCurrentPage(1)

  }
  const pager3 = (page) =>{
    if(page===0 || page>pageCount)return;
    setCurrentPage(page)
    const ind= (page-1)*pageSize
    const x=_(data).slice(ind).take(pageSize).value()
    setPaginatedPage(x)
  }
  
    const handleOnRequestESC = () => {
      setShow(false);
    };
    const initialValues = { 
        user_name:"",
        last_name:"",
        first_name:"",
        email:"",
        user_access:"",
        user_status:""
       };

       const [formValues, setFormValues] = useState(initialValues);
       const [formErrors, setFormErrors] = useState({});
       const [currUser, setUser] = useState("");
     
       const handleChange = (e) => {
         const { name, value } = e.target;
         setFormValues({ ...formValues, [name]: value });
       };
     
       const handleSubmit = (e) => {
         e.preventDefault();
     
         setFormErrors(validate(formValues));
         
         axios.post('http://localhost:3000/register', {user: { 
                 user_name: formValues.user_name,
                 last_name: formValues.last_name,
                 first_name:formValues.first_name,
                 email:formValues.email,
                 user_access:formValues.user_access,
                 user_status:formValues.user_status,
                 password:'121212',
                 organisation_id:10

             }
       }).then((response) => {
           setUser(response.data.user_name)
           console.log(currUser)
           getJourneys()
           handleOnRequestESC()
       }).catch( (error)=> {
         if (Object.keys(formErrors).length === 0) {
           console.log(formValues);
           // alert("No user found")
         }
          console.log("Invalid email or password")
     
       })
      //redirect to other page
       };

       const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.user_name) {
          errors.user_name = "*Username is required";
        }
        if (!values.email) {
            errors.email = "Email is required!";
          } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
          }
        
        
        Object.keys(errors).length ? formErrors.main="Enter data properly" : formErrors.main=""
        return errors;
      };
    const addOverlay = () => {
      return (
        <Overlay isOpen={show} isRelativeToContainer={relative} isScrollable={true} zIndex="6000">
          <div className="adduser">
            <form>
              <div >
                <div className='hedi'>Add User</div>
                <div >
                  <p className='redstar'>{ formErrors.main}</p>
                  <label htmlFor="first_name"><span className='redstar'>*</span>First Name </label>
                  <input type="text" name="first_name" id="first_name" className='inp' value={formValues.first_name} onChange={handleChange}/>
                </div>
                
                <div className="form-group">
                  <label htmlFor="last_name"><span className='redstar'>*</span>Last Name </label>
                  <input type="text" name="last_name" id="last_name"className='inp'  value={formValues.last_name} onChange={handleChange}/>
                </div>
                <div className="form-group">
                  <label htmlFor="user_name"><span className='redstar'>*</span>User Name </label>
                  <input type="text" name="user_name" id="user_name" className='inp' value={formValues.user_name} onChange={handleChange}/>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email </label>
                  <input type="email" name="email" id="email" className='inp' value={formValues.email} onChange={handleChange}/>
                </div>
              
                
                    <div>
                    <label><span className='redstar'>*</span>User Access</label>
                    </div>
                    <div className='gapbelow'>
                    <select name="user_access" id="user_access" class="select-control2" value={formValues.user_access} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="admin">Admin</option>
                    <option value="learner">Learner</option>
                    </select>
                    </div>
                    
                    
                    <div>
                    <label><span className='redstar'>*</span>User Status</label>
                    </div>
                    <select name="user_status" id="user_status" class="select-control2"  value={formValues.user_status} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    </select>
           
             
                
                <hr />
                <input type="submit" value="Add" className='buton2' onClick={handleSubmit}></input>
                <Link to="/user" className="linker" onClick={handleOnRequestESC} >Cancel</Link>
                <br />
              </div>
            </form>
          </div>
       
        </Overlay>
      );
    };
  
  return (
    <>
    <div className='marg'>
      <br/>
    <Link to="" className='linker'>
      Import Users Instructions
    </Link>
    <br/>
    <br/>
    </div>
  

    <div className='linkgaps'>
    <Link to="" className="linker" ><FiUpload/>Import Users</Link>
    <Link to="" className="linker"  onClick={handleTriggerFullScreenOverlay} ><FiPlus />Add User</Link>
    <Link to="" className="linker"><FiDownload />Export Users</Link>
    {/* <span class="input-group mb-3"> */}
    <div  className="sear">
      <input type="text" placeholder="Search by Username" className='leng' onChange={(event)=> {
        setTerm(event.target.value);
      }}/>
      </div>
    {/* </span> */}
  
    </div>
    {/* <span class="input-group mb-3">
      <input type="text"  placeholder="Search"  onChange={(event)=> {
        setTerm(event.target.value);
      }}/>
    </span> */}
    <br/>
    
    <OverlayContainer className={cx('overlay-container')} overlay={addOverlay()}></OverlayContainer>
 

   
        <table className="table">
            <thead >
              <tr  className='table-secondary'>
                <th scope='col'>Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Last Updated</th>
                <th scope='col'>User Status</th>
                <th scope='col'>User Access</th>

                
              </tr>
            </thead>
            <tbody >
            {paginatedPage.filter((user) => {
        if(term==''){
          return user
        }
        else if(user.user_name.toLowerCase().includes(term.toLowerCase())){
          return user
        }
      }).length === 0 ? (
        <tr>
          <td colSpan="5" className="norecords">No records found.</td>
        </tr>
      ) : (
        paginatedPage
          .filter((user) => {
            if (term === "") {
              return user;
            } else if (
              user.user_name.toLowerCase().includes(term.toLowerCase())
            ) {
              return user;
            }
          }))
      .map(user => {
        return (
          <tr>
            <td>{user.user_name}</td>
            <td>{user.email}</td>
            <td>{user.updated_at.slice(0,10)}</td>
            <td>{user.user_status}</td>
            <td>{user.user_access}</td>
          </tr>
        )
      })}</tbody>
          </table>
          <div >
          <div className='topleft'>

            <select value={pageSize}  class="form-select" aria-label="Default select example" onChange={e => {setpagesize(parseInt(e.target.value))}} onClick={()=>{pager2(1)}}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <span>Records per page</span>

            </div>
            <div className='middlex'>
            <ul className='pagination'>
            <li><p className='page-link' onClick={()=>{pager3(currentPage-1)}}>Previous</p></li>

                {pages.map( page => { return (
                    <li className={ page === currentPage ? "page-item active" : "page-item"}>
                    <p className="page-link" onClick={()=> {pager(page)}}>{page}</p>
                    </li>
                )
                })}
              <li><p className='page-link' onClick={()=>{pager3(currentPage+1)}}>Next</p></li>

            </ul>
            </div>
          
            </div>


    </>
  )
}

export default Userpage





