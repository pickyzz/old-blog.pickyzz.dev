import { faCopyright, faEye, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
// import Link from 'next/link'
import BLOG from '@/blog.config'

const Footer = ({ title }) => {
  const d = new Date()
  const y = d.getFullYear()
  const from = +BLOG.since
  return (
    <footer
      className='bg-rose-800 dark:bg-black dark:border-gray-900 border-t flex-shrink-0 justify-center text-center m-auto w-full text-gray-400 text-sm p-6'
    >
      <FontAwesomeIcon icon={faCopyright} /> <span> {`${from} - ${y}`} | <a href={BLOG.link} className='font-bold text-gray-100'>{BLOG.author}</a> | Powered by <a href='https://notion.so' className='font-bold text-gray-100'>❤</a></span>
      <span className='hidden busuanzi_container_site_pv'>
            <FontAwesomeIcon icon={faEye}/><span className='px-1 busuanzi_value_site_pv'> </span>pv
      </span>
      <span className='pl-2 hidden busuanzi_container_site_uv'>
        <FontAwesomeIcon icon={faUsers}/> <span className='px-1 busuanzi_value_site_uv'> </span>uv   </span>
        <br/>
        {/* <h1>{title}</h1> */}
    </footer>
  )
}

export default Footer
