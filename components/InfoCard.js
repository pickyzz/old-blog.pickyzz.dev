import BLOG from '@/blog.config'
import Image from 'next/image'
import Router from 'next/router'
import React from 'react'
import SocialButton from './SocialButton'
import DiscordData from '@/lib/discordData'

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
          <Image
            alt={BLOG.title}
            width={120}
            height={120}
            loading="lazy"
            src={BLOG.avatar}
            className="rounded-full"
          />
          <div className="-mt-[20%] text-center">
            <div className="absolute top-29 right-4">
              <DiscordData />
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
