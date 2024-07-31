import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout'
import HomePage from './pages/home-page'
import QuizCreator from './components/quiz-builder'
import { Quiz } from './types'
import OverView from './pages/dashboard'
import QuizPage from './components/quiz-taker'
import Signin from './components/signin'
import Authentication from './pages/Authentication'
import Signup from './components/signup'

const MainRoutes = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null)

  const handleQuizCreate = (newQuiz: Quiz) => {
    setQuiz(newQuiz)
  }

  const handleOpenModal = () => {}
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Signin openForgotModal={handleOpenModal} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<OverView />} />
        <Route path="/create-quiz" element={<QuizCreator />} />
        {/* <Route path="/quiz" element={<QuizPage />} /> */}
        <Route path="/dashboard/quiz/:id" element={<QuizPage />} />
      </Route>
    </Routes>
  )
}

export default MainRoutes
