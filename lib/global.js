import lang from './lang'
import { useContext, createContext, useState, useEffect } from 'react'
import Router from 'next/router'
import { initTheme, loadUserThemeFromCookies } from './theme'
const GlobalContext = createContext()

export function GlobalContextProvider({ children }) {
  const [locale, changeLocale] = useState(generateLocaleDict('en-US'))
  const [theme, changeTheme] = useState(loadUserThemeFromCookies())
  const [onLoading, changeLoadingState] = useState(false)
  Router.events.on('routeChangeStart', (...args) => {
    changeLoadingState(true)
  })

  Router.events.on('routeChangeComplete', (...args) => {
    changeLoadingState(false)
  })

  // Server-side static rendering, after rendering hooks, do initialization work according to front-end variables
  useEffect(() => {
    initTheme(theme, changeTheme)
    initLocale(locale, changeLocale)
  })

  return (
    <GlobalContext.Provider value={{ onLoading, locale, theme, changeTheme }}>
      {children}
    </GlobalContext.Provider>
  )
}

const generateLocaleDict = langString => {
  let userLocale = lang['en-US']
  if (!langString) {
    return userLocale
  }
  if (langString.slice(0, 2).toLowerCase() === 'zh') {
    switch (langString.toLowerCase()) {
      case 'zh-cn':
      case 'zh-sg':
        userLocale = lang['zh-CN']
        break
      case 'zh-hk':
        userLocale = lang['zh-HK']
        break
      case 'zh-tw':
        userLocale = lang['zh-TW']
        break
      default:
        userLocale = lang['zh-CN']
    }
  }
  const resLocale = mergeDeep({}, lang['en-US'], userLocale)
  return resLocale
}

const initLocale = (locale, changeLocale) => {
  if (window) {
    const targetLocale = generateLocaleDict(window.navigator.language)
    if (JSON.stringify(locale) !== JSON.stringify(targetLocale)) {
      changeLocale(targetLocale)
    }
  }
}

export function mergeDeep(target, ...sources) {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }
  return mergeDeep(target, ...sources)
}

export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export const useGlobal = () => useContext(GlobalContext)
