/* eslint-disable camelcase */
import React from 'react'
import { Link } from 'react-router-dom'

const LessonCard = ({ _id, title, topics, section_two_picture }) => {

  return (

    <div className="lesson col-12 col-lg-6">
      <Link to={`/lessons/${_id}`}>
        <div className="card h-100 purple-background">
          <div className="card-header rounded-0">
            <h3>{title}</h3>
          </div>
          
          <img src={section_two_picture} className="card-image cropped-image" alt={title}/>
          
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