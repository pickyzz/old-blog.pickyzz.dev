import React, { useEffect, useState } from 'react'

const Progress = ({ targetRef, showPercent = true }) => {
  const [percent, changePercent] = useState(0)
  const scrollListener = () => {
    if (targetRef?.current) {
      const clientHeight = targetRef ? targetRef.current.clientHeight : 0
      const scrollY = window.pageYOffset
      const fullHeight = clientHeight - window.outerHeight
      let per = parseFloat(((scrollY / fullHeight) * 100).toFixed(0))
      if (per > 100) per = 100
      if (per < 0) per = 0
      changePercent(per)
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollListener)
    return () => document.removeEventListener('scroll', scrollListener)
  }, [percent])

  return (
    <div className="h-4 w-full shadow-2xl bg-gray-400 dark:bg-gray-600">
      <div
        className="h-4 bg-[#514dc5] duration-200"
        style={{ width: `${percent}%` }}
      >
        {showPercent && (
          <div className="text-right text-white text-xs">{percent}%</div>
        )}
      </div>
    </div>
  )
}

export default Progress
