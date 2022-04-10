import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useGlobal } from '@/lib/global'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive, faHome, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import BLOG from 'blog.config'

const MenuButtonGroup = ({ allowCollapse = false }) => {
  const { locale } = useGlobal()
  const router = useRouter()
  const links = [
    { id: 0, icon: faHome, name: locale.NAV.INDEX, to: '/' || '/', show: true },
    { id: 1, icon: faInfoCircle, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    { id: 2, icon: faArchive, name: locale.NAV.ARCHIVE, to: '/archive', show: BLOG.showArchive }
    // { id: 3, icon: faRss, name: locale.NAV.RSS, to: '/feed', show: true }
    // { id: 7, icon: 'faGithub', name: 'Github', to: 'https://github.com/tangly1024', show: true },
    // { id: 5, icon: 'faWeibo', name: '微博', to: 'https://weibo.com/tangly1024', show: true },
    // { id: 4, icon: 'faEnvelope', name: locale.NAV.MAIL, to: 'mailto:tlyong1992@hotmail.com', show: true }
    // { id: 3, icon: 'faCompass', name: '发现', to: 'https://search.tangly1024.com/', show: true }
    // { id: 6, icon: 'faMapMarker', name: 'Fuzhou', to: '#', show: true },
    // { id: 8, icon: 'faTwitter', name: 'Twitter', to: 'https://twitter.com/troy1024_1', show: true },
    // { id: 9, icon: 'faTelegram', name: 'Telegram', to: 'https://t.me/tangly_1024', show: true }
  ]
  return <nav id='nav'>
    <div className='leading-8 text-gray-500 dark:text-gray-400 '>
      {links.map(link => {
        if (link.show) {
          const selected = (router.pathname === link.to) || (router.asPath === link.to)
          return <Link key={link.id + link.icon} title={link.to} href={link.to} >
            <a className={'py-1 my-1 px-5 mx-2 duration-300 text-base hover:bg-gray-500 hover:text-white hover:shadow-lg cursor-pointer font-light flex flex-nowrap items-center ' +
              (selected ? 'bg-gray-200 text-black dark:bg-gray-600 dark:text-white' : ' ')} >
              <div className='my-auto justify-center flex '>
                <FontAwesomeIcon icon={link.icon} />
              </div>
              <div className={'ml-4'}>{link.name}</div>
            </a>
          </Link>
        } else {
          return <></>
        }
      })}
    </div>
  </nav>
}
export default MenuButtonGroup
