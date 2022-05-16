const BlogPostListEmpty = ({ currentSearch }) => {
  return (
    <div className="flex items-center justify-center min-h-screen mx-auto md:-mt-20">
      <p className="text-gray-500 dark:text-gray-300">
        No articles found. {currentSearch && <div>{currentSearch}</div>}
      </p>
    </div>
  )
}
export default BlogPostListEmpty
