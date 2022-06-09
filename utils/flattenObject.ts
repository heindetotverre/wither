export const flattenObject = (arr: Array<any>) => {
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