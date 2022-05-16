import BLOG from '@/blog.config'
import { idToUuid } from 'notion-utils'
import { getDataFromCache, setDataToCache } from '@/lib/cache/cache_manager'
import { getPostBlocks } from '@/lib/notion/getPostBlocks'

export async function getNotionPageData({ pageId = BLOG.notionPageId, from }) {
  // try to get from cache
  const cacheKey = 'page_record_map_' + pageId
  const data = await getDataFromCache(cacheKey)
  if (data) {
    console.log('[get]:', `from:${from}`, `id:${pageId}`)
    return data
  }
  const pageRecordMap = await getPageRecordMapByNotionAPI({ pageId, from })
  // store in cache
  if (pageRecordMap) {
    await setDataToCache(cacheKey, pageRecordMap)
  }
  return pageRecordMap
}

function getTagOptions(schema) {
  const tagSchema = Object.values(schema).find(e => e.name === 'tags')
  return tagSchema?.options || {}
}

async function getPageRecordMapByNotionAPI({ pageId, from }) {
  const pageRecordMap = await getPostBlocks(pageId, from)
  if (!pageRecordMap) {
    return []
  }

  pageId = idToUuid(pageId)
  const collection = Object.values(pageRecordMap.collection)[0]?.value
  const collectionQuery = pageRecordMap.collection_query
  const block = pageRecordMap.block
  const schema = collection?.schema
  const rawMetadata = block[pageId].value
  const tagOptions = getTagOptions(schema)

  // Check Type Page-Database和Inline-Database
  if (
    rawMetadata?.type !== 'collection_view_page' &&
    rawMetadata?.type !== 'collection_view'
  ) {
    console.warn(`pageId "${pageId}" is not a database`)
    return null
  }

  return {
    collection,
    collectionQuery,
    block,
    schema,
    tagOptions,
    rawMetadata
  }
}
