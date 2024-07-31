import { Link } from 'react-router-dom'
import MoreIcon from '../../icons/more.icon'
import PlayIcon from '../../icons/play.icon'
import SuccessIcon from '../../icons/target.icon'
import { Quiz } from '../../types'
import styles from './quiz-card.module.css'

type PropsType = {
  id: string
  title: string
}

const QuizCard = ({ id, title }: PropsType) => {
  // console.log(id)
  return (
    <div className={styles['card-list']}>
      <article className={styles['card']}>
        <figure className={styles['card-image']}>
          <img
            src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyNDcwMTUwOQ&ixlib=rb-1.2.1&q=85"
            alt="An orange painted blue, cut in half laying on a blue background"
          />
        </figure>
        <div className={styles['card-header']}>
          <a href="#">{title}</a>
          <button className={styles['icon-button']}>
            <MoreIcon />
          </button>
        </div>
        <div className={styles['card-footer']}>
          <div className={`${styles['card-meta']} ${styles['card-meta--Views']}`}>
            <SuccessIcon />
            Success Rate : 0%
          </div>
          <div className={`${styles['card-meta']} ${styles['card-meta--date']}`}>
            <Link to={`/dashboard/quiz/${id}`} className={styles['icon-button']}>
              <PlayIcon />
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}

export default QuizCard
