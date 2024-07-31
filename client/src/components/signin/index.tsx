import { useState } from 'react'
import { IoPerson } from 'react-icons/io5'
import { CiLock } from 'react-icons/ci'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { useNavigate, Link } from 'react-router-dom'
import { notifyError, notifySuccess, notifyWarn } from '../../config/toastConfig'
import Input from '../Input'
// import img from '../assets/search 1.svg'
import { useCookies } from 'react-cookie'
import styles from './sigin.module.css'
import Waves from '../vanta'
import ForgotModal from '../modals/ForgotModal'

interface Props {
  openForgotModal: () => void
}
const Signin = ({}: Props) => {
  const [cookies, setCookie] = useCookies(['userAuth'])
  const serverUrl = process.env.REACT_APP_SERVER_URL

  const navigate = useNavigate()
  const [FormData, SetFormData] = useState({
    Email: '',
    Password: '',
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [iOtpsModalOpen, setIsOtpModalOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetFormData({ ...FormData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!FormData.Email.trim()) {
      notifyWarn('Email is required')
      return
    }
    if (!FormData.Password.trim()) {
      notifyWarn('password is required')
      return
    }

    fetch(serverUrl + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(FormData),
    })
      .then(async (res) => {
        const response = await res.json()
        console.log(response)
        if (res.ok) {
          const token = response.token
          const decodedToken = JSON.parse(atob(token.split('.')[1]))
          console.log(decodedToken.id)
          notifySuccess(response.message)
          setCookie('userAuth', decodedToken.id, { path: '/' })
          navigate('/dashboard')
        } else {
          notifyError(response.message)
        }
      })
      .catch((error) => {
        console.error('Error logging user:', error)
      })
  }

  const openForgotModal = () => {
    setIsModalOpen(true)
  }

  const closeForgotModal = () => {
    setIsModalOpen(false)
  }

  const openOtpModal = () => {
    setIsOtpModalOpen(true)
  }

  const closeOtpModal = () => {
    setIsOtpModalOpen(false)
  }

  return (
    <>
      <div className={styles.wrapper}>
        <Waves el={'#vanta'} />
        <div className={styles['signin-container']}>
          <form onSubmit={handleSubmit} className={styles['signin-form']}>
            <Input
              type="email"
              placeholder="Email"
              name="Email"
              icon={MdOutlineAlternateEmail}
              handleChange={handleChange}
            />
            <Input type="password" placeholder="Password" name="Password" icon={CiLock} handleChange={handleChange} />
            <div className={styles['signin-input-container']}>
              <div className={styles['signin-checkbox']}>
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox">Remainder Me</label>
              </div>
              <Link to="#" className={styles['signin-forgot-link']} onClick={openForgotModal}>
                Forgot Password?
              </Link>
            </div>
            <button className={styles['signin-button-container']} type="submit">
              Sign In
            </button>
          </form>

          <div className={styles['signin-signup-container']}>
            <p>Do not have an Account?</p>
            <Link to="/signup" className={styles['signin-signup-link']}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ForgotModal closeOtpModal={closeOtpModal} openOtpModal={openOtpModal} closeModal={closeForgotModal} />
      )}
    </>
  )
}

export default Signin
