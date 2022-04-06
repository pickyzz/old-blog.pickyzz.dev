import BLOG from '@/blog.config'
import BlogAround from '@/components/BlogAround'
import Comment from '@/components/Comment'
import RecommendPosts from '@/components/RecommendPosts'
import ShareBar from '@/components/ShareBar'
import TagItem from '@/components/TagItem'
import TocDrawer from '@/components/TocDrawer'
import TocDrawerButton from '@/components/TocDrawerButton'
import formatDate from '@/lib/formatDate'
import { useGlobal } from '@/lib/global'
import { faEye, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import mediumZoom from 'medium-zoom'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-typescript'
import { useEffect, useRef } from 'react'
import { NotionRenderer } from 'react-notion-x'
import { Collection } from 'react-notion-x/build/third-party/collection'
import { Code } from 'react-notion-x/build/third-party/code'
import { Equation } from 'react-notion-x/build/third-party/equation'
import { Pdf } from 'react-notion-x/build/third-party/pdf'
import { Modal } from 'react-notion-x/build/third-party/modal'
import { Tweet } from 'react-static-tweets'
import ArticleCopyright from './ArticleCopyright'
import WordCount from './WordCount'

/**
 *
 * @param {*} param0
 * @returns
 */
export default function ArticleDetail (props) {
  const { post, blockMap, recommendPosts, prev, next } = props
  const drawerRight = useRef(null)
  const targetRef = useRef(null)
  const url = BLOG.link + useRouter().asPath
  const { locale } = useGlobal()
  const date = formatDate(post?.date?.start_date || post.createdTime, locale.LOCALE)

  const zoom = typeof window !== 'undefined' && mediumZoom({
    container: '.notion-viewport',
    background: 'rgba(0, 0, 0, 0.2)',
    margin: getMediumZoomMargin()
  })
  const zoomRef = useRef(zoom ? zoom.clone() : null)

  useEffect(() => {
    // Add all images under all containers to medium-zoom
    const container = document.getElementById('container')
    const imgList = container.getElementsByTagName('img')
    if (imgList && zoomRef.current && !post?.page_cover && !post.type.includes('Page')) {
      for (let i = 0; i < imgList.length; i++) {
        (zoomRef.current).attach(imgList[i])
      }
    }
  })

  return (<>
      <div id="container" ref={targetRef} className="shadow md:hover:shadow-2xl overflow-x-auto flex-grow mx-auto w-screen md:w-full ">
          <article itemScope itemType="https://schema.org/Movie"
            className="shadow md:hover:shadow-2xl duration-300 subpixel-antialiased py-10 px-5 lg:pt-0 md:px-0 xl:px-0 dark:border-gray-700 bg-white dark:bg-gray-800"
          >

            {post.type[0] === 'Post' && (<header
              className='h-full w-full md:w-auto overflow-hidden py-10 px-4 bg-cover bg-center'
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0,0,0,0.4), rgba(0, 0, 0, 0.8) ),url(${post.page_cover || post.cover})`
              }}
            >

              {post.type[0] === 'Post' && (<>
                {/* 文章Title */}
                <div className="font-bold text-center text-3xl text-white dark:text-white font-Maitree pt-6">
                    {post.title}
                </div>
              </>)}

              {post.type && !post.type.includes('Page') && (
                <section className="flex-wrap flex justify-center mt-2 text-gray-400 dark:text-gray-400 font-light leading-8">
                  <div>
                    <Link href={`/category/${post.category}`} passHref>
                      <a className="cursor-pointer text-md mr-2 hover:text-black dark:hover:text-white border-b dark:border-gray-500 border-dashed">
                        <FontAwesomeIcon icon={faFolderOpen} className="mr-1" />
                        {post.category}
                      </a>
                    </Link>
                    <span className='mr-2'>|</span>

                    {post.type[0] !== 'Page' && (<>
                      <Link
                        href={`/archive#${post?.date?.start_date?.substr(0, 7)}`}
                        passHref
                      >
                        <a className="pl-1 mr-2 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 border-b dark:border-gray-500 border-dashed">
                          {date}
                        </a>
                      </Link>
                      <span className='mr-2'>|</span>
                    </>)}

                    <div className="hidden busuanzi_container_page_pv font-light mr-2">
                      <FontAwesomeIcon icon={faEye} className='mr-1'/>
                      &nbsp;
                      <span className="mr-2 busuanzi_value_page_pv"
                      ></span>
                      <span className='mr-2'>|</span>
                    </div>
                  </div>
                  <div className='flex flex-nowrap whitespace-nowrap items-center font-light text-md'>
                    <WordCount/>
                  </div>
                </section>
              )}
            </header>)}

            {post.type[0] === 'Page' && (<header className='h-full w-full md:w-auto'>
              <div className="font-bold text-3xl text-black dark:text-white font-Maitree pt-6 px-4 pt-8 md:px-24 xl:px-36">
                {post.title}
              </div>
            </header>)}

            {/* Notion文章主体 */}
            <section id='notion-article' className='px-1 pt-8 md:px-24 xl:px-36'>
              {blockMap && (
                <NotionRenderer
                  recordMap={blockMap}
                  mapPageUrl={mapPageUrl}
                  components={{
                    nextImage: Image,
                    nextLink: Link,
                    Code,
                    Collection,
                    Equation,
                    Pdf,
                    Tweet,
                    Modal
                  }}
                />
              )}
            </section>

            <section className="px-1 py-2 my-1 text-sm font-light overflow-auto text-gray-600  dark:text-gray-400">
              {/* ads google */}
              {/* <ins className="adsbygoogle"
                style={{ display: 'block', textAlign: 'center' }}
                data-adtest="on"
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client=""
                data-ad-slot=""></ins> */}
            </section>

            {/* 推荐文章 */}
            <RecommendPosts currentPost={post} recommendPosts={recommendPosts} />

            {/* 版权声明 */}
            <ArticleCopyright author={BLOG.author} url={url} />

            {/* 标签列表 */}
            <section className="md:flex md:justify-between md:px-24 xl:px-32">
              {post.tagItems && !post.type.includes('Page') && (
                <div className="flex flex-nowrap leading-8 p-1 py-4 overflow-x-auto">
                  <div className="hidden md:block dark:text-gray-300 whitespace-nowrap">
                    {locale.COMMON.TAGS}：
                  </div>
                  {post.tagItems.map(tag => (
                    <TagItem key={tag.name} tag={tag} />
                  ))}
                </div>
              )}
              <div>
                <ShareBar post={post} />
              </div>
            </section>

            <BlogAround prev={prev} next={next} />

            {/* comment */}
            {post.type && !post.type.includes('Page') && (
                <Comment frontMatter={post} />
            )}

          </article>

      </div>

      {/* 悬浮目录按钮 */}
      <div className="block lg:hidden">
        <TocDrawerButton onClick={() => { drawerRight.current.handleSwitchVisible() }} />
        <TocDrawer post={post} cRef={drawerRight} targetRef={targetRef} />
      </div>

    </>)
}

const mapPageUrl = id => {
  return 'https://www.notion.so/' + id.replace(/-/g, '')
}

function getMediumZoomMargin () {
  const width = window.innerWidth

  if (width < 500) {
    return 8
  } else if (width < 800) {
    return 20
  } else if (width < 1280) {
    return 30
  } else if (width < 1600) {
    return 40
  } else if (width < 1920) {
    return 48
  } else {
    return 72
  }
}
