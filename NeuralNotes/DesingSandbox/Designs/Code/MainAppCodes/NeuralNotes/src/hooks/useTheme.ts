import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    // Sayfa ilk yüklendiğinde localStorage'dan veya sistem tercihinden temayı al
    const storedTheme = localStorage.getItem('theme') as Theme | null
    if (storedTheme) {
      return storedTheme
    }
    // Sistem tercihini kontrol et
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light' // Varsayılan tema
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return [theme, toggleTheme]
}

export default useTheme 