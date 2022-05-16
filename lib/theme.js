import cookie from 'react-cookies'

export const initTheme = (theme, changeTheme) => {
  // If no theme is specified, the initial theme is determined from time and browser preferences
  if (!theme) {
    const date = new Date()
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    const useDark =
      prefersDarkMode || date.getHours() >= 18 || date.getHours() < 6
    if (useDark) {
      theme = 'dark'
    } else {
      theme = 'light'
    }
  }
  if (typeof window !== 'undefined') {
    const htmlElement = document.getElementsByTagName('html')[0]
    htmlElement.className = ''
    changeTheme(theme)
    saveTheme(theme)
    htmlElement.classList?.add(theme)
  }
}

export const loadUserThemeFromCookies = () => {
  return cookie.load('theme')
}

export const saveTheme = newTheme => {
  cookie.save('theme', newTheme, { path: '/' })
}
