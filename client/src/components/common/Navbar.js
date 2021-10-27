import React, { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { userIsAuthenticated, getPayload } from '../helpers/Auth.js'

const Navbar = () => {

  const history = useHistory()
  const location = useLocation()
  const payload = getPayload()

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
              <Link to={`/classroom/${payload.id}`} className="home-link">My Class</Link>
              <div className="links">
                <Link to="/lessoneditor">Add New Lesson</Link>
                <span className="logout-link" onClick={handleLogout}>Logout</span>
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