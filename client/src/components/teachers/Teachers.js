import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Components
import TeacherCard from './TeacherCard.js'

const Teachers = () => {

  const [teachers, setTeachers] = useState([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const { data } = await axios('/api/auth/teachers')
        setTeachers(data)
      } catch (err) {
        setHasError(true)
      }
    }
    getTeachers()
  }, []) 

  return (
    <div className="grid">
      <div className="container">
        <div className="lessons-title-section">
          <h2 className="orange-background auth-title">Class Teachers</h2>
        </div>
  
        <div className="teacher-container container">
          <div className="row g-2">
  
            {teachers.length > 0 ?
  
              teachers.map(teacher => {
                return <TeacherCard key={teacher._id} {...teacher} />
              })
  
              :
  
              <>
                {
                  hasError ?
                    <h2 className="error-message">Oh! Something went wrong</h2>
                    :
                    <h2 className="error-message">Loading</h2>
                }
              </>
  
            }
  
          </div>
        </div>
  
  
      </div>
    </div>
  )
}

export default Teachers