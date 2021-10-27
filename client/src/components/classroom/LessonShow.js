import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { getPayload, getTokenFromLocalStorage } from '../helpers/Auth'

const LessonShow = () => {

  const [lesson, setLesson] = useState(null)
  const [hasError, setHasError] = useState(false)

  const payload = getPayload()
  const userId = payload.sub
  const { id } = useParams()

  useEffect(() => {
    const getLesson = async () => {
      try {
        const { data } = await axios(`/api/lessons/${id}`)
        setLesson(data)
      } catch (err) {
        setHasError(true)
      }
    }
    getLesson()
  }, [id])

  console.log(lesson)

  const userIsOwner = (ownerId) => {
    if (!payload) return
    return ownerId === payload.sub
  }
  const handleDelete = async () => {
    try {
      await axios.delete(
        `/api/lessons/${id}`,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
      history.push(`/classroom/${userId}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {lesson ?
        <>
          <div className="container lesson-show">
            <div>
              <Link to={`/classroom/${lesson.user}`}>
                <div className="profile-button button-custom purple-background">
                  Back to {lesson.owner.display_name}&apos;s class
                </div>
              </Link>
              {
                userIsOwner(lesson.owner._id) ?
                  <div className="edit-button-container">
                    <Link to={'/lessoneditor'} className="button-custom yellow-background">Edit Lesson</Link>
                    <button onClick={handleDelete} className="button-custom pink-background">Delete Lesson</button>
                  </div>
                  :
                  <></>
              }
            </div>
            <h2>{lesson.title}</h2>
            <div className="card-topic-container">
              {lesson.topics.map(topic => {
                return <div className="card-topic-badges rounded-pill badge green-background text-light" key={topic.topic_name}>{topic.topic_name}</div>
              })}
            </div>
            <div className="lesson-content-container">
              <h4>Introduction</h4>
              <div className="orange-background">{lesson.introduction}</div>
              
              <h4>{lesson.section_one_title}</h4>
              <div className="blue-background">{lesson.section_one_text}</div>
              <img src={lesson.section_one_picture} alt={lesson.section_one_title} className="lesson-image"/>

              <h4>{lesson.section_two_title}</h4>
              <div className="yellow-background">{lesson.section_two_text}</div>
              <img src={lesson.section_two_picture} alt={lesson.section_two_title} className="lesson-image"/>
            
              <h4>Summary</h4>
              <div className="pink-background">{lesson.summary}</div>
            
            </div>
          </div>
        </>
        :
        <>
          {hasError ?
            <h2 className="display-5 text-center">Oh! Something went wrong</h2>
            :
            <h2 className='error-message'>Loading</h2>
          }
        </>
      }
    </>
  )

}

export default LessonShow