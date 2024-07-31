import AttendQuiz from '../../icons/attend-quiz.icon'
import CreateQuiz from '../../icons/create-quiz.icon'
import Result from '../../icons/result-quiz.icon'
import styles from './features.module.css'

const Features = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Quizzy Comes with</h1>
        <h1>
          amazing <span>features</span> like
        </h1>
      </div>
      <div className={styles.features}>
        <div className={styles.feature}>
          <CreateQuiz />
          <h3>Create and manage quizzes</h3>
          <p>
            Create quizzes with multiple-choice questions, true/false questions, and open-ended questions. Manage your
            quizzes and track progress easily.
          </p>
        </div>
        <div className={styles.feature}>
          <AttendQuiz />
          <h3>Attend Quiz and learn</h3>
          <p>
            Attend quizzes created by your friends, family, or colleagues. Learn new skills and improve your knowledge.
            Take quizzes in any language, and receive immediate feedback.
          </p>
        </div>
        <div className={styles.feature}>
          <Result />
          <h3>Track and analyze results</h3>
          <p>
            Track quiz results, see the most popular questions, and analyze the performance of your team or individual.
            Get insights into areas for improvement and make data-driven decisions.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Features
