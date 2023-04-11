import React from 'react'
// import Footer from "./Footer";
// import Journeys from "./Journeys";
import { Link, useNavigate } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { AiOutlineCloudUpload, AiOutlineCaretDown } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'
import './Journeys.css'
import { useState } from 'react'
// import { useEffect} from 'react';
import axios from 'axios'
// import ReactTable from "react-table";
import useCollapse from 'react-collapsed'
import Navbar from './navbar'

function Addjourney() {
  const options = [' Video', 'Link', 'Document']
  const [selectedOption, setSelectedOption] = useState(options[0])
  const handleOptionChange = (option) => {
    setSelectedOption(option)
  }
  const handleButtonClick = (index) => {
    const newIsMenuOpen = [...isMenuOpen]

    newIsMenuOpen[index] = !newIsMenuOpen[index]
    setIsMenuOpen(newIsMenuOpen)
  }

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

  const [isMenuOpen, setIsMenuOpen] = useState([false])
  const [remainingChars1, setRemainingChars1] = useState(155)
  const [remainingChars2, setRemainingChars2] = useState(155)
  const [remainingChars3, setRemainingChars3] = useState(1024)
  const [remainingChars4, setRemainingChars4] = useState(1024)
  const [remainingChars5, setRemainingChars5] = useState([155])
  const [remainingChars6, setRemainingChars6] = useState([1024])
  const [remainingChars7, setRemainingChars7] = useState([1024])
  const navigate = useNavigate()
  const [journeyForm, setJourneyForm] = useState({
    journey_name: '',
    display_name: '',
    overview_message: '',
    completion_message: '',
    journey_status: '',
  })
  function handleChange1(e) {
    const { name, value } = e.target
    setJourneyForm({ ...journeyForm, [name]: value })
    setRemainingChars1(155 - value.length)
  }

  function handleChange2(e) {
    const { name, value } = e.target
    setJourneyForm({ ...journeyForm, [name]: value })
    setRemainingChars2(155 - value.length)
  }

  function handleChange3(e) {
    const { name, value } = e.target
    setJourneyForm({ ...journeyForm, [name]: value })
    setRemainingChars3(1024 - value.length)
  }
  function handleChange4(e) {
    const { name, value } = e.target
    setJourneyForm({ ...journeyForm, [name]: value })
    setRemainingChars4(1024 - value.length)
  }
  const handleChange5 = (e, index) => {
    const { name, value } = e.target
    const list = [...stageForm]
    list[index][name] = value
    const words = [...remainingChars5]
    words[index] = 155 - value.length
    setRemainingChars5(words)
    setStageForm(list)
    console.log(stageForm)
  }
  const handleChange6 = (e, index) => {
    const { name, value } = e.target
    const list = [...stageForm]
    list[index][name] = value
    const words = [...remainingChars6]
    words[index] = 1024 - value.length
    setRemainingChars6(words)
    setStageForm(list)
    console.log(stageForm)
  }
  const handleChange7 = (e, index) => {
    const { name, value } = e.target
    const list = [...stageForm]
    list[index][name] = value
    const words = [...remainingChars7]
    words[index] = 1024 - value.length
    setRemainingChars7(words)
    setStageForm(list)
    console.log(stageForm)
  }

  const handlesubmitall = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:3000/journey/create2', {
        journey: {
          journey_name: journeyForm.journey_name,
          display_name: journeyForm.display_name,
          overview_message: journeyForm.overview_message,
          completion_message: journeyForm.completion_message,
          journey_status: 'active',
        },
        stages: stageForm,
      })
      .then(
        (response) => {
          console.log(response)
          // alert('submitted succesfully')
        },
        (error) => {
          console.log(error)
          alert('error')
        }
      )
    navigate('/builder')
  }
  const [stageForm, setStageForm] = useState([])
  const handleremove = (index) => {
    const list = [...stageForm]
    list.splice(index, 1)
    setStageForm(list)
    const words1 = [...remainingChars5]
    const words2 = [...remainingChars6]
    const words3 = [...remainingChars7]

    console.log(stageForm)
    words1[index] = 155
    setRemainingChars5(words1)
    words2[index] = 1024
    setRemainingChars6(words2)
    words3[index] = 1024
    setRemainingChars7(words3)
  }
  const handleaddmore = () => {
    setStageForm([
      ...stageForm,
      {
        stage_name: '',
        overview_message: '',
        completion_message: '',
        activities: [],
      },
    ])
    setRemainingChars5([...remainingChars5, 155])
    setRemainingChars6([...remainingChars6, 1024])
    setRemainingChars7([...remainingChars7, 1024])
  }

  return (
    <>
      <Navbar />

      <div className="jbox">
        <div className="jform">
          <h4>
            <Link to="/builder">Journeys</Link>
            {'>'}
            {'>'}New Journey
          </h4>

          <div classname="insideform">
            <form id="mainform">
              <div className="journeyform">
                <h4>Journey Details</h4>
                <hr />
                <div className="form-group">
                  <label className="bolder2" htmlFor="journey_name">
                    <span className="redstar">*</span>Journey Name{' '}
                  </label>
                  <br />
                  <input
                    className="jname"
                    type="text"
                    name="journey_name"
                    id="journey_name"
                    value={journeyForm.journey_name}
                    onChange={(e) => handleChange1(e)}
                    required
                  />{' '}
                  <br />
                  <p className="bolder">
                    Characters remaining:{' '}
                    <span className="bolder2">{remainingChars1}</span>
                  </p>
                </div>

                <div className="form-group">
                  <label className="bolder2" htmlFor="display_name">
                    <span className="redstar">*</span>Display name{' '}
                  </label>
                  <br />
                  <input
                    className="display"
                    type="text"
                    name="display_name"
                    id="display_name"
                    value={journeyForm.display_name}
                    onChange={(e) => handleChange2(e)}
                    required
                  />{' '}
                  <br />
                  <p className="bolder">
                    Characters remaining:
                    <span className="bolder2">{remainingChars2}</span>
                  </p>
                </div>

                <div className="form-group">
                  <label className="bolder2" htmlFor="overview_message">
                    <span className="redstar">*</span>Overview Message{' '}
                  </label>
                  <br />
                  <input
                    className="overview"
                    type="text"
                    name="overview_message"
                    id="overview_message"
                    value={journeyForm.overview_message}
                    onChange={(e) => handleChange3(e)}
                    required
                  />{' '}
                  <br />
                  <p className="bolder">
                    Characters remaining:{' '}
                    <span className="bolder2">{remainingChars3}</span>
                  </p>
                </div>

                <div className="form-group">
                  <label className="bolder2" htmlFor="completion_message">
                    <span className="redstar">*</span>Completion Message{' '}
                  </label>
                  <br />
                  <input
                    className="completion"
                    type="text"
                    name="completion_message"
                    id="completion_message"
                    value={journeyForm.completion_message}
                    onChange={(e) => handleChange4(e)}
                    required
                  />{' '}
                  <br />
                  <p className="bolder">
                    Characters remaining:{' '}
                    <span className="bolder2">{remainingChars4}</span>
                  </p>
                </div>

                {/* <h4><AiFillDelete/></h4> */}
                {stageForm.map((input, index) => {
                  return (
                    <div key={index} className="collapsible">
                      <div className="headerx">
                        {isExpanded ? (
                          <span {...getToggleProps()}>
                            <AiOutlineCaretDown />
                            {stageForm[index].stage_name.length
                              ? stageForm[index].stage_name
                              : 'Untitled ' + (index + 1)}
                          </span>
                        ) : (
                          <span {...getToggleProps()}>
                            {stageForm[index].stage_name.length
                              ? stageForm[index].stage_name
                              : 'Untitled ' + (index + 1)}
                          </span>
                        )}
                        {
                          <span
                            className="dest"
                            onClick={() => handleremove(index)}
                          >
                            <AiFillDelete></AiFillDelete>
                          </span>
                        }
                      </div>
                      <div {...getCollapseProps()}>
                        <div className="content">
                          <div>
                            <form>
                              <div className="journeyform">
                                <div className="form-group">
                                  <label
                                    className="bolder2"
                                    htmlFor="stage_name"
                                  >
                                    <span className="redstar">*</span>Stage Name{' '}
                                  </label>
                                  <br />

                                  <input
                                    className="fonter"
                                    type="text"
                                    name="stage_name"
                                    id="stage_name"
                                    value={stageForm[index].stage_name}
                                    onChange={(e) => handleChange5(e, index)}
                                  />
                                  <br />

                                  <p className="bolder">
                                    Characters remaining:{' '}
                                    <span className="bolder2">
                                      {remainingChars5[index]}
                                    </span>
                                  </p>
                                </div>

                                <div className="form-group">
                                  <label
                                    className="bolder2"
                                    htmlFor="overview_message"
                                  >
                                    <span className="redstar">*</span>Overview
                                    Message{' '}
                                  </label>
                                  <input
                                    className="overview"
                                    type="text"
                                    name="overview_message"
                                    id="overview_message"
                                    onChange={(e) => handleChange6(e, index)}
                                  />{' '}
                                  <br />
                                  <p className="bolder">
                                    Characters remaining:
                                    <span className="bolder2">
                                      {remainingChars6[index]}
                                    </span>
                                  </p>
                                </div>

                                <div className="form-group">
                                  <label
                                    className="bolder2"
                                    htmlFor="completion_message"
                                  >
                                    <span className="redstar">*</span>Completion
                                    Message{' '}
                                  </label>
                                  <input
                                    className="completion"
                                    type="text"
                                    name="completion_message"
                                    id="completion_message"
                                    onChange={(e) => handleChange7(e, index)}
                                  />{' '}
                                  <br />
                                  <p className="bolder">
                                    Characters remaining:{' '}
                                    <span className="bolder2">
                                      {remainingChars7[index]}
                                    </span>
                                  </p>
                                </div>

                                <Link
                                  className="dropdown-button"
                                  onClick={(e) => handleButtonClick(index)}
                                >
                                  <FiPlus />
                                  Add Activity
                                </Link>
                                <div
                                  className={`dropdown-menu ${
                                    isMenuOpen[index]
                                      ? 'dropdown-menu--open'
                                      : 'dropdown-menu--closed'
                                  }`}
                                >
                                  {options.map((option) => (
                                    <div
                                      key={option}
                                      onClick={() => handleOptionChange(option)}
                                      className={`dropdown-menu-item ${
                                        selectedOption === option
                                          ? 'dropdown-menu-item--active'
                                          : ''
                                      }`}
                                    >
                                      {option}
                                    </div>
                                  ))}
                                </div>

                                <br />
                                <br />
                                <div>
                                  <table className="centerx">
                                    <tr className="centerx">
                                      <th className="centerx">Activity</th>
                                      <th className="centerx">Type</th>
                                      <th className="centerx">Data</th>
                                    </tr>
                                    <tbody>
                                      {stageForm[index].activities.length >
                                      0 ? (
                                        stageForm[index].activities.map(
                                          (user) => {
                                            return (
                                              <tr>
                                                <td>{user.activity_type}</td>
                                                <td>{user.activity_type}</td>
                                                <td>{user.activity_data}</td>
                                              </tr>
                                            )
                                          }
                                        )
                                      ) : (
                                        <tr>
                                          <td colSpan="3" className="centerx">
                                            No Activities Present
                                          </td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </form>
          </div>
          <div>
            <ul>
              <Link to="" onClick={handleaddmore}>
                <FiPlus />
                Add Stage
              </Link>
              <Link to="">
                <FiPlus />
                Add Journey Resources
              </Link>
              <Link to="">
                <AiOutlineCloudUpload />
                Copy Stage
              </Link>
              <Link
                to=""
                form="mainform"
                type="submit"
                onClick={handlesubmitall}
              >
                Submit
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
export default Addjourney
