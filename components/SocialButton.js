import BLOG from '@/blog.config'
import { faGithub, faTelegram, faTwitter, faTwitch } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

/**
 * 社交联系方式按钮组
 * @returns {JSX.Element}
 * @constructor
 */
const SocialButton = () => {
  return <div className='w-52 justify-center flex-wrap flex'>
    <div className='space-x-3 text-xl text-gray-600 dark:text-gray-400 '>
      {BLOG.socialLink.github && <a target='_blank' rel='noreferrer' title={'github'} href={BLOG.socialLink.github} >
        <FontAwesomeIcon icon={faGithub} className='transition ease-in-out duration-150 hover:-translate-y-1 hover:scale-105'/>
      </a>}
      {BLOG.socialLink.twitter && <a target='_blank' rel='noreferrer' title={'twitter'} href={BLOG.socialLink.twitter} >
        <FontAwesomeIcon icon={faTwitter} className='transition ease-in-out duration-150 hover:-translate-y-1 hover:scale-105'/>
      </a>}
      {BLOG.socialLink.telegram && <a target='_blank' rel='noreferrer' href={BLOG.socialLink.telegram} title={'telegram'} >
        <FontAwesomeIcon icon={faTelegram} className='transition ease-in-out duration-150 hover:-translate-y-1 hover:scale-105'/>
      </a>}
      {BLOG.socialLink.twitch && <a target='_blank' rel='noreferrer' title={'Twitch'} href={BLOG.socialLink.twitch} >
        <FontAwesomeIcon icon={faTwitch} className='transition ease-in-out duration-150 hover:-translate-y-1 hover:scale-105'/>
      </a>}
      {BLOG.email && <a target='_blank' rel='noreferrer' title={'email'} href={`mailto:${BLOG.email}`} >
        <FontAwesomeIcon icon={faEnvelope} className='transition ease-in-out duration-150 hover:-translate-y-1 hover:scale-105'/>
      </a>}
    </div>
  </div>
}
export default SocialButton
