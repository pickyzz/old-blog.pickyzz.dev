import CookieConsent from 'react-cookie-consent'
import cookie from 'react-cookies'

const allCookies = cookie.loadAll()

console.log(allCookies)

export default function CookieAcception () {
  return (
        <CookieConsent
            location='bottom'
            flipButtons
            buttonText='I understand'
            cookieName='cookieConsent'
            style={{ background: '#2B373B' }}
            buttonStyle={{ color: '#4e503b', fontSize: '16px' }}
            enableDeclineButton
            declineButtonText='Decline'
            onDecline={() => {
              cookie.remove('theme')
              cookie.remove('cookieConsent')
            }}
        >

            We use cookies to enhance your experience. {' '}

            <span style={{ fontSize: '10px' }}>
                <a target='_blank' rel='noreferrer' href='https://www.onetrust.com/blog/the-ultimate-guide-to-thai-pdpa-compliance/'>
                    More info
                </a>
            </span>

        </CookieConsent>
  )
}
