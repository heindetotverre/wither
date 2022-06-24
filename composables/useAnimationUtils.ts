import { sanitizeStylingValue } from "~~/utils"

const useAnimationUtils = () => {
  
  const getStyleOffset = (parentComponent : HTMLElement, targetStyle : String) => {
    const parentComponentStyles = getComputedStyle(parentComponent)
    if (targetStyle === 'height') {
      const paddings = sanitizeStylingValue(parentComponentStyles.paddingBottom)
      const borders = sanitizeStylingValue(parentComponentStyles.borderTopWidth) + sanitizeStylingValue(parentComponentStyles.borderBottomWidth)
      return paddings + borders
    }
    return 0;
  }

  const getStyleToAnimate = (elToAnimate : HTMLElement, targetStyle : string) => {
    let styleInt : number = 0;
    const elArr = [...elToAnimate.children] as []
    if (targetStyle === 'height') {
      
      elArr.forEach((childEl : HTMLElement) => {
        styleInt = styleInt + childEl.clientHeight
      })
    }
    if (targetStyle === 'width') {
      elArr.forEach((childEl : HTMLElement) => {
        const accStyles = []
        accStyles.push(childEl.clientWidth)
        const widest = Math.max(...accStyles)
        styleInt = widest
      })
    }
    return styleInt
  }



  return {
    getStyleOffset,
    getStyleToAnimate
  }
}

export default useAnimationUtils