import React from 'react'
import styles from './quiz-header.module.css'

interface QuizHeaderProps {
  timer: number
}

const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = timeInSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const QuizHeader: React.FC<QuizHeaderProps> = ({ timer }) => {
  return (
    <section className={styles['header-container']} id="alertContainer">
      <div className={styles['header-content']}>
        <div className={styles['attention-text']}>
          <span className={styles['attention-highlight']}>Attention!</span> You have 60 seconds to answer 6 questions.
          <br />
          Please keep an eye on the timer and make sure to answer all questions before time runs out.
        </div>
        <div className={styles['timer-container']}>
          <p className={styles['timer-icon']}>
            <i className="fa-solid fa-clock-rotate-left"></i>
          </p>
          <div className={styles['timer-text']}>
            <h1 className={styles['timer-time']} id="count">
              {formatTime(timer)}
              <sub className={styles['timer-sub']}>sec</sub>
            </h1>
            <p className={styles['time-consumed']}>Time Consumed</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuizHeader
