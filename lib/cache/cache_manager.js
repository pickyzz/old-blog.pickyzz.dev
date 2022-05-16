import {
  getCacheFromMemory as getCache,
  setCacheToMemory as setCache,
  delCacheFromMemory as delCache
} from '@/lib/cache/memory_cache'
// import { getCacheFromFile, setCacheToFile } from './local_file_cache'
const enableCache = true // Disabled in production environment

export async function getDataFromCache(key) {
  if (!enableCache) {
    return null
  }
  const dataFromCache = await getCache(key)
  if (JSON.stringify(dataFromCache) === '[]') {
    return null
  }
  return dataFromCache
}

export async function setDataToCache(key, data) {
  if (!enableCache || !data) {
    return
  }
  await setCache(key, data)
}

export async function delCacheData(key) {
  if (!enableCache) {
    return
  }
  await delCache(key)
}
