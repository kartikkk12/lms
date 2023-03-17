import React from 'react'
import { FiPlus, FiUpload, FiDownload } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { BsFillShareFill } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'
// import styles from './beta.scss';

function Alpha() {
  const [data, setData] = useState([])

  useEffect(() => {
    getJourneys()
  }, [])

  const getJourneys = () => {
    axios.get('http://localhost:3000/journey/showall').then((json) => {
      setData(json.data)
      setPaginatedPage(_(json.data).slice(0).take(pageSize).value())
    })
  }
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setpagesize] = useState(4)
  const pageCount = data ? Math.ceil(data.length / pageSize) : 0
  const pages = _.range(1, pageCount + 1)
  const [paginatedPage, setPaginatedPage] = useState([])

  const pager = (page) => {
    setCurrentPage(page)
    const ind = (page - 1) * pageSize
    const x = _(data).slice(ind).take(pageSize).value()
    setPaginatedPage(x)
  }
  const pager2 = (page) => {
    const ind = (page - 1) * pageSize
    const x = _(data).slice(ind).take(pageSize).value()
    setPaginatedPage(x)
    setCurrentPage(1)
  }
  const pager3 = (page) => {
    if (page === 0 || page > pageCount) return
    setCurrentPage(page)
    const ind = (page - 1) * pageSize
    const x = _(data).slice(ind).take(pageSize).value()
    setPaginatedPage(x)
  }

  const [term, setTerm] = useState('')

  return (
    <>
      <div className="marg">
        <br />
        <Link to="" className="linker">
          Add Journey Instructions
        </Link>
        <br />
        <br />
      </div>

      <div className="linkgaps">
        <Link to="/addjourney" className="linker">
          <FiPlus />
          Journey
        </Link>
        <Link to="" className="linker">
          <FiUpload />
          Import Journeys
        </Link>
        <Link to="" className="linker">
          <BsFillShareFill />
          Share Previews
        </Link>
        <Link to="" className="linker">
          <FiDownload />
          Content Report
        </Link>
        <div class="sear2">
          <input
            type="text"
            className="leng"
            placeholder="Search by Journey"
            onChange={(event) => {
              setTerm(event.target.value)
            }}
          />
        </div>
      </div>
      <br />

      {/* <div class="input-group mb-3">
      <input type="text" className="form-control" placeholder="Search by Journey" aria-label="Username" aria-describedby="basic-addon1" onChange={(event)=> {
        setTerm(event.target.value);
      }}/>
    </div> */}

      <table className="table">
        <thead>
          <tr className="table-secondary">
            <th scope="col">Journey</th>
            <th scope="col"> Status</th>
            <th scope="col">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPage.filter((user) => {
            if (term == '') {
              return user
            } else if (
              user.journey_name.toLowerCase().includes(term.toLowerCase())
            ) {
              return user
            }
          }).length === 0 ? (
            <tr>
              <td colSpan="3" className="norecords">
                No records found.
              </td>
            </tr>
          ) : (
            paginatedPage
              .filter((user) => {
                if (term === '') {
                  return user
                } else if (
                  user.journey_name.toLowerCase().includes(term.toLowerCase())
                ) {
                  return user
                }
              })
              .map((user) => {
                return (
                  <tr>
                    <td>
                      <Link to={`/details/${user.id}`}>
                        {user.journey_name}
                      </Link>
                    </td>
                    <td>{user.journey_status}</td>
                    <td>{user.j_last_updated.slice(0, 10)}</td>

                    {/* add link to in last two columns */}
                  </tr>
                )
              })
          )}
        </tbody>
      </table>

      <div>
        <div className="topleft">
          <select
            value={pageSize}
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              setpagesize(parseInt(e.target.value))
            }}
            onClick={() => {
              pager2(1)
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <span>Records per page</span>
        </div>
        <div className="middlex">
          <ul className="pagination">
            <li>
              <p
                className="page-link"
                onClick={() => {
                  pager3(currentPage - 1)
                }}
              >
                Previous
              </p>
            </li>

            {pages.map((page) => {
              return (
                <li
                  className={
                    page === currentPage ? 'page-item active' : 'page-item'
                  }
                >
                  <p
                    className="page-link"
                    onClick={() => {
                      pager(page)
                    }}
                  >
                    {page}
                  </p>
                </li>
              )
            })}
            <li>
              <p
                className="page-link"
                onClick={() => {
                  pager3(currentPage + 1)
                }}
              >
                Next
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Alpha
