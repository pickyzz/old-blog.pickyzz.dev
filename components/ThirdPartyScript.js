import BLOG from '@/blog.config'

/**
 * 第三方代码 统计脚本
 * @returns {JSX.Element}
 * @constructor
 */
const ThirdPartyScript = () => {
  return (<>

    {/* GoogleAdsense 广告植入 */}
    {BLOG.googleAdsenseId && (<script data-ad-client={BLOG.googleAdsenseId} async
              src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'/>
    )}

    {/* while prod only */}
    {BLOG.isProd && (<>

        {/* ackee analytic */}
        {BLOG.analytics.provider === 'ackee' && (
          <script async src={BLOG.analytics.ackeeConfig.tracker}
                  data-ackee-server={BLOG.analytics.ackeeConfig.dataAckeeServer}
                  data-ackee-domain-id={BLOG.analytics.ackeeConfig.domainId}
          />
        )}

        {/* google analytic */}
        {BLOG.analytics.provider === 'ga' && (<>
            <script async
                    src={`https://www.googletagmanager.com/gtag/js?id=${BLOG.analytics.gaConfig.measurementId}`}
            />
            <script async
                    dangerouslySetInnerHTML={{
                      __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${BLOG.analytics.gaConfig.measurementId}', {
                          page_path: window.location.pathname,
                        });
                      `
                    }}
            />
          </>)}
      </>)}
  </>)
}

export default ThirdPartyScript
