// import { useGlobal } from '@/lib/global'
// import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import React, { useEffect, useState } from 'react'
// import smoothscroll from 'smoothscroll-polyfill'

// const JumpToBottomButton = ({ targetRef, showPercent = false }) => {
//   const { locale } = useGlobal()
//   const [show, switchShow] = useState(false)
//   const [percent, changePercent] = useState(0)
//   const scrollListener = () => {
//     // Handle whether to display the back to top button
//     const clientHeight = targetRef ? (targetRef.current ? targetRef.current.clientHeight : 0) : 0
//     const scrollY = window.pageYOffset
//     const fullHeight = clientHeight - window.outerHeight
//     let per = parseFloat(((scrollY / fullHeight * 100)).toFixed(0))
//     if (per > 100) per = 100
//     const shouldShow = scrollY > 100 && per > 0
//     if (shouldShow !== show) {
//       switchShow(shouldShow)
//     }
//     changePercent(per)
//   }
//   useEffect(() => {
//     smoothscroll.polyfill()

//     document.addEventListener('scroll', scrollListener)
//     return () => document.removeEventListener('scroll', scrollListener)
//   }, [show])

//   return (<div id='jump-to-top' className='right-2 fixed flex bottom-36 z-20'>
//       <div onClick={() => window.scrollTo({ top: targetRef.current.clientHeight, behavior: 'smooth' })}
//         className={(show ? '' : 'hidden') + ' animate__fadeInRight animate__animated animate__faster shadow-card rounded-xl glassmorphism flex justify-center items-center w-9 h-9 cursor-pointer '}>
//         <div className='text-center'>
//         <div className='dark:text-gray-200 transform hover:scale-150 duration-200 text-xs' title={locale.POST.BOT} >
//           <FontAwesomeIcon icon={faArrowDown} />
//         </div>
//           {showPercent && (<div className='w-10 text-xs dark:text-gray-200'>{percent}</div>)}
//         </div>
//       </div>
//     </div>)
// }

// export default JumpToBottomButton
