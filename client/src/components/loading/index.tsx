import styles from './loading.module.css'

const Loading = () => {
  return (
    <div className={styles['loading-overlay']}>
      <div className={styles['loading-message']}>Stay Seated, Stay Sharp. Starting Quiz In a moment!</div>
    </div>
  )
}

export default Loading
