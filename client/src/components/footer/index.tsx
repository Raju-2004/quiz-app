import BallIcon from '../../icons/ball.icon'
import TwitterIcon from '../../icons/twitter.icon'
import LinkedInIcon from '../../icons/linkedin.icon'
import InstagramIcon from '../../icons/instagram.icon'
import styles from './footer.module.css'
import Logo from '../../icons/logo.icon'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.logo}>
        {/* <Logo /> */}
        <p>Quizzy</p>
      </div>
      <div className={styles.icons}>
        <BallIcon />
        <TwitterIcon />
        <LinkedInIcon />
        <InstagramIcon />
      </div>
    </div>
  )
}

export default Footer
