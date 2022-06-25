import { Errors } from "~~/types/enums"
import content from "../assets/resources/definedContent"
import { findNestedKeyInObject } from "~~/utils"

export default defineNuxtPlugin(() => {
  const defaultContent = content.en.wither

  const getContent = (contentPath : string) => {
    const splitPath = contentPath.split('.')
    const foundContentPart = findNestedKeyInObject(splitPath, defaultContent)
    if (!foundContentPart) {
      console.log(`${Errors.FE_ERROR_CONTENT_NOTFOUND} ${splitPath}`)
      return 'contentFallback'
    }
    return foundContentPart
  }

  return {
    provide: {
      content: (contentPath : string) => getContent(contentPath)
    }
  }
})