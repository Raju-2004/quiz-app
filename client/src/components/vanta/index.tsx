import { useEffect } from 'react'
import styles from './vanta.module.css'
import WAVES from 'vanta/src/vanta.waves'

interface WavesProps {
  el: string
}

const Waves = ({ el }: WavesProps) => {
  useEffect(() => {
    const effect = WAVES({
      el: document.querySelector(el) as HTMLElement,
    })

    return () => {
      if (effect) effect.destroy()
    }
  }, [el])

  return <div className={styles['vanta-waves']} id={el.slice(1)} />
}

export default Waves
