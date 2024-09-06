'use client'

import React from 'react'
import { Moon, Sun } from 'react-feather'
import Cookie from 'js-cookie'

import VisuallyHidden from '../VisuallyHidden'

import styles from './ThemeToggleButton.module.css'

import { LIGHT_COLORS, DARK_COLORS } from '@/constants'

function ThemeToggleButton({ theme }) {
  const [currentTheme, setCurrentTheme] = React.useState(theme)

  const handleThemeClick = () => {
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light'

    setCurrentTheme(nextTheme)

    Cookie.set('color-theme', nextTheme, {
      expires: 1000,
    })

    const COLORS = nextTheme === 'light' ? LIGHT_COLORS : DARK_COLORS

    const root = document.documentElement

    root.setAttribute('data-color-theme', nextTheme)

    Object.entries(COLORS).forEach(([key, value]) =>
      root.style.setProperty(key, value)
    )
  }

  return (
    <button className={styles.action} onClick={handleThemeClick}>
      {currentTheme === 'dark' ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  )
}

export default ThemeToggleButton
