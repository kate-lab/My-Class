import React, { useState } from 'react'
import { useHistory , Link } from 'react-router-dom'

import axios from 'axios'
import 'dotenv/config'

const Register = () => {

  const [formData, setFormData] = useState({
    username: '',
    display_name: '',
    profile_image: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const [errors, setErrors] = useState({
    username: 'needs to be a unique username with no spaces',
    display_name: 'no display name chosen',
    profile_image: 'no profile image added',
    email: 'valid email address not addded',
    password: 'password not added',
    passwordConfirmation: 'passwords do not match',
  })

  const handleChange = (event) =>{
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
    setErrors({ ...errors, [event.target.name]: '' })
  }

  const handleImageChange = async (event) => {
    const dataToSend = new FormData()
    dataToSend.append('file', event.target.files[0])
    dataToSend.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
    const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, dataToSend)
    setFormData({ ...formData, profile_image: data.url })
    setErrors({ ...errors, profile_image: 'no profile image added' })
  }

  const history = useHistory()

  const handleSubmit = async(event) =>{
    event.preventDefault()
    console.log(formData)
    try {
      await axios.post('/api/register', formData)
      history.push('/login')
    } catch (err){
      //error message set
      setErrors(err.response.data.errors)
      console.log(errors)
    }
  }



  return (
    
    <section className='form-page'>

      <h2>Create New Teacher Account</h2>

      <form onSubmit={handleSubmit}>

        <div className='form-field'>
          <label htmlFor='username' className='form-label'>Username</label>
          <input type='text' className='form-control' name='username' placeholder='Username' value ={FormData.username} onInput={handleChange}/>
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className='form-field'>
          <label htmlFor='display_name' className='form-label'>Display Name</label>
          <input type='text' className='form-control' name='display_name' placeholder='Display Name' value ={FormData.display_name} onInput={handleChange}/>
          {errors.display_name && <p className="error">{errors.display_name}</p>}
        </div>
        <div className='form-field'>
          <label htmlFor='image' className='form-label'>Add an image</label>
          <input type='file' name='profile_image' className='input' onChange={handleImageChange} />
        </div>
        <div className='form-field'>
          <label htmlFor='email' className='form-label'>Email</label>
          <input type='email' className='form-control' name='email' placeholder='name@email.com' value ={FormData.email} onInput={handleChange}/>
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className='form-field'>
          <label htmlFor='password' className='form-label'>Password</label>
          <input type='password' className='form-control' name='password' placeholder='Password' value ={FormData.password} onInput={handleChange}/>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className='form-field'>
          <label htmlFor='passwordConfirmation' className='form-label'>Confirm Password</label>
          <input type='password' className='form-control' name='passwordConfirmation' placeholder='Password again' value ={FormData.passwordConfirmation} onInput={handleChange}/>
          {errors.passwordConfirmation && <p className="error">{errors.passwordConfirmation}</p>}
        </div>
        <button className='submit btn btn-primary'>Register</button>
        <p>Already registered? <Link to='/login'>Login</Link></p>
  
      </form>
    </section> 
  )

}

export default Register