import BLOG from '@/blog.config'
import Image from 'next/image'
import Router from 'next/router'
import React from 'react'
import SocialButton from './SocialButton'

const InfoCard = ({ postCount }) => {
  return <>
    <div className='flex flex-col items-center justify-center cursor-pointer' onClick={ () => { Router.push('/about') }}>
        <div className='hover:scale-105 transform duration-200'>
          <Image
          alt={BLOG.title}
          width={128}
          height={128}
          loading='lazy'
          src='/avatar.png'
          className='rounded-lg'
        />
        </div>
        <div className='text-2xl font-serif dark:text-white py-2 hover:scale-105 transform duration-200'>{BLOG.author}</div>
        <div className='font-light dark:text-white py-2 hover:scale-105 transform duration-200'>{BLOG.bio}</div>
        <SocialButton/>
    </div>
  </>
}

export default InfoCard
