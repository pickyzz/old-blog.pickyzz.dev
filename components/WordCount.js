import { faClock, faFileWord } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'

/**
 * 字数统计
 * @returns
 */
export default function WordCount () {
  useEffect(() => {
    countWords()
  })

  return <div id='wordCountWrapper' className='hidden'>
   <FontAwesomeIcon icon={faFileWord} className='mr-1'/> Words ≈ <strong id='wordCount'>0</strong> &nbsp;|&nbsp; <FontAwesomeIcon className='mr-1' icon={faClock}/> Read time ≈ <strong id='readTime'>0</strong> Min
    </div>
}

/**
 * 更新字数统计和阅读时间
 */
function countWords () {
  if (window) {
    const articleElement = document.getElementById('notion-article')
    if (articleElement) {
      const articleText = deleteHtmlTag(articleElement.innerHTML)
      const wordCount = fnGetCpmisWords(articleText)
      // 阅读速度 300-500每分钟
      document.getElementById('wordCount').innerHTML = wordCount
      document.getElementById('readTime').innerHTML = Math.floor(wordCount / 500) + 1
      const wordCountWrapper = document.getElementById('wordCountWrapper')
      wordCountWrapper.classList.remove('hidden')
    }
  }
}

// 去除html标签
function deleteHtmlTag (str) {
  str = str.replace(/<[^>]+>|&[^>]+;/g, '').trim()// 去掉所有的html标签和&nbsp;之类的特殊符合
  return str
}

// 用word方式计算正文字数
function fnGetCpmisWords (str) {
  let sLen = 0
  try {
    // eslint-disable-next-line no-irregular-whitespace
    str = str.replace(/(\r\n+|\s+|　+)/g, '龘')
    // eslint-disable-next-line no-control-regex
    str = str.replace(/[\x00-\xff]/g, 'm')
    str = str.replace(/m+/g, '*')
    str = str.replace(/龘+/g, '')
    sLen = str.length
  } catch (e) {

  }
  return sLen
}
