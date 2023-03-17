// //

// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import {useNavigate} from 'react-router-dom'

// function Loginform() {
//     const [credentials, setCredentials] = useState({user_name: "", password:""});
//     const [formErrors, setFormErrors] = useState({});
//     const [currUser, setUser] = useState("");
//     const navigate=useNavigate()

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setCredentials({ ...credentials, [name]: value });
//       };

//      const submitHandler = (e) => {
//           e.preventDefault();
//           setFormErrors(validate(credentials));

//           axios.post('http://localhost:3000/login', {user: {

//                   user_name: credentials.user_name,
//                   password: credentials.password,

//                   }}).then((response) => {
//                       console.log(response);
//                       console.log("Loggedin")
//                       alert("Logged in")
//                       // setUser(response.data.user_name)
//                       navigate('/ContentPage')
//                     }).catch( (error) => {
//                       console.log(error);
//                       console.log("incorrect email id or password")
//                       alert("Enter correct email id or password")
//                 });
//         };

//     useEffect(() => {
//         console.log(formErrors);
//         if (Object.keys(formErrors).length === 0 && currUser) {
//           console.log(credentials);
//         }
//       }, [formErrors]);

//       const validate = (values) => {
//         const errors = {};
//         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

//         if (!values.email) {
//           errors.email = "Email is required!";
//         } else if (!regex.test(values.email)) {
//           errors.email = "This is not a valid email format!";
//         }

//         if (!values.password) {
//           errors.password = "Password is required";
//         } else if (values.password.length < 4) {
//           errors.password = "Password must be more than 4 characters";
//         } else if (values.password.length > 10) {
//           errors.password = "Password cannot exceed more than 10 characters";
//         }
//         return errors;

//       }

//     return(
//         <div>
//         <div className="login">

//       <h1>Login</h1>
//       <form >

//       <div className="form-group">
//             <label htmlFor="text">User name :   </label>
//             <input type="text" name="user_name" id="user_name" onChange={handleChange} value={credentials.user_name}/>
//         </div>
//         <p>{formErrors.user_name}</p>

//         <div className="form-group">
//             <label htmlFor="password">Password : </label>
//             <input type="password" name="password" id="password" onChange={handleChange} value={credentials.password}/>
//         </div>
//         <p>{formErrors.password}</p>
//         <input type="submit" onClick={submitHandler} value ="Login"></input>

//         <a href="#">Forgot Password?</a>
//         <br/>
//         First time users <a href="/signup">Click</a> here
//       </form>
//     </div>
//     </div>
//     )
// }

// export default Loginform

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Header from './header'

function Loginform() {
  const initialValues = {
    password: '',
    user_name: '',
  }

  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [currUser, setUser] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setFormErrors(validate(formValues))

    axios
      .post(
        'http://localhost:3000/login',
        {
          user: {
            password: formValues.password,
            user_name: formValues.user_name,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        setUser(response.data.user_name)
        console.log(currUser)
        navigate('/builder')
      })
      .catch((error) => {
        if (Object.keys(formErrors).length === 0) {
          console.log(formValues)
          // alert("No user found")
        }

        console.log('Invalid email or password')
      })

    //redirect to other page
  }

  useEffect(() => {
    console.log(formErrors)

    if (Object.keys(formErrors).length === 0 && currUser) {
      console.log(formValues)
    }
  }, [formErrors])

  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    if (!values.user_name) {
      errors.user_name = '*Username is required'
    }

    if (!values.password) {
      errors.password = '*Password is required'
    } else if (values.password.length < 6) {
      errors.password = '*Password must be more than 6 characters'
    }
    // if(!values.)
    console.log('er' + Object.keys(errors).length)
    return errors
  }

  return (
    <>
      <Header />

      <div className="container">
        <form>
          <div className="uiform">
            <label>
              <b>Login</b>
            </label>

            <div className="field">
              {/* <label>Username</label> */}

              <input
                type="text"
                name="user_name"
                placeholder="Username"
                value={formValues.user_name}
                className="inputbox"
                onChange={handleChange}
              />
            </div>
            <p className="err">{formErrors.user_name}</p>

            <div className="field">
              {/* <label>Password</label> */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p className="err">{formErrors.password}</p>

            <div>
              <label>
                <b>Organization</b>
              </label>
            </div>
            <div>
              <select
                name="org_id"
                id="org_id"
                class="select-control"
                onchange={handleChange}
              >
                <option value="">Select</option>
                <option value="10">Northgate office</option>
                <option value="11">Manyata Techpark</option>
              </select>
              <p className="err">{formErrors.org_id}</p>
            </div>

            <div className="junior">
              <button onClick={handleSubmit} className="buton">
                Log in
              </button>
              <br />
              <span>New user? </span>
              <Link to="/signup">Create an account</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Loginform
