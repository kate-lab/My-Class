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
            <li className="navbar">
              <div className="container-fluid">
                <Link to="/myclassroom" className="home-link navbar-brand">My Class</Link>
                <div className="navbar-links">
                  <div className="nav-item">
                    <Link to="/lessons" className="nav-link">Lesson Inspiration</Link>
                  </div>
                  <div className="nav-item">
                    <Link to="/lessoneditor" className="nav-link">Add New Lesson</Link>
                  </div>
                  <div className="nav-item">
                    <span className="logout-link nav-link" onClick={handleLogout}>Logout</span>
                  </div>
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