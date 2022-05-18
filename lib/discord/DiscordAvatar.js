import BLOG from '@/blog.config'
import React from 'react'
import Image from 'next/image'
import { useLanyard } from 'use-lanyard'

const DISCORD_ID = BLOG.discordID

export default function GetDiscordAvatar() {
  const { data: activity } = useLanyard(DISCORD_ID)
  if (activity) {
    return (
      <Image
        alt={BLOG.title}
        width={120}
        height={120}
        loading="lazy"
        src={
          `https://cdn.discordapp.com/avatars/77791675115642880/` +
          activity.discord_user.avatar +
          `.png?size=128`
        }
        className="rounded-full"
      />
    )
  } else {
    return null
  }
}
