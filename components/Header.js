import BLOG from '@/blog.config'
// import { useGlobal } from '@/lib/global'
// import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import Typed from 'typed.js'

// let wrapperTop = 0
// let windowTop = 0
// let autoScroll = false

/**
 *
 * @returns 头图
 */
export default function Header () {
  const [typed, changeType] = useState()
  let url = BLOG.path.length ? `${BLOG.link}/${BLOG.path}` : BLOG.link
  useEffect(() => {
    // if (!typed && window && document.getElementById('typed')) {
    if (!typed && document.getElementById('typed')) {
      changeType(
        new Typed('#typed', {
          strings: BLOG.home.homeBannerStrings,
          typeSpeed: 70,
          backSpeed: 100,
          backDelay: 400,
          showCursor: true,
          smartBackspace: true,
          shuffle: true,
          fadeOut: true,
          fadeOutDelay: 500,
          loop: false,
          loopCount: Infinity,
          cursorChar: '|'
        })
      )
    }
  })
  // const { theme } = useGlobal()

  // const autoScrollEnd = () => {
  //   if (autoScroll) {
  //     windowTop = window.scrollY
  //     autoScroll = false
  //   }
  // }

  // const scrollTrigger = () => {
  //   if (
  //     (window.scrollY > windowTop) &
  //     (window.scrollY < window.innerHeight) &
  //     !autoScroll
  //   ) {
  //     autoScroll = true
  //     window.scrollTo({ top: wrapperTop, behavior: 'smooth' })
  //     setTimeout(autoScrollEnd, 500)
  //   }
  //   if (
  //     (window.scrollY < windowTop) &
  //     (window.scrollY < window.innerHeight) &
  //     !autoScroll
  //   ) {
  //     autoScroll = true
  //     window.scrollTo({ top: 0, behavior: 'smooth' })
  //     setTimeout(autoScrollEnd, 500)
  //   }
  //   windowTop = window.scrollY

  //   updateTopNav()
  // }

  // const updateTopNav = () => {
  //   if (theme !== 'dark') {
  //     const stickyNavElement = document.getElementById('sticky-nav')
  //     if (window.scrollY < window.innerHeight) {
  //       stickyNavElement.classList.add('dark')
  //     } else {
  //       stickyNavElement.classList.remove('dark')
  //     }
  //   }
  // }

  // function updateHeaderHeight () {
  //   setTimeout(() => {
  //     if (window) {
  //       const wrapperElement = document.getElementById('wrapper')
  //       wrapperTop = wrapperElement.offsetTop
  //     }
  //   }, 500)
  // }

  // useEffect(() => {
  //   updateHeaderHeight()
  //   updateTopNav()
  //   window.addEventListener('scroll', scrollTrigger)
  //   window.addEventListener('resize', updateHeaderHeight)
  //   return () => {
  //     window.removeEventListener('scroll', scrollTrigger)
  //     window.removeEventListener('resize', updateHeaderHeight)
  //   }
  // })

  return (
    <header
      id="header"
      className="duration-500 md:bg-scroll w-full bg-cover bg-center h-64 bg-black"
      style={{
        backgroundImage:
          `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0,0,0,0.2), rgba(0, 0, 0, 0.8) ),url("${url}${BLOG.home.homeBannerImage}")`
      }}
    >
      <div className="absolute flex h-80 items-center lg:-mt-10 justify-center w-full text-2xl md:text-5xl text-white">
        <div id='typed' className='flex text-center font-Firacode'/>
      </div>

      {/* scroll button */}
      {/* <div
        onClick={() => {
          window.scrollTo({ top: wrapperTop, behavior: 'smooth' })
        }}
        className="cursor-pointer w-full text-center py-4 text-5xl absolute bottom-10 text-white"
      >
        <FontAwesomeIcon icon={faAngleDown} className='animate-bounce'/>
      </div> */}

    </header>
  )
}
