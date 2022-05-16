export async function getAllCategories(allPosts) {
  if (!allPosts) {
    return []
  }

  let categories = allPosts.map(p => p.category)
  categories = [...categories.flat()]
  const categoryObj = {}
  categories.forEach(category => {
    if (category in categoryObj) {
      categoryObj[category]++
    } else {
      categoryObj[category] = 1
    }
  })
  return categoryObj
}
