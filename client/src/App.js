import React from 'react'
import { BrowserRouter , Route , Switch } from 'react-router-dom'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

import Classroom from './components/classroom/Classroom'
import LessonShow from './components/classroom/LessonShow'

import LessonEditor from './components/lesson/LessonEditor'

import Splash from './components/Splash'
import Navbar from './components/common/Navbar'


function App() {
  return (
    <div className='site-wrapper'>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Splash />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/classroom/:id'>
            <Classroom />
          </Route>
          <Route path='/lesson/:id'>
            <LessonShow />
          </Route>
          <Route path='/lessoneditor'>
            <LessonEditor />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
