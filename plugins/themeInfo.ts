import { main } from "~~/constants/main.constants"

export default defineNuxtPlugin(() => {
  return {
    provide: {
      themeInfo: {
        imageFolder: main.imageFolder
      }
    }
  }
})