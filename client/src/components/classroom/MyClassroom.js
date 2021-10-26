import React, { useState, useEffect } from 'react'
import axios from 'axios'

import LessonCard from './LessonCard'

const MyClassroom = () => {

  const [ profile, setProfile ] = useState(null)

  const [ hasError, setHasError ] = useState(false)
  
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios('/api/auth/myclassroom')
        setProfile(data)
      } catch (err) {
        setHasError(true)
      }
    }
    getProfile()
  })

  return (

    <>

      <div className="class-section">
        <div className="teacher-picture">
          <img src={profile.profile_image} alt={profile.display_name}></img>
        </div>
        <div className="class-info">
          <div>Welcome to {profile.display_name}&apos;s class</div>
          <div className="class-actions-section">
            <div>search</div>
            <div>filter by topic</div>
            <div>share class</div>
          </div>
        </div>
      </div>
      <div className="lesson-container">
        {profile.lessons.length > 0 ? 
          profile.lessons.map( lesson => {
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

export default MyClassroom