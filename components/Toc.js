import React from 'react'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import Progress from './Progress'
// import { cs } from 'react-notion-x'

const Toc = ({ toc, targetRef }) => {
  // If there is no directory, return empty directly
  if (!toc || toc.length < 1) return <></>

  // Listen for scroll events
  React.useEffect(() => {
    window.addEventListener('scroll', actionSectionScrollSpy)
    actionSectionScrollSpy()
    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy)
    }
  }, [])

  // Synchronize selected directory events
  const [activeSection, setActiveSection] = React.useState(null)
  const throttleMs = 100
  const actionSectionScrollSpy = React.useCallback(
    throttle(() => {
      const sections = document.getElementsByClassName('notion-h')
      let prevBBox = null
      let currentSectionId = activeSection
      for (let i = 0; i < sections.length; ++i) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue
        if (!currentSectionId) {
          currentSectionId = section.getAttribute('data-id')
        }
        const bbox = section.getBoundingClientRect()
        const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
        const offset = Math.max(150, prevHeight / 4)
        // GetBoundingClientRect returns values relative to viewport
        if (bbox.top - offset < 0) {
          currentSectionId = section.getAttribute('data-id')
          prevBBox = bbox
          continue
        }
        // No need to continue loop, if last element has been detected
        break
      }
      setActiveSection(currentSectionId)
    }, throttleMs)
  )

  return (
    <>
      <div className="w-full">
        <Progress targetRef={targetRef} />
      </div>
      <nav className=" dark:text-gray-400 text-gray-600 bg-white dark:bg-gray-800 overflow-y-auto scroll-hidden p-6">
        {toc.map(tocItem => {
          const id = uuidToId(tocItem.id)
          return (
            <a
              key={id}
              href={`#${id}`}
              className={`notion-table-of-contents-item duration-300 transform font-light
            notion-table-of-contents-item-indent-level-${tocItem.indentLevel} dark:text-white `}
            >
              <span
                style={{
                  display: 'inline-block',
                  marginLeft: tocItem.indentLevel * 16
                }}
                className={`${
                  activeSection === id &&
                  ' font-bold text-red-400 dark:text-blue-300 underline'
                }`}
              >
                {tocItem.text}
              </span>
            </a>
          )
        })}
      </nav>
    </>
  )
}

export default Toc
