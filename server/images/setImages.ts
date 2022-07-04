import formidable from 'formidable'
import * as fs from 'fs'
import { IncomingMessage } from 'http'
import Image from '~~/server/utils/getImageModel'
import getFolderPath from '~~/server/utils/getFolderPath'
import { main } from '~~/constants/main.constants'
import { ImageData } from '../types'

export default defineEventHandler(async (event) => { 
  try {
    const fileStoreData = await getImageData(event.req) as ImageData[]
    await storeFiles(fileStoreData)
    const response = fileStoreData.map(file => {
      return {
        fileName: file.fileName,
        id: file.id,
        uploadDate: file.uploadDate
      }
    })
    return response
  } catch (err) {
    return {
      error: err
    }
  }
})

const getImageData = async (req : IncomingMessage) => {
  return await new Promise((resolve, reject) => {
    try {
      const options = {
        keepExtensions: true,
        maxFileSize: 4 * 1024 * 1024,
        multiples: true,
        uploadDir: getFolderPath(main.imageFolder)
      }
      const form = new formidable.IncomingForm(options)
      const filePaths : ImageData[] = []
      form.parse(req, (err : any, fields : any, files : any[]) => {
        Object.entries(files).forEach(async ([, fileContent]) => {
          filePaths.push({
            fileName: fileContent.originalFilename,
            id: fileContent.newFilename,
            uploadDate: Date.now(),
            img: {
              data: fs.readFileSync(fileContent.filepath),
              contentType: fileContent.mimetype
            }
          })
        })
        resolve(filePaths)
      })
    } catch (error) {
      reject(error)
    }
  })
}

const storeFiles = async (fileData : ImageData[]) => {
  fileData.forEach((file) => {
    const newImage = new Image({
      ...file
    })
    newImage.save()
  })
}

