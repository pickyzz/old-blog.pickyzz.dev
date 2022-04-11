import { faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import { useGlobal } from '@/lib/global'

const TagItem = ({ tag, selected }) => {
  const { locale } = useGlobal()
  if (!tag) {
    <>{locale.COMMON.NOTAG}</>
  }
  return (
  <Link href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`} passHref>
    <li
      className={`notion-${tag.color}_background dark:bg-gray-700 list-none cursor-pointer rounded-md  
      duration-200 mr-1 my-1 px-2 py-1 text-sm whitespace-nowrap 
       hover:bg-gray-200 dark:hover:bg-gray-500 `}>
      <div className='text-gray-600 dark:text-gray-300 dark:hover:text-white'>
        {selected && <FontAwesomeIcon icon={faTag} className='mr-1'/>} {`${tag.name} `} {tag.count ? `(${tag.count})` : ''}
      </div>
    </li>
  </Link>
  )
}

export default TagItem
