import { loadUserThemeFromCookies } from '@/lib/theme'
import React from 'react'
import { init } from '@waline/client'
import { useRouter } from 'next/router'

function darkmode(theme) {
    theme = loadUserThemeFromCookies()
    if (theme === 'dark') { return true } else { return false }
}

// @see https://waline.js.org/guide/get-started.html
 

const WalineComponent = (props) => {
  const walineInstanceRef = React.useRef(null)
  const containerRef = React.createRef()
  const router = useRouter()

  const updateWaline = url => {
    walineInstanceRef.current?.update(props)
  }

  React.useEffect(() => {
    walineInstanceRef.current = init({
      ...props,
      el: containerRef.current,
      serverURL: "https://comment.pickyzz.dev",
      lang: "en-us",
      meta: ['nick', 'mail'],
      imageUploader: false,
      requiredMeta: ['nick', 'mail'],
      copyright: false,
      dark: darkmode()
    })
    router.events.on('routeChangeComplete', updateWaline)

    const anchor = window.location.hash
    if (anchor) {
      // Select the node that needs to observe changes
      const targetNode = document.getElementsByClassName('wl-cards')[0]

      // Callback function to execute when a change is observed
      const mutationCallback = (mutations) => {
        for (const mutation of mutations) {
          const type = mutation.type
          if (type === 'childList') {
            const anchorElement = document.getElementById(anchor.substring(1))
            if (anchorElement && anchorElement.className === 'wl-item') {
              anchorElement.scrollIntoView({ block: 'end', behavior: 'smooth' })
              setTimeout(() => {
                anchorElement.classList.add('animate__animated')
                anchorElement.classList.add('animate__bounceInRight')
                observer.disconnect()
              }, 300)
            }
          }
        }
      }

      // Observe child node changes
      const observer = new MutationObserver(mutationCallback)
      observer.observe(targetNode, { childList: true })
    }

    return () => {
      walineInstanceRef.current?.destroy()
      router.events.off('routeChangeComplete', updateWaline)
    }
  }, [])

  return <div ref={containerRef} />
}

export default WalineComponent