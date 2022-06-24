import { Errors } from "~~/types/enums"
import content from "../assets/resources/definedContent"

export default defineNuxtPlugin(() => {
  const defaultContent = content.en.wither

  const getContent = (contentPath : string) => {
    const splitPath = contentPath.split('.')
    const foundContentPart = findNestedContent(splitPath, defaultContent)
    if (!foundContentPart) {
      console.log(`${Errors.FE_ERROR_CONTENT_NOTFOUND} ${splitPath}`)
      return 'contentFallback'
    }
    return foundContentPart
  }

  const findNestedContent = (splitPath : string[], content : Record<string, any>) => {
    let foundContent : string = ''
    const searchPerPath = (splitPath : string[], content : Record<string, any>) => {
      splitPath.forEach((path) => {
        if (content[path]) {
          if (typeof content[path] === 'string') {
            foundContent = content[path]
          }
          searchPerPath(splitPath, content[path])
        }
      })
    }
    searchPerPath(splitPath, content)
    return foundContent
  }

  return {
    provide: {
      content: (contentPath : string) => getContent(contentPath)
    }
  }
})