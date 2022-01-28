const BLOG = {
  title: 'Pickyzz',
  author: 'Parinya T.',
  bio: 'Just learning to code',
  email: 'pikcolokung@gmail.com',
  link: 'https://pickyzz.dev',
  description: 'Just a man whom learing to code',
  home: {
    showHomeBanner: false, // 首页是否显示大图及标语 [true,false]
    homeBannerStrings: ['Happy new year 2022', 'ขอให้มีความสุขตลอดปี'], // 首页文字
    homeBannerImage: './ny2022.jpg', // 首图
  },
  lang: 'en-US', // ['zh-CN','en-US'] default lang => see /lib/lang.js for more.
  notionPageId: process.env.NOTION_PAGE_ID || '', // Important page_id！！！
  notionAccessToken: process.env.NOTION_ACCESS_TOKEN || '', // Useful if you prefer not to make your database public
  appearance: 'light', // ['light', 'dark', 'auto'],
  font: 'font-sans tracking-wider subpixel-antialiased', // 文章字体 ['font-sans', 'font-serif', 'font-mono'] @see https://www.tailwindcss.cn/docs/font-family
  lightBackground: '#ffffff', // use hex value, don't forget '#' e.g #fffefc
  darkBackground: '#111827', // use hex value, don't forget '#'
  path: '', // leave this empty unless you want to deploy in a folder
  since: 2020, // if leave this empty, current year will be used.
  postListStyle: 'scroll', // ['page','scroll]
  postsPerPage: 7, // post counts per page
  sortByDate: true,
  showAbout: true, // WIP 是否显示关于
  showArchive: true, // WIP 是否显示归档
  autoCollapsedNavBar: false, // the automatically collapsed navigation bar
  ogImageGenerateURL: 'https://og-image-pickyzz.vercel.app', // The link to generate OG image, don't end with a slash
  seo: {
    keywords: ['Notion', 'pickyzz', 'blog'],
    googleSiteVerification: '' // Remove the value or replace it with your own google site verification code
  },
  analytics: {
    provider: 'ga', // Currently we support Google Analytics and Ackee, please fill with 'ga' or 'ackee', leave it empty to disable it.
    ackeeConfig: {
      tracker: '', // e.g 'https://ackee.tangly1024.net/tracker.js'
      dataAckeeServer: '', // e.g https://ackee.tangly1024.net , don't end with a slash
      domainId: '' // e.g '0e2257a8-54d4-4847-91a1-0311ea48cc7b'
    },
    gaConfig: {
      measurementId: 'G-F0LYXZGWQ6' // e.g: G-XXXXXXXXXX
    },
    baiduAnalytics: '', // e.g only need xxxxx -> https://hm.baidu.com/hm.js?[xxxxx]
    busuanzi: false, // see http://busuanzi.ibruce.info/
    cnzzAnalytics: '' // 站长统计id only need xxxxxxxx -> https://s9.cnzz.com/z_stat.php?id=[xxxxxxxx]&web_id=[xxxxxxx]
  },
  socialLink: {
    twitter: 'https://twitter.com/p1ckyzz',
    github: 'https://github.com/pickyzz',
    telegram: 'https://t.me/pickyzz'
  },
  comment: {
    // support provider: gitalk, utterances, cusdis, giscus
    provider: 'gitalk', // leave it empty if you don't need any comment plugin
    gitalkConfig: {
      repo: 'pickyzz-blog-comment', // The repository of store comments
      owner: 'pickyzz',
      admin: ['pickyzz'],
      clientID: '83ad43f71ac4264b7e49',
      clientSecret: 'b91ccc31d654e37e0cae28e291148d287e7dc46a',
      distractionFreeMode: true
    },
    cusdisConfig: {
      appId: '39653082-a845-4340-bb5b-b8546fcf04b4', // data-app-id
      host: 'https://cusdis.com', // data-host, change this if you're using self-hosted version
      scriptSrc: 'https://cusdis.com/js/cusdis.es.js' // change this if you're using self-hosted version
    },
    utterancesConfig: {
      repo: 'pickyzz/pickyzz-blog-comment'
    },
    GiscusConfig: { // อันนี้ไม่มีบั๊กเรื่อง theme
      repo: 'pickyzz/pickyzz-blog-comment',
      repoID: 'R_kgDOGJv8GA',
      category: 'General', // Announcements, General, Ideas, Q&A, Show and tell
      categoryID: 'DIC_kwDOGJv8GM4CAgb8'
    }
  },
  googleAdsenseId: '', 
  DaoVoiceId: '', // DaoVoice http://dashboard.daovoice.io/get-started
  TidioId: '', // https://www.tidio.com/
  isProd: process.env.VERCEL_ENV === 'production', // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)

}
// export default BLOG
module.exports = BLOG
