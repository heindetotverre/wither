export const flattenArray = (arr: any[]) => {
  if (arr.length) {
    const flattenedArray = [] as any[]
    const reduceArray = (arr: any[]) => {
      arr.reduce((acc, curr) => {
        flattenedArray.push(curr)
        if (curr.children?.length > 0) {
          return reduceArray(curr.children)
        }
      }, [])
    }
    reduceArray(arr)
    return flattenedArray
  } else {
    return []
  }
}