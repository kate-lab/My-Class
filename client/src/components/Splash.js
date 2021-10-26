import React from 'react'
import { Link } from 'react-router-dom'
import MyClassroom from './classroom/MyClassroom.js'
import { userIsAuthenticated } from './helpers/Auth.js'

const Splash = () => {

  return (
    <>
      {
        userIsAuthenticated() ?

          // if isAuthenticated is true:
          <>
            <MyClassroom />
          </>

          :

          //isAuthenticated is false:
          <>
            <div className="splash">
              <h1>My class</h1>
              <Link to="/login/">
                <div className="login-button button">
                  Log in
                </div>
              </Link>
              <Link to="/register/">
                <div className="login-button button">
                  <span className="small-text">New here?</span>
                  Register
                </div>
              </Link>
            </div>
          </>
      }
    </>

  )
}

export default Splash