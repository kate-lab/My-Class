import React from 'react'
import { BrowserRouter , Route , Switch } from 'react-router-dom'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

import Teachers from './components/teachers/Teachers'

import Classroom from './components/classroom/Classroom'
import LessonShow from './components/classroom/LessonShow'
import MyClassroom from './components/classroom/MyClassroom'

import AddLesson from './components/lesson/AddLesson'
import EditLesson from './components/lesson/EditLesson'
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
          <Route path='/teachers'>
            <Teachers />
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
          <Route exact path='/lessons/:id'>
            <LessonShow />
          </Route>
          <Route path='/lessons/:id/edit'>
            <EditLesson />
          </Route>
          <Route path='/addlesson'>
            <AddLesson />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
