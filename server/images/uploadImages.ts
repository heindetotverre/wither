import { IncomingMessage, ServerResponse } from 'http'
import { join } from 'path'
import formidable from 'formidable'
import * as fs from 'fs'
import { getFolderPath } from '../utils'

export default async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const options = {
      multiples: true,
      maxFileSize:  50 * 1024 * 1024, // 5MB
      uploadDir: getFolderPath('public/images'),
    }
    const form = new formidable.IncomingForm(options)
    const handleFilesResult = await new Promise((resolve) => {
      form.parse(req, async (err : any, fields : any, files : any) => {
        if (err) {
          throw new Error(err)
        } 
        Object.entries(files).forEach(([fileKey, fileContent]) => {
          const file = fileContent as {path: string, newFilename : string}
          const isValid = formidable.isFileValid(file)
          if (!isValid) {
            throw new Error('invalid file')
          }
          try {
            fs.renameSync(file.path, join(options.uploadDir, file.newFilename));
          } catch (error) {
            console.log('error saving file on disk')
            throw new Error()
          }        
        })
        resolve(files)
      });
    })
    return JSON.stringify({
      status: "Succes",
      message: 'Handled files, returning path',
      error: false,
      data: {
        filePath: handleFilesResult
      }
    })
  } catch (error) {
    return JSON.stringify({
      status: "Error",
      message: 'Random ERROR OCCURRED',
      error: error
    })
  }
}