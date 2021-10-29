import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Select from 'react-select'
// import { getPayload } from '../helpers/Auth.js'

import LessonCard from './LessonCard'

const Classroom = () => {

  const [user, setUser] = useState(null)
  const [topics, setTopics] = useState([])
  const [filteredLessons, setFilteredLessons] = useState([])
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

  useEffect(() => {
    const getTopics = async () => {
      try {
        const { data } = await axios('/api/topics')
        setTopics(data)
      } catch (err) {
        console.log(err)
      }
    }
    getTopics()
  }, [])

  const topicOptions = topics.map(topic => (
    { value: topic.topic_name, label: topic.topic_name, id: topic._id }
  ))

  const handleMultiSelected = (selected) => {
    const lessons = user.lessons
    // console.log(lessons)
    // console.log('selected ->', selected)
    const values = selected ? selected.map(topic => topic.value) : []
    const filtered = lessons.filter(lesson => {

      return lesson.topics.some(topic => {
        // console.log(topic.topic_name)
        return values.includes(topic.topic_name)

      })
    })
    console.log('filtered ->', filtered)
    values.length > 0 ? setFilteredLessons(filtered) : setFilteredLessons([])
  }

  // const userIsClassroom = (classroomId) => {
  //   const payload = getPayload()
  //   if (!payload) return
  //   return classroomId === payload.sub
  // }

  return (
    <>
      {user ?

        <div className="grid">
          <div className="classroom container">
            <div className="class-section-user">
              <div className="user-picture-container">
                <img src={user.profile_image} alt={user.display_name} className="user-picture"></img>
              </div>
              <div className="user-info">
                <h2>Welcome to {user.display_name}&apos;s class</h2>
                <div className="class-actions-section">
                  <div>
                    <Select
                      options={topicOptions}
                      name='topics'
                      className='topic-select-classroom'
                      isMulti='true'
                      placeholder='Select or search for lessons by topic(s)'
                      onChange={(selected) => handleMultiSelected(selected)}
                    />
                  </div>
                </div>
                {/* { userIsClassroom(user._id) ?
                  <Link to={'/lessoneditor'} className="button-custom">Add a lesson to your class</Link>
                  :
                  <></>
                } */}
              </div>
            </div >
            <div className="lesson-container container">
              <div className="row g-3">
  
                {user.lessons.length > 0 ?
  
                  (filteredLessons.length > 0 ? filteredLessons : user.lessons).map(lesson => {
                    return <LessonCard key={lesson._id} {...lesson} />
                  })
  
                  :
  
                  <>
                    {
                      hasError ?
                        <h2 className='error-message'>Oh! Something went wrong</h2>
                        :
                        <h2 className='error-message'>{user.display_name} has no lessons yet</h2>
                    }
                  </>
  
                }
  
              </div>
            </div>
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