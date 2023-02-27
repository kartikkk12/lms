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
function Userpage() {


    const [data,setData] = useState([])
    const cx = classNames.bind(styles);


    useEffect ( () => {
        getJourneys()
    },[])
  
    const getJourneys = () => {
      axios.get ('http://localhost:3000/user/show').then( json => setData(json.data))
    }
    const [show, setShow] = useState(false);
    const [relative, setRelative] = useState(true);
    const handleTriggerFullScreenOverlay = () => {
      setShow(true);
      setRelative(false);
    };

    const [term,setTerm]= useState('')

  
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
        
        if (!values.password) {
          errors.password = "*Password is required";
        } else if (values.password.length < 6) {
          errors.password = "*Password must be more than 6 characters";
        } 
        console.log("er" + Object.keys(errors).length)
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
                    
                  <label htmlFor="first_name">First Name </label>
                  <input type="text" name="first_name" id="first_name" className='inp' value={formValues.first_name} onChange={handleChange}/>
                </div>
                
                <div className="form-group">
                  <label htmlFor="last_name">Last Name </label>
                  <input type="text" name="last_name" id="last_name"className='inp'  value={formValues.last_name} onChange={handleChange}/>
                </div>
                <div className="form-group">
                  <label htmlFor="user_name">User Name </label>
                  <input type="text" name="user_name" id="user_name" className='inp' value={formValues.user_name} onChange={handleChange}/>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email </label>
                  <input type="email" name="email" id="email" className='inp' value={formValues.email} onChange={handleChange}/>
                </div>
              
                
                    <div>
                    <label>User Access</label>
                    </div>
                    <div className='gapbelow'>
                    <select name="user_access" id="user_access" class="select-control2" value={formValues.user_access} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="admin">Admin</option>
                    <option value="learner">Learner</option>
                    </select>
                    </div>
                    
                    
                    <div>
                    <label>User Status</label>
                    </div>
                    <select name="user_status" id="user_status" class="select-control2"  value={formValues.user_status} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    </select>
                    <input type="hidden" value={formValues.password} />
           
             
                
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
  
    const renderTable = () => {
      return data.filter((user) => {
        if(term==''){
          return user
        }
        else if(user.user_name.toLowerCase().includes(term.toLowerCase())){
          return user
        }
      }).map(user => {
        return (
          <tr>
            <td>{user.user_name}</td>
            <td>{user.email}</td>
            <td>{user.updated_at.slice(0,10)}</td>
            <td>{user.user_status}</td>
            <td>{user.user_access}</td>

  
            {/* add link to in last two columns */}
          </tr>
        )
      })
    }
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
            <tbody >{renderTable()}</tbody>
          </table>


    </>
  )
}

export default Userpage





