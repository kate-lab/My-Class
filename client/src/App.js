import React from 'react'
import { BrowserRouter , Route , Switch } from 'react-router-dom'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

import Classroom from './components/classroom/Classroom'
import LessonShow from './components/classroom/LessonShow'
import MyClassroom from './components/classroom/MyClassroom'

import LessonEditor from './components/lesson/LessonEditor'
import LessonList from './components/lesson/LessonList'

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
          <Route exact path='/lessons'>
            <LessonList />
          </Route>
          <Route path='/classroom/:id'>
            <Classroom />
          </Route>
          <Route path='/myclassroom'>
            <MyClassroom />
          </Route>
          <Route path='/lessons/:id'>
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
