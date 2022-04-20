import { loadUserThemeFromCookies, saveTheme } from '@/lib/theme'
import { useGlobal } from '@/lib/global'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DarkModeButton = () => {
  const { changeTheme } = useGlobal()
  const userTheme = loadUserThemeFromCookies()

  // 用户手动设置主题
  const handleChangeDarkMode = () => {
    const newTheme = (userTheme === 'light' ? 'dark' : 'light')
    saveTheme(newTheme)
    changeTheme(newTheme)
    const htmlElement = document.getElementsByTagName('html')[0]
    htmlElement.classList?.remove(userTheme)
    htmlElement.classList?.add(newTheme)
  }
  return (
    <div onClick={handleChangeDarkMode} className='flex dark:text-gray-200 z-10 duration-200 text-[16px] cursor-pointer py-1.5 px-1'>
    {userTheme === 'dark' && (<>
        <FontAwesomeIcon
          icon={faSun}
          id="darkModeButton"
          className="hover:scale-[130%] transform duration-200 "
        />
      </>)}

      {userTheme === 'light' && (<>
        <FontAwesomeIcon
          icon={faMoon}
          id="darkModeButton"
          className="hover:scale-[130%] transform duration-200"
        />
      </>)}
    </div>
  )
}
export default DarkModeButton
