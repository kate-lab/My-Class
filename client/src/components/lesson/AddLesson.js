import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { userIsAuthenticated, getTokenFromLocalStorage } from '../helpers/Auth.js'
// import Creatable from 'react-select/creatable'
import Select from 'react-select'
import 'dotenv/config'


const AddLesson = () => {

  const history = useHistory()

  const [ errors , setErrors ] = useState()
  const [ topics , setTopics ] = useState([])

  useEffect(() => {

    if (!userIsAuthenticated()) return history.push('/login')

    const getTopics = async () => {
      try {
        const { data } = await axios('/api/topics/')
        setTopics(data)
      } catch (err) {
        console.log(err)
      }
    }
    getTopics()
  }, [history])

  const topicOptions = topics.map(topic => (
    { value: topic.topic_name, label: topic.topic_name, id: topic.id }
  ))
  console.log(topicOptions)

  const [formData, setFormData] = useState({
    title: '',
    introduction: '',
    section_one_title: '',
    section_one_text: '',
    section_one_picture: '',
    section_one_activity: '',
    section_two_title: '',
    section_two_text: '',
    section_two_picture: '',
    section_two_activity: '',
    summary: '',
    topics: [],
  })

  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
  }
  const handleImageOneChange = async (event) => {
    const dataToSend = new FormData()
    dataToSend.append('file', event.target.files[0])
    dataToSend.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
    const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, dataToSend)
    setFormData({ ...formData, section_one_picture: data.url })
    // setErrors({ ...errors, section_one_picture: 'no image added' })
  }
  const handleImageTwoChange = async (event) => {
    const dataToSend = new FormData()
    dataToSend.append('file', event.target.files[0])
    dataToSend.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
    const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, dataToSend)
    setFormData({ ...formData, section_two_picture: data.url })
    // setErrors({ ...errors, section_two_picture: 'no image added' })
  }

  const handleMultiSelected = (selected, name) => {
    const selectedTopics = selected ? selected.map(topic => topic.id) : []
    setFormData({ ...formData, [name]: selectedTopics })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('submitting ->',formData)
    try {
      await axios.post(
        '/api/lessons/', 
        formData,
        { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
      )
      history.push('/myclassroom/')
    } catch (err) {
      //error message set
      setErrors(err.response.data.errors)
      console.log(errors)
    }
  }


  return (


    <>
      {userIsAuthenticated() ?
        // if isAuthenticated is true:
        <>
          <div className="container lesson-editor form-page">
            <h2 className="orange-background auth-title">Add a Lesson</h2>
  
            <form onSubmit={handleSubmit} className="lesson-edit-form row justify-content-center">
              <div className="top-lesson-add-div col-12 col-lg-8 dots">
                <h4>Introduction</h4>
                <input type="text" className="form-control" name="title" placeholder="Lesson Title" value={FormData.title} onInput={handleChange} />
                <input type="text" className="form-control textarea" name="introduction" placeholder="Introduce your lesson here - what will students expect to be able to do/explain by the end of the lesson?" value={FormData.introduction} onInput={handleChange} maxLength="500"/>
              </div>
              <div className="middle-lesson-add-div row gx-3 dots">
                <div className="col-12 col-lg-6">
                  <h4>Section One</h4>
                  <input type="text" className="form-control" name="section_one_title" placeholder="Section 1 Title" value={FormData.section_one_title} onInput={handleChange} maxLength="100"/>
                  <input type="text" className="form-control textarea" name="section_one_text" placeholder="Write your teacher explanation here" value={FormData.section_one_text} onInput={handleChange} maxLength="1000"/>
                  <label htmlFor="section_one_picture" className="form-label">Add section one image</label>
                  <input type="file" name="section_one_picture" className="input custom-file-upload purple-background" onChange={handleImageOneChange} />
                  <input type="text" className="form-control textarea" name="section_one_activity" placeholder="Add a short activity to consolidate learning from this section" value={FormData.section_one_activity} onInput={handleChange} maxLength="500"/>
                </div>
                <div className="col-12 col-lg-6">
                  <h4>Section Two</h4>
                  <input type="text" className="form-control" name="section_two_title" placeholder="Section 2 Title" value={FormData.section_two_title} onInput={handleChange} maxLength="100"/>
                  <input type="text" className="form-control textarea" name="section_two_text" placeholder="Write your teacher explanation here" value={FormData.section_two_text} onInput={handleChange} maxLength="1000"/>
                  <label htmlFor="section_two_picture" className="form-label">Add section two image</label>
                  <input type="file" name="section_two_picture" className="input custom-file-upload purple-background" onChange={handleImageTwoChange} />
                  <input type="textArea" className="form-control textarea" name="section_two_activity" placeholder="Add a longer activity that uses skills/knowledge developed in sections 1 and 2" value={FormData.section_two_activity} onInput={handleChange} maxLength="500"/>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="final-lesson-add-div col-12 col-lg-8 dots">
                  <h4>Lesson Summary</h4>
                  <input type="text" className="form-control textarea" name="summary" placeholder="Summarise your lesson here. What are the key take aways from this lesson? What can students go on to do next if they want to expand on what was learned?" value={FormData.summary} onInput={handleChange} maxLength="500"/>
                  <label htmlFor="topic" className="form-label">Topics this lesson covers:</label>
                  <Select
                    options={topicOptions}
                    name="topics"
                    isMulti
                    isClearable
                    placeholder="Select topics covered in this lesson"
                    onChange={(selected) => handleMultiSelected(selected, 'topics')}
                    // onCreateOption={(created) => handleCreatedTopic('topics', created)}
                  />
                </div>
              </div>
              <div className="justify-content-center">
                <button className="add-lesson-button button-custom col blue-background">Add Lesson</button>
              </div>
            </form>
          </div>
        </>
        :
        // if isAuthenticated is false:
        <>
          <h2>Please log in to add a new lesson</h2>
        </>
      }
    </>
  )
}

export default AddLesson