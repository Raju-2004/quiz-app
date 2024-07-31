import { useState } from 'react'
import { Question, Quiz } from '../../types'
import styles from './quiz-builder.module.css'
import { notifySuccess } from '../../config/toastConfig'
import { useNavigate } from 'react-router-dom'

const QuizCreator = () => {
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState<string[]>(['', '', '', ''])
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const navigate = useNavigate()
  const serverUrl = process.env.REACT_APP_SERVER_URL

  const addQuestion = () => {
    if (question && options.every((opt) => opt) && correctAnswer) {
      const newQuestion: Question = {
        question,
        options,
        correctAnswer,
      }
      setQuestions([...questions, newQuestion])
      setQuestion('')
      setOptions(['', '', '', ''])
      setCorrectAnswer('')
    } else {
      alert('Please fill out all fields before adding the question.')
    }
  }

  const createQuiz = async () => {
    if (title && questions.length > 0) {
      const newQuiz: Quiz = {
        title,
        questions,
      }

      try {
        const response = await fetch(serverUrl + 'create-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newQuiz),
        })

        const result = await response.json()

        if (response.ok) {
          console.log(result)
          setTitle('')
          setQuestions([])
          setCurrentQuestionIndex(0)
          notifySuccess('Quiz created successfully')
          navigate('/dashboard')
        } else {
          alert('An error occurred while creating the quiz: ' + result.message)
        }
      } catch (error) {
        console.error('Error creating quiz:', error)
        alert('An error occurred while creating the quiz.')
      }
    } else {
      alert('Please provide a title and at least one question to create a quiz.')
    }
  }

  const handlePrev = () => {
    setCurrentQuestionIndex(Math.max(currentQuestionIndex - 1, 0))
  }

  const handleNext = () => {
    setCurrentQuestionIndex(Math.min(currentQuestionIndex + 1, questions.length - 1))
  }

  return (
    <div className={styles.create}>
      <h1 className={styles.heading}>Create a Quiz</h1>
      <div className={styles.title}>
        <div className={styles.number}>1</div>
        <h2>Quiz Name : </h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the Quiz Title.."
        />
      </div>
      <div className={styles.question}>
        <div className={styles.number}>2</div>
        <h2>Add a Question : </h2>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Add new Question.."
        />
      </div>
      <div className={styles.choices}>
        <div className={styles.info}>
          <div className={styles.number}>3</div>
          <h2>options : </h2>
        </div>
        <div className={styles.options}>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => setOptions(options.map((opt, i) => (i === index ? e.target.value : opt)))}
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          placeholder="Correct Answer"
        />
      </div>
      <div className={styles.buttons}>
        <button onClick={addQuestion}>Add Question</button>
        <button onClick={createQuiz}>Create Quiz</button>
      </div>
      <h3>Questions Preview</h3>
      <div className={styles['question-section']}>
        {questions.length > 0 && (
          <div className={styles['question-section']}>
            <div className={styles['question-card']}>
              <p className={styles['question-title']}>
                <span className={styles['question-number']}>{currentQuestionIndex + 1}</span>
                <span>{questions[currentQuestionIndex].question}</span>
              </p>
              <div className={styles['options-grid']}>
                {questions[currentQuestionIndex].options.map((option, i) => (
                  <div key={i} className={styles['option']}>
                    <p className={styles['option-number']}>Option {i + 1}</p>
                    <p>{option}</p>
                  </div>
                ))}
              </div>
              <p className={styles['correct-answer']}>
                Correct Answer: {questions[currentQuestionIndex].correctAnswer}
              </p>
            </div>
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
                <button className={styles['nav-button']} disabled>
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizCreator
