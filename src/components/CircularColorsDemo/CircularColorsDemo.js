import React from 'react'
import clsx from 'clsx'
import { Play, Pause, RotateCcw } from 'react-feather'
import { motion } from 'framer-motion'

import Card from '@/components/Card'
import VisuallyHidden from '@/components/VisuallyHidden'

import styles from './CircularColorsDemo.module.css'

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
]

function CircularColorsDemo() {
  const id = React.useId()
  const [isActive, setIsActive] = React.useState(false)
  const [timeElapsed, setTimeElapsed] = React.useState(0)

  React.useEffect(() => {
    const intervalId = isActive
      ? window.setInterval(() => {
          setTimeElapsed((time) => time + 1)
        }, 1000)
      : null

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isActive])

  const selectedColor = COLORS[timeElapsed % COLORS.length]

  const resetDemo = () => {
    setIsActive(false)
    setTimeElapsed(0)
    setSelectedColor(COLORS[0])
  }

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={`${id}-selected-color-outline`}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          )
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          {!isActive ? (
            <button onClick={() => setIsActive(!isActive)}>
              <Play />
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
          ) : (
            <button onClick={() => setIsActive(!isActive)}>
              <Pause />
              <VisuallyHidden>Pause</VisuallyHidden>
            </button>
          )}
          <button onClick={resetDemo}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  )
}

export default CircularColorsDemo
