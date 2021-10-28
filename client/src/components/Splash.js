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
            <div className="splash site-wrapper grid">
              <h1>my class</h1>
              <div className="splash-button-container">
                <Link to="/login/"  className="splash-button login-button button-custom">
                  <div>
                    Log in
                  </div>
                </Link>
                <Link to="/register/"  className="splash-button register-button button-custom">
                  <span className="small-text">new here?</span>
                  Register
                </Link>
              </div>
            </div>
          </>
      }
    </>

  )
}

export default Splash