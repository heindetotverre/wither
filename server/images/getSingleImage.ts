import * as fs from 'fs'
import getFolderPath from '~~/server/utils/getFolderPath'
import { main } from '~~/constants/main.constants'
import { sendStream } from 'h3'

export default defineEventHandler(async (event) => {
  const root = getFolderPath(main.imageFolder)
  console.log('get image from folder: ', root)
  
  const files = fs.readdirSync(root, {withFileTypes: true})
    .filter(item => !item.isDirectory())
    .map(item => item.name)

  const filePathToServe = files.find(file => event.req?.url?.includes(file))
  if (filePathToServe) {
    return sendStream(event, fs.createReadStream(`${root}/${filePathToServe}`))
  }
}) 