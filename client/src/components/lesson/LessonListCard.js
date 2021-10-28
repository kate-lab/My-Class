/* eslint-disable camelcase */
import React from 'react'
import { Link } from 'react-router-dom'

const LessonCard = ({ id, title, topics, section_two_picture }) => {
  console.log('lesson id->', id)
  return (

    <div className="lesson col-12 col-md-6 col-lg-4">
      <Link to={`/lessons/${id}`}>
        <div className="card h-100 purple-background lesson-card lesson-list-card">
          <div className="card-header rounded-0">
            <h3>{title}</h3>
          </div>
          
          <img src={section_two_picture} className="card-image cropped-image-small" alt={title}/>
          
          <div className="card-topic-container">
            {topics.map(topic => {
              return <div className="card-topic-badges rounded-pill badge bg-light text-dark" key={topic.topic_name}>{topic.topic_name}</div>
            })}
          </div>
        </div>
      </Link>
    </div>


  )
}
export default LessonCard