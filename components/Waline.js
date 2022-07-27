import Waline from '@montagejs/react-waline-client'
import { useRef } from 'react'
import { loadUserThemeFromCookies } from '@/lib/theme'

function darkmode(theme) {
    theme = loadUserThemeFromCookies()
    if (theme === 'dark') { return true } else { return false }
}

export default function WalineComment() {
    const ref = useRef()
    const cpr = false
    const meta = ['nick', 'mail']
    const requireData = ['nick', 'mail']
    const dum = darkmode()
    const image = false
    const ua = false

    return <Waline ref={ref}
        serverURL="https://comment.pickyzz.dev"
        lang="en-us"
        meta={meta}
        dark={dum}
        imageUploader = {image}
        requiredMeta = {requireData}
        ua={ua}
        copyright={cpr} />
}