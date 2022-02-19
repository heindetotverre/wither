import { useRoute } from 'vue-router'
import { Sort } from '~~/types/enums'

const changeArrayPos = (arr: any[], el: any, direction: number) => {
  let elIndex = arr.indexOf(el)
  const newArr = arr,
    elToChangePosition = newArr[elIndex],
    oldElIndex = elIndex

  if (direction === Sort.Up) {
    elIndex = elIndex > 0 ? elIndex - 1 : 0
  } else if (direction === Sort.Down) {
    elIndex = elIndex > newArr.length - 1 ? arr.length - 1 : elIndex + 1
  }

  const replaceEl = newArr[elIndex]
  newArr[elIndex] = elToChangePosition
  newArr[oldElIndex] = replaceEl
  return newArr
}

const createId = (idPrefix: string) => {
  return `${idPrefix ? idPrefix : ''}_${Math.random().toString(16).slice(2)}`
}

const createUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

const findPageBySlug = (pages: Array<any>, slug: String): Array<any> => {
  if (pages.length) {
    return pages.reduce((acc, curr) => curr.slug.replace('/', '') === slug
      ? acc.concat(curr)
      : curr.children.length > 0
        ? acc.concat(findPageBySlug(curr.children, slug))
        : acc
      , [])
  } else {
    return []
  }
}

const flattenObject = (arr: Array<any>) => {
  if (arr.length) {
    const flattenedArray = [] as Array<any>
    const reduceObject = (arr: Array<any>) => {
      arr.reduce((acc, curr) => {
        flattenedArray.push(curr)
        if (curr.children?.length > 0) {
          return reduceObject(curr.children)
        }
      }, [])
    }
    reduceObject(arr)
    return flattenedArray
  } else {
    return []
  }
}

const getUrlPathFromDynamicRoute = () => {
  const urlPath = useRoute().params.slug as Array<string>

  const index = urlPath.length
    ? urlPath.indexOf('')
    : -1

  if (index > 0) {
    urlPath.splice(index)
  }

  return {
    last: [...urlPath].pop(),
    first: urlPath[0],
    full: urlPath
  }
}

const getUrlPathFromRoute = () => {
  const route = useRoute().name as String
  const urlPath = route.split('/')

  const index = urlPath.length
    ? urlPath.indexOf('')
    : -1

  if (index > 0) {
    urlPath.splice(index)
  }

  return {
    last: [...urlPath].pop(),
    first: urlPath[0],
    full: urlPath
  }
}

export {
  changeArrayPos,
  createId,
  createUUID,
  findPageBySlug,
  flattenObject,
  getUrlPathFromDynamicRoute,
  getUrlPathFromRoute
}