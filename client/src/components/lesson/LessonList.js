import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'

// Components
import LessonListCard from './LessonListCard.js'

const LessonList = () => {

  const [lessons, setLessons] = useState([])
  const [filteredLessons, setFilteredLessons] = useState([])
  const [topics, setTopics] = useState([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getLessons = async () => {
      try {
        const { data } = await axios('/api/lessons/')
        setLessons(data)
      } catch (err) {
        setHasError(true)
      }
    }
    getLessons()
  }, [])

  useEffect(() => {
    const getTopics = async () => {
      try {
        const { data } = await axios('/api/topics/')
        setTopics(data)
      } catch (err) {
        setHasError(true)
      }
    }
    getTopics()
  }, [])

  const topicOptions = topics.map(topic => (
    { value: topic.topic_name, label: topic.topic_name, id: topic._id }
  ))

  const handleMultiSelected = (selected) => {
    const values = selected ? selected.map(topic => topic.value) : []
    const filtered = lessons.filter(lesson => {
      return lesson.topics.some(topic => values.includes(topic.topic_name))
    })
    console.log('filtered ->', filtered)
    values.length > 0 ? setFilteredLessons(filtered) : setFilteredLessons([])
  }

  return (

    <div className="grid">
      <div className="container">
        <div className="lessons-title-section">
          <h2 className="orange-background auth-title">Lesson Inspiration</h2>
          <h3>Be inspired by lessons made by your fellow teachers!</h3>
        </div>
        <div className="select-lessons-list">
          <Select
            options={topicOptions}
            name='topics'
            className='topic-select-classroom'
            isMulti='true'
            placeholder='Select or search for lessons by topic(s)'
            onChange={(selected) => handleMultiSelected(selected)}
          />
        </div>
        <div className="lesson-container container">
          <div className="row g-3">
  
            {lessons.length > 0 ?
  
              (filteredLessons.length > 0 ? filteredLessons : lessons).map(lesson => {
                return <LessonListCard key={lesson._id} {...lesson} />
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

export default LessonList