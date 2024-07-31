import React, { useState } from 'react'
import styles from './hero.module.css'
import Loading from '../loading'

const Hero = () => {
  // const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleStartQuiz = () => {
    setLoading(true)

    setTimeout(() => {
      // navigate('/quiz')
      setLoading(false)
    }, 3000)
  }
  return (
    <section className={styles['rules-container']}>
      {loading && <Loading />}

      <div className={styles.banner}>
        <img src="/images/Illusttration.png" alt="banner" />
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>Learn new concepts for each question</h1>
        <p className={styles.description}>We help you prepare for exams and quizzes </p>
        <div className={styles.buttons}>
          <button
            onClick={handleStartQuiz}
            className={`${styles['start-quiz']} ${loading ? styles.loading : ''}`}
            id="startQuiz"
            type="button"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Start Quiz'}
          </button>

          <button className={styles['know-more']} type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="icon"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            Create&nbsp;Quiz
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
