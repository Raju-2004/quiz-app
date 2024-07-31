import React, { useState, useEffect } from 'react'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../store/AppStore'
import { setEmail } from '../../store/EmailSlice'
import { setLoad } from '../../store/LoadSlice'
import Spinner from '../Spinner'

interface Props {
  closeModal: () => void
  openOtpModal: () => void
  closeOtpModal : () => void
}

const ForgotModal = ({ closeModal ,openOtpModal}: Props) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL

  const dispatch = useAppDispatch()
  const isLoad = useAppSelector((state) => state.Load.isLoad)
  // const [isUserMail, SetIsUserMail] = useState<boolean>(false);
  const [ForgotEmail, SetForgotEmail] = useState<string>('')
  const [Error, SetError] = useState('')
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetForgotEmail(e.target.value)
  }

  const sendEmail = async () => {
    try {
      console.log('sending mail')
      const response = await fetch(serverUrl + 'sendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: ForgotEmail }),
        credentials: 'include',
      })
      if (response.ok) {
        openOtpModal()
      }
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  const onHandleSubmit = async () => {
    dispatch(setLoad({ isLoad: true }))
    try {
      const response = await fetch(serverUrl + 'checkmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: ForgotEmail }),
      })
      if (response.ok) {
        dispatch(setEmail({ email: ForgotEmail }))
        sendEmail()
        // SetIsUserMail(true);
      } else {
        // SetIsUserMail(false);
        SetError('Enter the valid email')
      }
    } catch (error) {
      console.error('Error handling submit:', error)
    }
  }

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white py-10 px-8 w-675 h-512 rounded-lg">
        <h2 className="text-2xl font-bold text-indigo">FORGOT PASSWORD?</h2>
        <p className="font-medium text-lg mb-3 text-gray-400">No worries we covered you..!</p>
        <div className={`flex items-center w-96 relative rounded my-6`}>
          <MdOutlineAlternateEmail className="absolute top-3 left-2 w-6 h-6 p-1 bg-indigo text-white mr-2 rounded-sm" />
          <input
            type="email"
            className="w-full h-12 pl-10 border rounded-sm outline-indigo bg-light_gray focus:bg-white"
            name="email"
            placeholder="email"
            onChange={handleChange}
          />
        </div>
        {Error && <span className="text-red-500 mb-4">{Error}</span>}
        <div className="flex justify-between mt-2">
          <button
            onClick={closeModal}
            className="w-44 h-12  flex justify-center items-center  hover:bg-indigo bg-light_gray hover:text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onHandleSubmit}
            className="w-44 h-12  flex justify-center items-center  hover:bg-indigo bg-light_gray hover:text-white rounded-lg"
          >
            {isLoad ? <Spinner /> : <>submit</>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ForgotModal
