export async function getAllTags({ allPosts, sliceCount = 16, tagOptions }) {
  if (!allPosts) {
    return []
  }

  let tags = allPosts.map(p => p.tags)
  tags = [...tags.flat()]

  // Tag count
  const tagObj = {}
  tags.forEach(tag => {
    if (tag in tagObj) {
      tagObj[tag]++
    } else {
      tagObj[tag] = 1
    }
  })

  // Sort by number of tags
  const list = Object.keys(tagObj).map(tag => {
    const color =
      tagOptions.find(option => option.value === tag)?.color || 'gray'
    return { name: tag, count: tagObj[tag], color }
  })
  list.sort((a, b) => b.count - a.count)
  if (sliceCount && sliceCount > 0) {
    return list.slice(0, sliceCount)
  } else {
    return list
  }
}
