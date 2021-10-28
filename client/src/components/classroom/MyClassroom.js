import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { getTokenFromLocalStorage, getPayload } from '../helpers/Auth'

import LessonCard from './LessonCard'

const MyClassroom = () => {

  const [profile, setProfile] = useState(null)
  const [topics, setTopics] = useState([])
  const [filteredLessons, setFilteredLessons] = useState([])
  const [hasError, setHasError] = useState(false)

  console.log('payload ->', getPayload())

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(
          '/api/auth/myclassroom',
          { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
        )
        setProfile(data)
      } catch (err) {
        setHasError(true)
      }
    }
    getProfile()
    console.log('profile ->', profile)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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
  })

  const topicOptions = topics.map(topic => (
    { value: topic.topic_name, label: topic.topic_name, id: topic._id }
  ))

  const handleMultiSelected = (selected) => {
    const lessons = profile.lessons
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

  if (!profile) return null

  return (

    <>

      <div className="classroom container">
        <div className="class-section">
          <div className="user-picture-container">
            <img src={profile.profile_image} alt={profile.display_name} className="user-picture"></img>
          </div>
          <div className="user-info">
            <h2>Welcome, {profile.display_name}!</h2>
            <div className="class-actions-section">
              <Link to={'/lessoneditor'} className="button-custom green-background">Add a new lesson</Link>
              <div>
                <Select
                  options={topicOptions}
                  name='topics'
                  className='topic-select-classroom'
                  isMulti='true'
                  placeholder='Select or search your lessons by topic(s)'
                  onChange={(selected) => handleMultiSelected(selected)}
                />
              </div>
            </div>

          </div>
        </div >
        <div className="lesson-container container">
          <div className="row g-3">

            {profile.lessons.length > 0 ?

              (filteredLessons.length > 0 ? filteredLessons : profile.lessons).map(lesson => {
                return <LessonCard key={lesson._id} {...lesson} />
              })

              :

              <>
                {
                  hasError ?
                    <h2 className='error-message'>Oh! Something went wrong</h2>
                    :
                    <>
                      <h2 className='error-message'>You don&apos;t have any lessons yet. </h2>
                      <h4>Why not <Link to="/lessoneditor">add your first lesson</Link>.</h4>
                    </>
                }
              </>

            }

          </div>
        </div>
      </div>
    </>

  )

}

export default MyClassroom