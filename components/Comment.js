import BLOG from '@/blog.config'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import 'gitalk/dist/gitalk.css'
import { useGlobal } from '@/lib/global'

const GitalkComponent = dynamic(
  () => {
    return import('gitalk/dist/gitalk-component')
  },
  { ssr: false }
)
const UtterancesComponent = dynamic(
  () => {
    return import('@/components/Utterances')
  },
  { ssr: false }
)
const GiscusComponent = dynamic(
  () => {
    return import('@/components/Giscus')
  },
  { ssr: false }
)
const CusdisComponent = dynamic(
  () => {
    return import('react-cusdis').then(m => m.ReactCusdis)
  },
  { ssr: false }
)
const WalineComponent = dynamic(
  () => {
    return import('@/components/Waline')
  },
  { ssr: false }
)

const Comment = ({ frontMatter }) => {
  const router = useRouter()
  const { theme } = useGlobal()

  return <div className='comment text-gray-800 dark:text-gray-300 md:px-20 xl:px-28'>
    {BLOG.comment.provider === 'gitalk' && (<div className='m-10'>
      <GitalkComponent
        options={{
          id: frontMatter.id,
          title: frontMatter.title,
          clientID: BLOG.comment.gitalkConfig.clientID,
          clientSecret: BLOG.comment.gitalkConfig.clientSecret,
          repo: BLOG.comment.gitalkConfig.repo,
          owner: BLOG.comment.gitalkConfig.owner,
          admin: BLOG.comment.gitalkConfig.admin,
          distractionFreeMode: BLOG.comment.gitalkConfig.distractionFreeMode
        }}
      />
    </div>)}
    {BLOG.comment.provider === 'utterances' && (<div className='m-10'>
      <UtterancesComponent issueTerm={frontMatter.id} className='px-2' />
    </div>
    )}
    {BLOG.comment.provider === 'giscus' && (<div className='m-10'>
      <GiscusComponent issueTerm={frontMatter.id} className='px-2' />
    </div>
    )}
    {BLOG.comment.provider === 'cusdis' && (<>
      <script defer src='https://cusdis.com/js/widget/lang/zh-cn.js' />
      <div className='m-10'>
        <CusdisComponent
          attrs={{
            host: BLOG.comment.cusdisConfig.host,
            appId: BLOG.comment.cusdisConfig.appId,
            pageId: frontMatter.id,
            pageTitle: frontMatter.title,
            pageUrl: BLOG.link + router.asPath,
            theme
          }}
          lang={BLOG.lang.toLowerCase()}
        />
      </div>
    </>)}
    {BLOG.comment.provider === 'waline' && (<>
      <div className='m-10 w-auto'>
        <WalineComponent />
      </div>
    </>)}
  </div>
}

export default Comment
