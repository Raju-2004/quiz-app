import { Link } from 'react-router-dom'
import Logo from '../../icons/logo.icon'
import styles from './header.module.css'
const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Logo />
        <p>Quizzy</p>
      </div>
      <div className={styles.links}>
        <div>
          <a href="/">Home</a>
        </div>
        <div>
          <a href="/dashboard">Quizzes</a>
        </div>
      </div>
      <Link to={'/login'}>
        <div className={styles.button}>Login</div>
      </Link>
    </div>
  )
}

export default Header
