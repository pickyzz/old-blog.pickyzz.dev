import BLOG from '@/blog.config'
import Router from 'next/router'
import React from 'react'
import SocialButton from './SocialButton'
import GetDiscordStatus from '@/lib/discord/DiscordStatus'
import GetDiscordAvatar from '@/lib/discord/DiscordAvatar'

const InfoCard = ({ postCount }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div
          id="profileImage"
          className="hover:scale-[103%] transform duration-200 cursor-pointer"
          onClick={() => {
            Router.push('/about')
          }}
        >
          <GetDiscordAvatar />
          <div className="-mt-[20%] text-center">
            <div className="absolute top-29 right-4">
              <GetDiscordStatus />
            </div>
          </div>
        </div>
        <div className="mt-6 text-2xl font-mono dark:text-white py-2 -mb-4">
          {BLOG.author}
        </div>
        <div className="font-light dark:text-white py-2 mb-2">{BLOG.bio}</div>
        <SocialButton />
      </div>
    </>
  )
}

export default InfoCard
