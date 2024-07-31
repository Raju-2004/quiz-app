import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QuizHeader from '../quiz-header'
import styles from './quiz-taker.module.css'
import { useParams } from 'react-router-dom'

const Loading = () => (
  <div className={styles['loading-container']}>
    <p className={styles['loading-text']}>Loading...</p>
  </div>
)

// Utility function to format time
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

interface Question {
  question: string
  options: string[]
  correctAnswer: string
}

const QuizPage: React.FC = () => {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(60)
  const [timerIntervalId, setTimerIntervalId] = useState<NodeJS.Timeout | null>(null)
  const [status, setStatus] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false) // Flag to check if already submitted
  const [quizStarted, setQuizStarted] = useState(false) // Flag to check if quiz has started

  const { id } = useParams<{ id: string }>()
  const serverUrl = process.env.REACT_APP_SERVER_URL

  console.log(id)

  useEffect(() => {
    fetch(serverUrl + `quizzes/${id}`)
      .then((response) => response.json())
      .then((data) => setQuestions(data.questions))
      .catch((error) => console.error('Error fetching quiz data:', error))
  }, [id, serverUrl])

  console.log(questions)

  useEffect(() => {
    if (quizStarted && !isSubmitted) {
      // Set up the timer interval
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1
          } else {
            // Timer has reached 0, submit the quiz automatically if not already submitted
            if (!isSubmitted) {
              handleSubmit()
              setIsSubmitted(true) // Ensure submission only once
            }
            return prevTimer // Return 0 to stop the interval
          }
        })
      }, 1000)

      setTimerIntervalId(intervalId)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [quizStarted, isSubmitted]) // Dependency array includes quizStarted and isSubmitted

  const startQuiz = () => {
    setQuizStarted(true)
  }

  const handleAnswerSelect = (index: number, selectedOption: string) => {
    const updatedAnswers = { ...answers, [index]: selectedOption }
    setAnswers(updatedAnswers)
  }

  const handleSubmit = () => {
    if (isSubmitted) return // Prevent duplicate submissions
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setLoading(true)
    setIsSubmitted(true) // Set the flag to prevent further submissions

    if (timerIntervalId) {
      clearInterval(timerIntervalId) // Clear the timer interval
    }

    setTimeout(() => {
      const quizScore = calculateScore(answers)
      setScore(quizScore)
      const percentage = (quizScore / questions.length) * 100
      const newStatus = percentage >= 50 ? 'Passed' : 'Failed'
      setStatus(newStatus)

      setShowResult(true)
      setLoading(false)
    }, 500)
  }

  const calculateScore = (userAnswers: { [key: number]: string }) => {
    let score = 0
    questions.forEach((question, index) => {
      const userAnswer = (userAnswers[index] || '').trim()
      const correctAnswer = question.correctAnswer.trim()
      console.log(`Question Index: ${index}, User Answer: ${userAnswer}, Correct Answer: ${correctAnswer}`)
      if (userAnswer === correctAnswer) {
        score++
      }
    })
    console.log(`Final Score: ${score}`)
    return score
  }

  const restartQuiz = () => {
    setAnswers({})
    setScore(0)
    setShowResult(false)
    setLoading(false)
    setTimer(60)
    setCurrentQuestionIndex(0)
    setIsSubmitted(false) // Reset the submission flag
    setQuizStarted(false) // Reset the quiz start flag
  }

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1))
  }

  const handlePrev = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  return (
    <section>
      <QuizHeader timer={timer} />
      <div className={styles['quiz-container']}>
        {!quizStarted ? (
          <div className={styles['start-button-container']}>
            <button onClick={startQuiz} className={styles['start-button']}>
              Start Quiz
            </button>
          </div>
        ) : (
          <>
            {/* question section */}
            <div className={styles['question-section']}>
              <div>
                {questions.length > 0 && (
                  <div className={styles['question-card']}>
                    <p className={styles['question-title']}>
                      <span className={styles['question-number']}>{currentQuestionIndex + 1}</span>
                      <span>{questions[currentQuestionIndex].question}</span>
                    </p>
                    <div className={styles['options-grid']}>
                      {questions[currentQuestionIndex].options.map((option, index) => (
                        <div
                          className={`${styles['option']} ${
                            answers[currentQuestionIndex] === option ? styles['selected-option'] : ''
                          }`}
                          key={index}
                          onClick={() => handleAnswerSelect(currentQuestionIndex, option)}
                        >
                          <p className={styles['option-number']}>Option {index + 1}</p>
                          <p>{option}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className={styles['navigation-buttons']}>
                  {currentQuestionIndex > 0 && (
                    <button onClick={handlePrev} className={styles['nav-button']}>
                      Prev
                    </button>
                  )}
                  {currentQuestionIndex < questions.length - 1 ? (
                    <button onClick={handleNext} className={styles['nav-button']}>
                      Next
                    </button>
                  ) : (
                    <button onClick={handleSubmit} className={styles['submit-button']}>
                      Submit Quiz
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* answer section */}
            <div className={styles['answer-section']}>
              {showResult && (
                <div>
                  <h3 className={styles['result-title']}>Your Score:</h3>
                  <div className={styles['result-container']}>
                    <h3 className={`${styles['status']} ${status === 'Passed' ? styles['passed'] : styles['failed']}`}>
                      {status}
                    </h3>
                    <h1 className={styles['score']}>
                      {score * 10}
                      <span className={styles['total-score']}>/60</span>
                    </h1>
                    <p className={styles['total-time']}>
                      Total Time:{' '}
                      <span className={styles['time']}>
                        {formatTime(60 - timer)}
                        <span className={styles['seconds']}>sec</span>
                      </span>
                    </p>
                  </div>
                  <button onClick={restartQuiz} className={styles['restart-button']}>
                    Restart
                  </button>
                </div>
              )}

              {loading && <Loading />}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default QuizPage
