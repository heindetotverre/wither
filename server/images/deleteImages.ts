import * as fs from 'fs'
import { IncomingMessage } from 'http'
import Image from '~~/server/utils/getImageModel'
import getFolderPath from '~~/server/utils/getFolderPath'
import { main } from '~~/constants/main.constants'

export default defineEventHandler(async (event) => {
  try {
    const fileId = event.req.url?.split('/').pop() as string
    await removeImageData(fileId)
    await unstoreFile(fileId)
    return {
      data: {
        deletedFile: fileId
      }
    }
  } catch (error) {
    return {
      error: error
    }
  }
})

const removeImageData = async (fileid : string) => {
  return await new Promise((resolve, reject) => {
    try {
      const root = getFolderPath(main.imageFolder)
      fs.unlink(`${root}/${fileid}`, (err) => {
        if (err) {
          throw err
        } else {
          resolve(true)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

const unstoreFile = async (fileId : string) => {
  const deletedImage = await Image.findOneAndDelete({ id: fileId })
  if (deletedImage) {
    return deletedImage.id
  }
}

