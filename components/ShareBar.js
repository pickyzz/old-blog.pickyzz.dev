import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import React from 'react'
import { createPopper } from '@popperjs/core'
import copy from 'copy-to-clipboard'
import QRCode from 'qrcode.react'
import { useGlobal } from '@/lib/global'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookSquare,
  faTelegram,
  faTwitterSquare,
  faWeixin
} from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'

const ShareBar = ({ post }) => {
  const router = useRouter()
  const shareUrl = BLOG.link + router.asPath

  // 二维码悬浮
  const [qrCodeShow, setQrCodeShow] = React.useState(false)
  const btnRef = React.createRef()
  const popoverRef = React.createRef()
  const { locale } = useGlobal()

  const openPopover = () => {
    createPopper(btnRef.current, popoverRef.current, {
      placement: 'top'
    })
    setQrCodeShow(true)
  }
  const closePopover = () => {
    setQrCodeShow(false)
  }

  const copyUrl = () => {
    copy(shareUrl)
    alert(locale.COMMON.URL_COPIED)
  }

  return <>
    <div
      className='py-2 text-gray-500 text-center space-x-2 flex my-1 dark:text-gray-200 overflow-visible'>
      <div className='hidden md:block text-gray-800 dark:text-gray-300 mr-2 my-2 whitespace-nowrap'>{locale.COMMON.SHARE}:</div>
      <div className='text-3xl cursor-pointer'>
        <a className='text-blue-700' target='_blank' rel='noreferrer' href={`https://www.facebook.com/sharer.php?u=${shareUrl}`} >
          <FontAwesomeIcon icon={faFacebookSquare} className='transition ease-in-out duration-150 hover:-translate-y-1 hover:scale-105'/>
        </a>
      </div>
      <div className='text-3xl cursor-pointer'>
        <a className='text-blue-400' target='_blank' rel='noreferrer' href={`https://twitter.com/intent/tweet?title=${post.title}&url=${shareUrl} via @p1ckyzz`} >
          <FontAwesomeIcon icon={faTwitterSquare} className='transition ease-in-out duration-150 hover:-translate-y-1 hover:scale-105'/>
        </a>
      </div>
      <div className='text-3xl cursor-pointer'>
        <a className='text-blue-500' target='_blank' rel='noreferrer' href={`https://telegram.me/share/url?url=${shareUrl}&text=${post.title}`} >
        <FontAwesomeIcon icon={faTelegram} className='transition ease-in-out duration-150 hover:-translate-y-1 hover:scale-105'/>
        </a>
      </div>
      <div className='cursor-pointer text-2xl'>
        <a className='text-green-600' ref={btnRef} onMouseEnter={openPopover} onMouseLeave={closePopover}>
          <FontAwesomeIcon icon={faWeixin} className='transition ease-in-out duration-150 hover:-translate-y-1 hover:scale-105'/>
          <div ref={popoverRef} className={(qrCodeShow ? 'animate__animated animate__fadeIn ' : 'hidden') + ' text-center py-2'}>
            <div className='p-2 bg-white border-0 duration-200 transform block z-50 font-normal shadow-xl mr-10'>
              <QRCode value={shareUrl} fgColor='#000000' />
            </div>
            <span className='bg-white text-black dark:bg-transparent dark:text-white font-semibold p-1 mb-0 rounded-t-lg text-sm mx-auto mr-10'>
            {locale.COMMON.SCAN_QR_CODE}
            </span>
          </div>
        </a>
      </div>
      <div className='cursor-pointer text-2xl'>
        <a className='text-yellow-600' onClick={copyUrl} >
          <FontAwesomeIcon icon={faLink} className='transition ease-in-out duration-150 hover:-translate-y-1 hover:scale-105'/>
        </a>
      </div>
    </div>
  </>
}
export default ShareBar
