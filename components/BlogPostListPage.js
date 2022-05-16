import BlogPostCard from '@/components/BlogPostCard'
import PaginationNumber from './PaginationNumber'
import BLOG from '@/blog.config'

import { useRouter } from 'next/router'
import BlogPostListEmpty from '@/components/BlogPostListEmpty'

const BlogPostListPage = ({ page = 1, posts = [] }) => {
  let filteredBlogPosts = posts

  // Process query filtering Support label and keyword filtering
  let currentSearch = ''
  const router = useRouter()
  if (router.query && router.query.s) {
    currentSearch = router.query.s
    filteredBlogPosts = posts.filter(post => {
      const tagContent = post.tags ? post.tags.join(' ') : ''
      const searchContent = post.title + post.summary + tagContent + post.slug
      return searchContent.toLowerCase().includes(currentSearch.toLowerCase())
    })
  }

  // Handling pagination
  const totalPage = Math.ceil(filteredBlogPosts.length / BLOG.postsPerPage)
  const postsToShow = filteredBlogPosts.slice(
    BLOG.postsPerPage * (page - 1),
    BLOG.postsPerPage * page
  )
  let showNext = false
  if (filteredBlogPosts) {
    const totalPosts = filteredBlogPosts.length
    showNext = page * BLOG.postsPerPage < totalPosts
  }

  if (!postsToShow || postsToShow.length === 0) {
    return <BlogPostListEmpty />
  } else {
    return (
      <div id="container" className="mt-10 md:mt-0">
        {/* Article list */}
        <div className="flex flex-wrap space-y-8 mx-5 md:mx-0">
          {postsToShow.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>

        <PaginationNumber
          page={page}
          showNext={showNext}
          totalPage={totalPage}
        />
      </div>
    )
  }
}

export default BlogPostListPage
