import React from 'react'
import { userIsAuthenticated } from '../helpers/Auth.js'


// import axios from 'axios'
// import React, { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
// import { userIsAuthenticated, getTokenFromLocalStorage } from '../helpers/Auth.js'
// import Select from 'react-select'
import 'dotenv/config'


const LessonEditor = () => {

  return (

    <>
      {userIsAuthenticated() ?
        // if isAuthenticated is true:
        <div>ADD OR EDIT RECIPE</div>
        :
        // if isAuthenticated is false:
        <>
          <h2>Please log in to add or edit lessons</h2>
        </>
      }
    </>
  )
}

export default LessonEditor