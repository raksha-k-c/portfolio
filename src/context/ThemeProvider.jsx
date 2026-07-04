import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ThemeContext = createContext({ theme: 'dark', mode: 'system', setMode: () => {}, toggle: () => {} })

const getSystem = () =>
  window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'

export function ThemeProvider({ children }) {
  // mode: 'system' | 'light' | 'dark' ; theme: resolved 'light' | 'dark'
  const [mode, setMode] = useState(() => localStorage.getItem('theme-mode') || 'system')
  const [theme, setTheme] = useState(() =>
    (localStorage.getItem('theme-mode') || 'system') === 'system'
      ? getSystem()
      : localStorage.getItem('theme-mode')
  )

  useEffect(() => {
    const resolved = mode === 'system' ? getSystem() : mode
    setTheme(resolved)
    document.documentElement.setAttribute('data-theme', resolved)
    localStorage.setItem('theme-mode', mode)
  }, [mode])

  // React to OS changes while in system mode
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      if (mode === 'system') {
        const resolved = getSystem()
        setTheme(resolved)
        document.documentElement.setAttribute('data-theme', resolved)
      }
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [mode])

  const toggle = useCallback(() => {
    setMode(theme === 'dark' ? 'light' : 'dark')
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
