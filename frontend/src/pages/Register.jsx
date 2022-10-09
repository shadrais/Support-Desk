import React, { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const { name, email, password, password2 } = formData
  const dispatch = useDispatch()
  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  )
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [isError, isSuccess, message, user])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      return toast.error('Passwords do not match')
    } else {
      dispatch(
        register({
          name,
          email,
          password,
        })
      )
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => handleChange(e)}
            />
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => handleChange(e)}
            />
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => handleChange(e)}
            />
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              placeholder='Confirm Password'
              value={password2}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
