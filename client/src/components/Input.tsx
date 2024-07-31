import React from 'react'
import styles from './input.module.css'

interface Props {
  type: string
  placeholder: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const Input = ({ type, placeholder, name, icon: Icon, handleChange }: Props) => {
  return (
    <div className={styles.container}>
      <Icon className={styles.icon} />
      <input
        type={type}
        className={styles.input}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        required
      />
    </div>
  )
}

export default Input
