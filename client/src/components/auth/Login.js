import axios from 'axios'
import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

const Login = () => {

  const history = useHistory()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState('')

  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
    setErrors('email or password incorrect')
  }

  const handleSubmit = async(event) => {
    event.preventDefault()

    try {
      console.log(formData)
      const { data } = await axios.post('/api/auth/login/', formData)  
      setTokenToLocalStorage(data.token)
      history.push('/lessons')
    } catch (error) {
      setErrors()
      console.log(error)
    }
  }
  const setTokenToLocalStorage = (token)=>{
    window.localStorage.setItem('token',token)
  }

  return (
    <section className='form-page grid'>

      <h2 className="auth-title login-title">Log in</h2>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
  
          <div className='form-field'>
            <label htmlFor='email' className='form-label'>Email</label>
            <input type='text' className='form-control' name='email' placeholder='name@email.com' value={FormData.email} onInput={handleChange} />
          </div>
          <div className='form-field'>
            <label htmlFor='password' className='form-label'>Password</label>
            <input type='password' className='form-control' name='password' placeholder='Password' value={FormData.password} onInput={handleChange} />
          </div>
          {errors && <p className="error">{errors}</p>}
          <button className='button-custom form-button'>Log in</button>
  
          <p>Don&apos;t have an account? <Link to='/register'>Register here</Link></p>
        </form>
      </div>

    </section>
  )
}

export default Login