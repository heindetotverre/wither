import { Sort } from '~~/types/enums'

export const changeArrayPos = (arr: any[], el: any, direction: number) => {
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