// import { getPayload, getTokenFromLocalStorage } from '../helpers/Auth'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import LessonCard from './LessonCard'

const Classroom = () => {

  const [ lessons , setLessons ] = useState
  const [ user, setUser ] = useState(null)

  const [ hasError, setHasError ] = useState(false)
  
  const { id } = useParams()

  useEffect(() => {

    const getLessons = async () => {
      try {
        const { data } = await axios('/api/lessons')
        setLessons(data)
      } catch (error) {
        setHasError(true)
      }
    }
    getLessons()

  }, [setLessons])


  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios(`/api/users/${id}`)
        setUser(data)
      } catch (err) {
        setHasError(true)
      }
    }
    getUser()
  }, [id])





  return (
    <>
      <div className="class-section">
        <div className="teacher-picture"></div>
        <div className="class-info">
          <div>Welcome to {user.name}&apos;s class</div>
          <div className="class-actions-section">
            <div>search</div>
            <div>filter by topic</div>
            <div>share class</div>
          </div>
        </div>
      </div>
      <div className="lesson-container">
        {lessons.length > 0 ? 
          lessons.map( lesson => {
            return <LessonCard key={lesson._id} {...lesson}/>
          })
          :
          <>
            {hasError ? 
              <h2 className='error-message'>Oh! Something went wrong</h2> 
              : 
              <h2 className='error-message'>Loading</h2> 
            }
          </>
        }
      </div>
    </>
  )

}

export default Classroom