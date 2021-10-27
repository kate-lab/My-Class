import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { userIsAuthenticated, getTokenFromLocalStorage, getPayload } from '../helpers/Auth.js'
import Creatable from 'react-select/creatable'
import 'dotenv/config'


const LessonEditor = () => {

  const history = useHistory()
  const currentUserId = getPayload()._id
  console.log(currentUserId)

  const [ errors , setErrors ] = useState()
  const [ topics , setTopics ] = useState([])

  useEffect(() => {

    if (!userIsAuthenticated()) return history.push('/login')

    const getTopics = async () => {
      try {
        const { data } = await axios('/api/topics')
        setTopics(data)
      } catch (err) {
        console.log(err)
      }
    }
    getTopics()
  }, [history])

  const topicOptions = topics.map(topic => (
    { value: topic.topic_name, label: topic.topic_name, id: topic._id }
  ))


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
    setFormData({ ...formData, profile_image: data.url })
    // setErrors({ ...errors, section_one_picture: 'no image added' })
  }
  const handleImageTwoChange = async (event) => {
    const dataToSend = new FormData()
    dataToSend.append('file', event.target.files[0])
    dataToSend.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
    const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, dataToSend)
    setFormData({ ...formData, profile_image: data.url })
    // setErrors({ ...errors, section_two_picture: 'no image added' })
  }
  const handleMultiSelected = (selected) => {
    console.log('selected topic ->', selected)
    const selectedTopics = selected ? selected.map(item => item.id) : []
    console.log(selectedTopics)
    setFormData({ ...formData, topics: selectedTopics })
    // setErrors({ ...errors, topics: 'choose a topic' })
  }

  const handleCreatedTopic = async (created) => {
    try {
      await axios.post('/api/topics/', created)
    } catch (err) {
      setErrors(err.response.data.errors)
      console.log(errors)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(formData)
    try {
      await axios.post(
        '/api/lessons/', 
        formData,
        { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
      )
      history.push('/auth/myclassroom/')
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
          <h2>Add a Lesson</h2>

          <form onSubmit={handleSubmit}>
            <div className="top-lesson-add-div">
              <input type='text' className='form-control' name='title' placeholder='Lesson Title' value={FormData.title} onInput={handleChange} />
              <input type='text' className='form-control' name='introduction' placeholder='Introduce your lesson here - what will students expect to be able to do/explain by the end of the lesson?' value={FormData.introduction} onInput={handleChange} />
            </div>
            <div className="bottom-lesson-add-div">
              <div>
                <input type='text' className='form-control' name='section_one_title' placeholder='Section 1 Title' value={FormData.section_one_title} onInput={handleChange} />
                <input type='text' className='form-control' name='section_one_title' placeholder='Write your teacher explanation here' value={FormData.section_one_text} onInput={handleChange} />
                <label htmlFor='section_one_picture' className='form-label'>Add an image</label>
                <input type='file' name='section_one_picture' className='input' onChange={handleImageOneChange} />
                <input type='text' className='form-control' name='section_one_activity' placeholder='Add a short activity to consolidate learning from this section' value={FormData.section_one_title} onInput={handleChange} />
              </div>
              <div>
                <input type='text' className='form-control' name='section_two_title' placeholder='Section 2 Title' value={FormData.section_two_title} onInput={handleChange} />
                <input type='text' className='form-control' name='section_two_title' placeholder='Write your teacher explanation here' value={FormData.section_two_text} onInput={handleChange} />
                <label htmlFor='section_two_picture' className='form-label'>Add an image</label>
                <input type='file' name='section_two_picture' className='input' onChange={handleImageTwoChange} />
                <input type='text' className='form-control' name='section_two_activity' placeholder='Add a longer activity that uses skills/knowledge developed in sections 1 and 2' value={FormData.section_two_title} onInput={handleChange} />
              </div>
            </div>
            <div className="bottom-lesson-add-div">
              <input type='text' className='form-control' name='summary' placeholder='Summarise your lesson here. What are the key take aways from this lesson? What can students go on to do next if they want to expand on what was learned?' value={FormData.summary} onInput={handleChange} />
              <label htmlFor='topic' className='form-label'>Topics this lesson covers:</label>
              <Creatable
                options={topicOptions}
                name='topics'
                isMulti
                isClearable
                placeholder='Select topics or add a new topic'
                onChange={(selected) => handleMultiSelected(selected)}
                onCreateOption={(created) => handleCreatedTopic('topics', created)}
              />
            </div>
            <button className="add-lesson-button">Add/Edit Lesson</button>

          </form>
        </>
        :
        // if isAuthenticated is false:
        <>
          <h2>Please log in to add or edit lessons</h2>
        </>
      }
    </>
  )
}

export default LessonEditor