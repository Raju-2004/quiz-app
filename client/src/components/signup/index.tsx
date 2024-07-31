import React, { useState } from 'react'
import { IoPerson } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { notifyError, notifySuccess, notifyWarn } from '../../config/toastConfig'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { CiLock } from 'react-icons/ci'
import Input from '../Input'
import { useAppDispatch, useAppSelector } from '../../store/AppStore'
import { setEmail } from '../../store/EmailSlice'
import { TiTick } from 'react-icons/ti'
import Spinner from '../Spinner'
import Waves from '../vanta'
import styles from './signup.module.css'

const Signup = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL

  const dispatch = useAppDispatch()
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
  // const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);

  const [FormData, SetFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
  })

  const [errors, setErrors] = useState({
    Email: '',
    Password: '',
    ConfirmPassword: '',
  })

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^.{6,}$/

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    SetFormData({ ...FormData, [name]: value })

    let emailErrorMessage = ''
    let passwordErrorMessage = ''
    let ConfirmErrorMessage = ''

    if (name === 'Email') {
      const isValidEmail = emailRegex.test(value)
      emailErrorMessage = isValidEmail ? '' : 'Invalid email'
    }

    if (name === 'Password') {
      const isValidPassword = passwordRegex.test(value)
      passwordErrorMessage = isValidPassword ? '' : 'Password should contain at least 6 characters'
    }

    if (name === 'ConfirmPassword' && value !== FormData.Password) {
      ConfirmErrorMessage = 'Passwords do not match'
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      Email: emailErrorMessage,
      Password: passwordErrorMessage,
      ConfirmPassword: ConfirmErrorMessage,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormSubmitted(true)

    const passwordsMatch = FormData.Password === FormData.ConfirmPassword
    const isValidEmail = emailRegex.test(FormData.Email)
    const isValidPassword = FormData.Password.length >= 6
    if (!isValidEmail || !isValidPassword || !passwordsMatch) {
      console.log('Please correct the validation errors before submitting.')
      return
    }

    console.log(FormData)

    fetch(serverUrl + 'signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(FormData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(Response)
        console.log(data)
        notifyError(data.message)
        if (data.message === 'User created successfully') {
          notifySuccess('Sign up Successful')
        }
      })
      .catch((error) => {
        console.error('Error creating user:', error)
      })
  }

  return (
    <div className={styles.wrapper}>
      <Waves el={'#vanta'} />
      <div className={styles['signup-container']}>
        <form onSubmit={handleSubmit} className={styles['signup-form']}>
          <div className={styles['signup-input-container']}>
            <Input
              type={'text'}
              placeholder={'FirstName'}
              name={'FirstName'}
              icon={IoPerson}
              handleChange={handleChange}
            />
            <Input
              type={'text'}
              placeholder={'LastName'}
              name={'LastName'}
              icon={IoPerson}
              handleChange={handleChange}
            />
          </div>
          <Input
            type="email"
            placeholder="Email"
            name="Email"
            icon={MdOutlineAlternateEmail}
            handleChange={handleChange}
          />
          <Input
            type={'password'}
            placeholder={'Password'}
            name={'Password'}
            icon={CiLock}
            handleChange={handleChange}
          />
          {errors.Password && <span className="text-red-500">{errors.Password}</span>}
          <Input
            type={'password'}
            placeholder={'ConfirmPassword'}
            name={'ConfirmPassword'}
            icon={CiLock}
            handleChange={handleChange}
          />
          {errors.ConfirmPassword && <span className="text-red-500">{errors.ConfirmPassword}</span>}
          <button className={styles['signin-button-container']} type="submit">
            Sign up
          </button>
        </form>
        <div className={styles.signupSigninContainer}>
          <p>Already Having an account?</p>
          <Link to="/login" className={styles.signupSigninLink}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
