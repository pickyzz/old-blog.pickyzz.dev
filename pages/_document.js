// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from 'next/document'
import BLOG from '@/blog.config'
import ThirdPartyScript from '@/components/ThirdPartyScript'
import { loadUserThemeFromCookies } from '@/lib/theme'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html lang={BLOG.lang} className={loadUserThemeFromCookies() ?? BLOG.appearance} >
        <Head>
          <link rel='icon' href='/favicon.svg' />
          <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Maitree&display=swap' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped&display=swap' />
          <ThirdPartyScript />
        </Head>

        <body className={`${BLOG.font} bg-day dark:bg-night`}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
