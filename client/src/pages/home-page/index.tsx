import Features from '../../components/features'
import Hero from '../../components/hero'
import styles from './home.module.css'

const HomePage = () => {
  return (
    <div className={styles['home-page']}>
      <Hero />
      <Features />
    </div>
  )
}

export default HomePage
