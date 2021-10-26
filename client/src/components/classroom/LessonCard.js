/* eslint-disable camelcase */
import React from 'react'
import { Link } from 'react-router-dom'

const LessonCard = ({ _id, title, topics, section_two_picture }) => {

  return (
    <Link to={`/lessons/${_id}`}>
      <div className="card">
        <h3>{title}</h3>
        {section_two_picture ? <img src={ section_two_picture } alt={title}></img> : <div className="random-color-div"></div>}
        <div>{topics.map(topic => topic.topic_name)}</div>
      </div>
    </Link>
    
  )
}
export default LessonCard