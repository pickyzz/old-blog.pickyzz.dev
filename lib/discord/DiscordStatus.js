import BLOG from '@/blog.config'
import React from 'react'
import { useLanyard } from 'use-lanyard'
import { Headspace, Spotify } from '@icons-pack/react-simple-icons'

const DISCORD_ID = BLOG.discordID

export default function GetDiscordStatus() {
  const { data: activity } = useLanyard(DISCORD_ID)

  if (activity) {
    if (activity.listening_to_spotify === true) {
      return (
        <Spotify
          title={`Listening to ${activity.spotify.song} - ${activity.spotify.artist}`}
          color="#23ff71"
          size={20}
        />
      )
    } else {
      if (activity.discord_status === 'offline') {
        return <Headspace title="Offline" color="#9196a1" size={20} />
      } else if (activity.discord_status === 'online') {
        return <Headspace title="Online" color="#389b58" size={20} />
      } else if (activity.discord_status === 'idle') {
        return <Headspace title="Idle" color="#ffca28" size={20} />
      } else if (activity.discord_status === 'dnd') {
        return <Headspace title="Do not disturb" color="#9e383d" size={20} />
      }
    }
  } else {
    return null
  }
}
