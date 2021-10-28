/* eslint-disable camelcase */
import React from 'react'
import { Link } from 'react-router-dom'

const TeacherCard = ({ id, display_name, profile_image }) => {
  console.log('lesson id->', id)
  return (

    <div className="lesson col-6 col-md-4 col-lg-3">
      <Link to={`/classroom/${id}`}>
        <div className="card teacher-list-card h-100 purple-background">
          <h4 className="card-header">{display_name}</h4>
          <img src={profile_image} className="teacher-image" alt={display_name}/>
        </div>
      </Link>
    </div>


  )
}
export default TeacherCard