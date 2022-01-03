import { useRoute } from 'vue-router'

const createId = (formName : string) => {
  return `${formName}_${Math.random().toString(16).slice(2)}`
}

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

const getUrlPath = () => {
  const urlPath = useRoute().params.slug as Array<string>

  const index = urlPath.length
    ? urlPath.indexOf('')
    : -1

  if (index > 0) {
    urlPath.splice(index)
  }

  return {
    last: [...urlPath].pop(),
    full: urlPath
  }
}

export {
  createId,
  findPageBySlug,
  flattenObject,
  getUrlPath
}