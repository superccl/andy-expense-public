import { useEffect, useState } from 'react'
import { BsFillMoonFill as MoonIcon, BsFillSunFill as SunIcon } from 'react-icons/bs'
import { useSetting } from '../../context/SettingContext'
const DarkModeToggle = () => {
  const { isDark, setIsDark } = useSetting()
  function switchDarkMode() {
    setIsDark(isDark => !isDark)
  }

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }  else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <button 
    onClick={() => switchDarkMode()} 
    className="transition-transform hover:scale-125"
    aria-label='Dark Mode Toggle'
    >
      {isDark ? <SunIcon size={20}/> : <MoonIcon size={20}/>}
    </button>
  )
}

export default DarkModeToggle