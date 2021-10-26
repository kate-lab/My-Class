import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import LessonCard from './LessonCard'

const Classroom = () => {

  const [user, setUser] = useState(null)
  const [hasError, setHasError] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    
    const getUser = async () => {
      try {
        const { data } = await axios(`/api/auth/classroom/${id}`)
        setUser(data)
      } catch (err) {
        setHasError(true)
      }
    }
    getUser()
  }, [id])





  return (
    <>
      {user ?

        <div className="classroom">
          <div className="class-section">
            <div className="user-picture"></div>
            <div className="user-info">
              <div>Welcome to {user.display_name}&apos;s class</div>
              <div className="class-actions-section">
                <div>search</div>
                <div>filter by topic</div>
                <div>share class</div>
              </div>
            </div>
          </div >
          <div className="lesson-container">
            {user.lessons.length > 0 ?
              user.lessons.map(lesson => {
                return <LessonCard key={lesson._id} {...lesson} />
              })
              :
              <>
                {
                  hasError ?
                    <h2 className='error-message'>Oh! Something went wrong</h2>
                    :
                    <h2 className='error-message'>Loading</h2>
                }
              </>
            }
          </div>
        </div>

        :
        <>
          {
            hasError ?
              <h2 className='error-message'>Oh! Something went wrong</h2>
              :
              <h2 className='error-message'>Loading</h2>
          }
        </>
      }
    </>
  )

}

export default Classroom