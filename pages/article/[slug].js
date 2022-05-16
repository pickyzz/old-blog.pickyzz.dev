import {
  getAllCategories,
  getAllPosts,
  getAllTags,
  getPostBlocks
} from '@/lib/notion'
import BLOG from '@/blog.config'
import { getPageTableOfContents } from 'notion-utils'

import BaseLayout from '@/layouts/BaseLayout'
import Custom404 from '@/pages/404'

import ArticleDetail from '@/components/ArticleDetail'
import { getNotionPageData } from '@/lib/notion/getNotionData'

const Slug = ({
  post,
  blockMap,
  tags,
  prev,
  next,
  allPosts,
  recommendPosts,
  categories
}) => {
  if (!post) {
    return <Custom404 />
  }
  const meta = {
    title: `${post.title} | ${BLOG.title}`,
    description: post.summary,
    type: 'article',
    tags: post.tags
  }

  return (
    <BaseLayout
      meta={meta}
      tags={tags}
      post={post}
      totalPosts={allPosts}
      categories={categories}
    >
      <ArticleDetail
        post={post}
        blockMap={blockMap}
        recommendPosts={recommendPosts}
        prev={prev}
        next={next}
      />
    </BaseLayout>
  )
}

export async function getStaticPaths() {
  let posts = []
  if (BLOG.isProd) {
    posts = await getAllPosts({ from: 'slug - paths', includePage: true })
  }
  return {
    paths: posts.map(row => ({ params: { slug: row.slug } })),
    fallback: true
  }
}

export async function getStaticProps({ params: { slug } }) {
  const from = `slug-props-${slug}`
  const notionPageData = await getNotionPageData({ from })
  let allPosts = await getAllPosts({ notionPageData, from, includePage: true })
  const post = allPosts.find(p => p.slug === slug)

  if (!post) {
    return { props: {}, revalidate: 1 }
  }

  const blockMap = await getPostBlocks(post.id, 'slug')
  if (blockMap) {
    post.content = Object.keys(blockMap.block)
    post.toc = getPageTableOfContents(post, blockMap)
  }

  allPosts = allPosts.filter(post => post.type[0] === 'Post')
  const tagOptions = notionPageData.tagOptions
  const tags = await getAllTags({ allPosts, tagOptions })
  const categories = await getAllCategories(allPosts)
  // 上一篇、下一篇文章关联
  const index = allPosts.indexOf(post)
  const prev = allPosts.slice(index - 1, index)[0] ?? allPosts.slice(-1)[0]
  const next = allPosts.slice(index + 1, index + 2)[0] ?? allPosts[0]

  const recommendPosts = getRecommendPost(post, allPosts)

  return {
    props: {
      post,
      blockMap,
      tags,
      prev,
      next,
      allPosts,
      recommendPosts,
      categories
    },
    revalidate: 1
  }
}

function getRecommendPost(post, allPosts, count = 5) {
  let filteredPosts = Object.create(allPosts)
  // filter the same tag
  if (post.tags && post.tags.length) {
    const currentTag = post.tags[0]
    filteredPosts = filteredPosts.filter(
      p => p && p.tags && p.tags.includes(currentTag) && p.slug !== post.slug
    )
  }
  shuffleSort(filteredPosts)

  // Filter the top 5
  if (filteredPosts.length > count) {
    filteredPosts = filteredPosts.slice(0, count)
  }
  return filteredPosts
}

function shuffleSort(arr) {
  let i = arr.length - 1
  while (i > 0) {
    const rIndex = Math.floor(Math.random() * i)
    const temp = arr[rIndex]
    arr[rIndex] = arr[i]
    arr[i] = temp
    i--
  }
  return arr
}

export default Slug
