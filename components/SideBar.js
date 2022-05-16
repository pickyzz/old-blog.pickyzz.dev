import React from 'react'
import MenuButtonGroup from '@/components/MenuButtonGroup'
import InfoCard from '@/components/InfoCard'
// import TagGroups from '@/components/TagGroups'
import LatestPostsGroup from '@/components/LatestPostsGroup'
import CategoryGroup from '@/components/CategoryGroup'
import SearchInput from '@/components/SearchInput'
import Link from 'next/link'
import { useGlobal } from '@/lib/global'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDoubleRight,
  faArchive,
  faThList
} from '@fortawesome/free-solid-svg-icons'

const SideBar = ({
  title,
  tags,
  currentTag,
  post,
  posts,
  categories,
  currentCategory,
  currentSearch
}) => {
  const { locale } = useGlobal()
  return (
    <aside
      id="sidebar"
      className="pt-5 bg-white dark:bg-gray-900 w-80 z-10 dark:border-gray-500 border-gray-200 scroll-hidden h-full"
    >
      <InfoCard />

      <div
        className={
          (!post ? 'sticky top-0' : '') + ' bg-white dark:bg-gray-900 pb-4'
        }
      >
        <section className="hidden lg:block">
          <MenuButtonGroup allowCollapse={true} />
        </section>

        <section className="p-5">
          <SearchInput currentTag={currentTag} currentSearch={currentSearch} />
        </section>

        {/* Menu */}
        <section className="shadow block mb-5 py-4  bg-white dark:bg-gray-900 ">
          <MenuButtonGroup allowCollapse={true} />
        </section>

        {/* latest articles */}
        {posts && (
          <section className="mt-4">
            <div className="text-sm pb-4 px-5  flex flex-nowrap justify-between">
              <div className="font-light text-gray-600  dark:text-gray-200">
                <FontAwesomeIcon icon={faArchive} className="mr-2" />
                {locale.COMMON.LATEST_POSTS}
              </div>
            </div>
            <LatestPostsGroup posts={posts} />
          </section>
        )}

        {/* Classification  */}
        {categories && (
          <section className="mt-8">
            <div className="text-sm px-5 flex flex-nowrap justify-between font-light">
              <div className="text-gray-600 dark:text-gray-200">
                <FontAwesomeIcon icon={faThList} className="mr-2" />
                {locale.COMMON.CATEGORY}
              </div>
              <Link href="/category" passHref>
                <a className="mb-3 text-gray-400 hover:text-black dark:text-gray-400 dark:hover:text-white hover:underline cursor-pointer">
                  {locale.COMMON.MORE}{' '}
                  <FontAwesomeIcon icon={faAngleDoubleRight} />
                </a>
              </Link>
            </div>
            <CategoryGroup
              currentCategory={currentCategory}
              categories={categories}
            />
          </section>
        )}

        {/* Tag Cloud  */}
        {/* {tags && (
        <section className='mt-8'>
          <div className='text-sm py-2 px-5 flex flex-nowrap justify-between font-light dark:text-gray-200'>
            <div className='text-gray-600 dark:text-gray-200'><FontAwesomeIcon icon={faTags} className='mr-2'/>{locale.COMMON.TAGS}</div>
            <Link href='/tag' passHref>
              <a className='text-gray-400 hover:text-black  dark:hover:text-white hover:underline cursor-pointer'>
                {locale.COMMON.MORE} <FontAwesomeIcon icon={faAngleDoubleRight} />
              </a>
            </Link>
          </div>
          <div className='px-5 py-2'>
            <TagGroups tags={tags} currentTag={currentTag} />
          </div>
        </section>
      )} */}
      </div>

      {/* <section className='bg-white dark:bg-gray-900'> */}
      {/* News Feed */}
      {/* <ins className="adsbygoogle"
      style={{ display: 'block' }}
      data-adtest="on"
      data-ad-format="fluid"
      data-ad-layout-key="-5j+cz+30-f7+bf"
      data-ad-client=""
      data-ad-slot=""></ins> */}
      {/* </section> */}
    </aside>
  )
}
export default SideBar
