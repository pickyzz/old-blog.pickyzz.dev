import BLOG from '@/blog.config'
import { useEffect } from 'react'
import { loadUserThemeFromCookies } from '@/lib/theme'

const Giscus = ({ pathname, layout }) => {
  useEffect(() => {
    const theme = loadUserThemeFromCookies()
    const script = document.createElement('script')
    const anchor = document.getElementById('comments')
    script.setAttribute('src', 'https://giscus.app/client.js')
    script.setAttribute('data-repo', BLOG.comment.GiscusConfig.repo)
    script.setAttribute('data-repo-id', BLOG.comment.GiscusConfig.repoID)
    script.setAttribute('data-category', BLOG.comment.GiscusConfig.category)
    script.setAttribute(
      'data-category-id',
      BLOG.comment.GiscusConfig.categoryID
    )
    script.setAttribute('data-mapping', pathname)
    script.setAttribute('data-reactions-enabled', 1)
    script.setAttribute('data-emit-metadata', 0)
    script.setAttribute('data-theme', theme)
    script.setAttribute('data-lang', 'en')
    script.setAttribute('crossorigin', 'anonymous')
    script.setAttribute('async', true)
    anchor.appendChild(script)
    return () => {
      anchor.innerHTML = ''
    }
  })
  return (
    <>
      <div
        id="comments"
        className={layout && layout === 'fullWidth' ? '' : 'md:-ml-18'}
      ></div>
    </>
  )
}

export default Giscus
