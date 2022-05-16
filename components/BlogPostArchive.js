import React, { useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'

const BlogPostArchive = ({ posts = [], archiveTitle }) => {
  const targetRef = useRef(null)
  if (!posts || posts.length === 0) {
    return <></>
  } else {
    return (
      <div className="animate__animated animate__fadeInDown" ref={targetRef}>
        <div
          className="pt-16 pb-4 text-3xl dark:text-gray-300"
          id={archiveTitle}
        >
          {archiveTitle}
        </div>
        <ul>
          {posts.map(post => (
            <li
              key={post.id}
              className="mx-4 border-l-2 p-1 text-xs md:text-base items-center  hover:scale-x-105 hover:border-gray-500 dark:hover:border-gray-300 dark:border-gray-400 transform duration-500"
            >
              <div name={post?.date?.start_date}>
                <span className="text-gray-400">{post.date.start_date}</span>{' '}
                &nbsp;
                <Link href={`${BLOG.path}/article/${post.slug}`} passHref>
                  <a className="dark:text-gray-400 dark:hover:text-gray-300 overflow-x-hidden hover:underline cursor-pointer text-gray-600">
                    {post.title}
                  </a>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default BlogPostArchive
