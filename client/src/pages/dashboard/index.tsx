// src/App.tsx

import React, { useEffect, useState } from 'react'
import { Quiz, Result } from '../../types'
import styles from './dashboard.module.css'
import QuizCard from '../../components/quiz-card'
import { notifyError } from '../../config/toastConfig'
import AddIcon from '../../icons/add.icon'
import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'

const OverView: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [result, setResult] = useState<Result | null>(null)

  const serverUrl = process.env.REACT_APP_SERVER_URL
  const handleQuizCreate = (newQuiz: Quiz) => {
    setQuiz(newQuiz)
  }

  const handleQuizComplete = (result: Result) => {
    setResult(result)
  }

  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${serverUrl}quizzes`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setQuizzes(data)
        console.log(data)
      } catch (err) {
        console.error('Error fetching quizzes:', err)
        notifyError('Error fetching quizzes')
      }
    }

    fetchQuizzes()
  }, [])

  console.log(quizzes)

  return (
    <div className={styles.dashboard}>
      <div className={styles.heading}>Welcome to the Quizzy App!</div>
      <div className={styles.quizzes}>
        {/* <div>Take or Create New Quiz</div> */}
        <div className={styles.cards}>
          {quizzes && quizzes.map((quiz: any) => <QuizCard id={quiz._id as string} title={quiz.title} />)}
        </div>
        <Link to={'/create-quiz'} className={styles.create}>
          <IoMdAdd />
          Create a New Quiz
        </Link>
      </div>
    </div>
  )
}

export default OverView

{
  /* <div>
{!quiz ? (
  <QuizCreator onQuizCreate={handleQuizCreate} />
) : !result ? (
  <QuizTaker quiz={quiz} onQuizComplete={handleQuizComplete} />
) : (
  <QuizResults result={result} />
)}
</div> */
}
