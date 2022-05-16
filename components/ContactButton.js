import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'

const ContactButton = () => {
  return (
    <Link href="/about">
      <a
        className={
          'fixed right-10 bottom-40 animate__fadeInRight animate__animated animate__faster'
        }
      >
        <span className="dark:bg-black bg-white px-5 py-3 cursor-pointer shadow-card text-xl hover:bg-blue-500 transform duration-200 hover:text-white hover:shadow">
          <FontAwesomeIcon
            icon={faInfo}
            className="dark:text-gray-200 "
            title="about"
          />
        </span>
      </a>
    </Link>
  )
}

export default ContactButton
