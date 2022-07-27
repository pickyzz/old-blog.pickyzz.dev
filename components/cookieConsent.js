import CookieConsent from 'react-cookie-consent'
import cookie from 'react-cookies'

export default function CookieAcception() {
  return (
    <CookieConsent
      location="bottom"
      flipButtons
      buttonText="ยินยอม (Agree)"
      cookieName="cookieConsent"
      style={{ background: '#2B373B' }}
      buttonStyle={{ color: '#4e503b', fontSize: '16px' }}
      enableDeclineButton
      declineButtonText="ไม่ยินยอม (Decline)"
      onDecline={() => {
        cookie.remove('theme')
        cookie.remove('cookieConsent')
      }}
    >
      เว็บไซต์นี้มีการใช้ Cookies
      ในการเก็บการตั้งค่าธีมและเพิ่มประสิทธิภาพในการใช้งานเว็บไซต์
      ทั้งนี้ขึ้นอยู่กับความยินยอมของผู้ใช้งานตามหลัก PDPA{' '}
      <span style={{ fontSize: '10px' }}>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://t-reg.co/blog/t-reg-knowledge/what-is-pdpa/"
        >
          เพิ่มเติม
        </a>
      </span>
    </CookieConsent>
  )
}
