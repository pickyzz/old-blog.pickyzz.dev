import BLOG from '@/blog.config'
import Head from 'next/head'
import { useRouter } from 'next/router'

const CommonHead = ({ meta }) => {
  let url = BLOG.path.length ? `${BLOG.link}/${BLOG.path}` : BLOG.link
  if (meta) {
    const router = useRouter()
    url = `${url}${router.asPath}`
  }
  const title = meta?.title || BLOG.title
  const description = meta?.description || BLOG.description
  const type = meta?.type || 'website'
  const keywords = meta?.tags || BLOG.seo.keywords

  const ogImage = `${BLOG.ogImageGenerateURL}/${encodeURIComponent(
    title
  )}.png?theme=dark&md=1&fontSize=75px&images=https%3A%2F%2Fraw.githubusercontent.com%2Fpickyzz%2Fpickyzz.ga%2F9a319c06dae88b888f1c1d1e25f175152ab397b8%2Fpublic%2Ffavicon.svg&widths=350&heights=350`

  return (
    <Head>
      <title>{title}</title>
      <meta name='theme-color' content={BLOG.darkBackground} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
      <meta name='robots' content='follow, index' />
      <meta charSet='UTF-8' />
      {BLOG.seo.googleSiteVerification && (
        <meta
          name='google-site-verification'
          content={BLOG.seo.googleSiteVerification}
        />
      )}
      {keywords && (
        <meta name='keywords' content={keywords.join(', ')} />
      )}
      <meta name='description' content={description} />
      <meta property='og:locale' content={BLOG.lang} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={ogImage} />
      <meta property='og:url' content={url} />
      <meta property='og:type' content={type} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:title' content={title} />
      {meta.type === 'article' && (
        <>
          <meta
            property='article:published_time'
            content={meta.date || meta.createdTime}
          />
          <meta property='article:author' content={BLOG.author} />
        </>
      )}
    </Head>
  )
}

export default CommonHead
