import { useEffect, useRef, useState } from 'react'
import Image from '../../assets/04 Login-SignUp 1.png'
import { Outlet, useLocation } from 'react-router-dom'
import Success from '../components/modals/Success'
import ForgotModal from '../components/modals/ForgotModal'
import NewModal from '../components/modals/NewModal'
import OtpModal from '../components/modals/OtpModal'
import Waves from '../components/vanta'

interface Props {
  openModal: (modalType: 'forgot' | 'new' | 'otp' | 'success' | 'coin') => void
  closeModal: () => void
  isModalOpen: 'forgot' | 'new' | 'otp' | 'success' | 'coin' | null
}

// { openModal, closeModal, isModalOpen }: Props

const Authentication = () => {
  const location = useLocation()
  const [dataForSuccess, setDataForSuccess] = useState<any[]>([])

  const setOtpModalData = (data: any[]) => {
    setDataForSuccess(data)
  }

  return (
    <div className="grid grid-cols-2">
      <div className="px-36 mt-8">
        <div>
          <p className="text-3xl text-indigo font-bold leading-6 text-left">
            {location.pathname === '/auth/signin' ? 'Sign In' : 'Sign Up'}
          </p>
          <p className="font-medium mt-3 text-2xl text-gray-400">Connect & Collect..!</p>
        </div>
        <Outlet />
        <div className="w-96 mt-16 flex-col justify-center items-center">
          <p className="text-indigo text-center cursor-pointer">Privacy Policy</p>
          <p>Denaurlen Copyright @ 2021, All Rights Reserved</p>
        </div>
      </div>

      {/* {isModalOpen === 'forgot' && <ForgotModal closeModal={closeModal} openOtpModal={() => openModal('otp')} />}
      {isModalOpen === 'new' && (
        <NewModal closeModal={closeModal} openSuccessModal={() => openModal('success')} setData={setOtpModalData} />
      )}
      {isModalOpen === 'otp' && (
        <OtpModal
          closeModal={closeModal}
          openNewModal={() => openModal('new')}
          openSuccessModal={() => openModal('success')}
          setData={setOtpModalData}
        />
      )}
      {isModalOpen === 'success' && <Success closeModal={closeModal} data={dataForSuccess} />} */}
    </div>
  )
}

export default Authentication

// import React, { useState, useEffect, useRef } from 'react'
// import BIRDS from 'vanta/dist/vanta.birds.min'
// // Make sure window.THREE is defined, e.g. by including three.min.js in the document head using a <script> tag

// const MyComponent = (props) => {
//   const [vantaEffect, setVantaEffect] = useState(null)
//   const myRef = useRef(null)
//   useEffect(() => {
//     if (!vantaEffect) {
//       setVantaEffect(
//         BIRDS({
//           el: myRef.current,
//         })
//       )
//     }
//     return () => {
//       if (vantaEffect) vantaEffect.destroy()
//     }
//   }, [vantaEffect])
//   return <div ref={myRef}>Foreground content goes here</div>
// }
