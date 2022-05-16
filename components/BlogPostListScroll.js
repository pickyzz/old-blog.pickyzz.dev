import BlogPostCard from '@/components/BlogPostCard'
import BLOG from '@/blog.config'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import throttle from 'lodash.throttle'
import BlogPostListEmpty from '@/components/BlogPostListEmpty'
import { useGlobal } from '@/lib/global'

const BlogPostListScroll = ({
  posts = [],
  currentSearch,
  currentCategory,
  currentTag
}) => {
  const postsPerPage = BLOG.postsPerPage
  const [page, updatePage] = useState(1)
  const postsToShow = getPostByPage(page, posts, postsPerPage)

  let hasMore = false
  if (posts) {
    const totalCount = posts.length
    hasMore = page * postsPerPage < totalCount
  }

  const handleGetMore = () => {
    if (!hasMore) return
    updatePage(page + 1)
  }

  // Listen for scrolling automatic paging loading
  const scrollTrigger = useCallback(
    throttle(() => {
      const scrollS = window.scrollY + window.outerHeight
      const clientHeight = targetRef
        ? targetRef.current
          ? targetRef.current.clientHeight
          : 0
        : 0
      if (scrollS > clientHeight + 100) {
        handleGetMore()
      }
    }, 500)
  )

  // monitor scroll
  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  })

  const targetRef = useRef(null)
  const { locale } = useGlobal()

  if (!postsToShow || postsToShow.length === 0) {
    return <BlogPostListEmpty currentSearch={currentSearch} />
  } else {
    return (
      <div id="container" className="mt-10 md:mt-0" ref={targetRef}>
        {/* Article list */}
        <div className="flex flex-wrap space-y-8 mx-5 md:mx-0">
          {postsToShow.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>

        <div>
          <div
            onClick={() => {
              handleGetMore()
            }}
            className="w-full my-4 py-4  text-center cursor-pointer glassmorphism shadow-xl rounded-xl dark:text-gray-200"
          >
            {' '}
            {hasMore ? locale.COMMON.MORE : `${locale.COMMON.NO_MORE}`}{' '}
          </div>
        </div>
      </div>
    )
  }
}

const getPostByPage = function (page, totalPosts, postsPerPage) {
  return totalPosts.slice(0, postsPerPage * page)
}
export default BlogPostListScroll
