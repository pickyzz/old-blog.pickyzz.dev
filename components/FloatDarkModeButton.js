import { useEffect, useState } from 'react'
import { useGlobal } from '@/lib/global'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { loadUserThemeFromCookies, saveTheme } from '@/lib/theme'

export default function FloatDarkModeButton () {
  const [show, switchShow] = useState(false)
  const scrollListener = () => {
    const scrollY = window.pageYOffset
    const shouldShow = scrollY > 100
    if (shouldShow !== show) {
      switchShow(shouldShow)
    }
  }
  useEffect(() => {
    scrollListener()
    document.addEventListener('scroll', scrollListener)
    return () => document.removeEventListener('scroll', scrollListener)
  }, [show])

  const { changeTheme } = useGlobal()
  const userTheme = loadUserThemeFromCookies()
  const handleChangeDarkMode = () => {
    const newTheme = userTheme === 'light' ? 'dark' : 'light'
    saveTheme(newTheme)
    changeTheme(newTheme)
    const htmlElement = document.getElementsByTagName('html')[0]
    htmlElement.classList?.remove(userTheme)
    htmlElement.classList?.add(newTheme)
  }

  return (
    <div
      onClick={handleChangeDarkMode}
      className={
        (show ? '' : ' hidden ') +
        ' animate__animated animate__fadeInRight px-3.5 py-3 animate__animated animate__faster shadow-card fixed right-2 bottom-36 z-10 duration-200 text-xs cursor-pointer rounded-xl' +
        ' text-black dark:border-gray-500 flex justify-center items-center w-9 h-9 glassmorphism dark:bg-gray-800 dark:text-gray-200'
      }
    >
      {userTheme === 'dark' && (<>
        <FontAwesomeIcon
          icon={faSun}
          id="darkModeButton"
          className="hover:scale-150 transform duration-200"
        />
      </>)}

      {userTheme === 'light' && (<>
        <FontAwesomeIcon
          icon={faMoon}
          id="darkModeButton"
          className="hover:scale-150 transform duration-200"
        />
      </>)}
    </div>
  )
}
