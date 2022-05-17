import React from 'react'
import { useLanyard } from 'use-lanyard'
import { Headspace } from '@icons-pack/react-simple-icons'

const DISCORD_ID = '77791675115642880'

export default function DiscordData() {
  const { data: activity } = useLanyard(DISCORD_ID)

  if (activity) {
    if (activity && activity.discord_status === 'offline') {
      return <Headspace title="offline" color="#9196a1" size={20} />
    } else if (activity && activity.discord_status === 'online') {
      return <Headspace title="online" color="#378d53" size={18} />
    } else if (activity && activity.discord_status === 'idle') {
      return <Headspace title="idle" color="#ffca28" size={18} />
    } else if (activity && activity.discord_status === 'dnd') {
      return <Headspace title="Do not disturb" color="#9e383d" size={18} />
    }
  } else {
    return null
  }
}
