import React, { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { userIsAuthenticated } from '../helpers/Auth.js'

const Navbar = () => {

  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
  }, [location.pathname])

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }
  
  return (
    <>
      {
        userIsAuthenticated() ?

          // if isAuthenticated is true:
          <>
            <li className="navbar navbar-expand-md navbar-dark">
              <div className="container-fluid">
                <Link to="/myclassroom" className="home-link navbar-brand">My Class</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-bs-target="#collapsibleNavbar">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                  <ul className="navbar-links navbar-nav">
                    <li className="nav-item">
                      <Link to="/lessons" className="nav-link">Lesson Inspiration</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/teachers" className="nav-link">Teachers</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/addlesson" className="nav-link">Add New Lesson</Link>
                    </li>
                    <li className="nav-item">
                      <span className="logout-link nav-link" onClick={handleLogout}>Logout</span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </>

          :

          //isAuthenticated is false:
          <>
            <div></div>
          </>
      }
    </>
  )

}

export default Navbar