import { Errors } from '~~/types/enums';

const useAnimationUtils = () => {
  const getConstants = () => {
    return {
      FALLBACK: '100%;'
    }
  }
  
  const getStyleToAnimate = (elToAnimate : HTMLElement, targetStyle : string) => {
    let styleInt : number = 0;
    let topPos : number = 0;
    let bottomPos : number = 0;
    const elArr = [...elToAnimate.children] as []
    if (targetStyle === 'height') {
      elArr.forEach((childEl : HTMLElement, index) => {
        const elBounds = childEl.getBoundingClientRect()
        if (index === 0) {
          topPos = elBounds.top
        }
        if (index === elArr.length - 1) {
          bottomPos = elBounds.bottom
        }
      })
      styleInt = bottomPos - topPos
    }
    if (targetStyle === 'width') {
      const accStyles : number[] = []
      elArr.forEach((childEl : HTMLElement) => {
        accStyles.push(childEl.clientWidth)
        const widest = Math.max(...accStyles)
        styleInt = widest
      })
    }
    if (!styleInt) {
      console.log(`${Errors.FE_ERROR_ANIMATION_STYLE} ${targetStyle}`)
      return getConstants().FALLBACK;
    }
    return styleInt
  }

  return {
    getConstants,
    getStyleToAnimate
  }
}

export default useAnimationUtils