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
            <li className='navbar'>
              <Link to={'/myclassroom'}>My Class</Link>
              <div>
                <Link to='/lessoneditor'>Add New Lesson</Link>
                <span className='logout-link' onClick={handleLogout}>Logout</span>
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