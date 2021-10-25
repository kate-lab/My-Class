import React from 'react'
import { Link } from 'react-router-dom'

const LessonCard = ({ _id, title, topics, lesson }) => {

  return (
    <Link to={`/lesson/${_id}`}>
      <div className="card">
        <h3>{title}</h3>
        {lesson.section_two_picture ? <img src={ lesson.section_two_picture } alt={title}></img> : <div className="random-color-div"></div>}
        <div>{topics.map(topic => topic.topic_name)}</div>
      </div>
    </Link>
    
  )
}
export default LessonCard