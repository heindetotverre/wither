const findPageBySlug = (pages, slug) => {
  return pages.reduce((acc, curr) => curr.slug.replace('/', '') === slug
    ? acc.concat(curr)
    : curr.children.length > 0
      ? acc.concat(findPageBySlug(curr.children, slug))
      : acc
  , [])
}

const flattenObject = (pages) => {
  const flattenedArray = []
  const reduceObject = (pages) => {
    pages.reduce((acc, curr) => {
      flattenedArray.push(curr)
      if (curr.children.length > 0) {
        return reduceObject(curr.children)
      }
    }, [])
  }
  reduceObject(pages)
  return flattenedArray
}

export {
  findPageBySlug,
  flattenObject
}