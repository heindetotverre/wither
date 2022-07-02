import { IncomingMessage, ServerResponse } from 'http'
import { join } from 'path'
import formidable from 'formidable'
import * as fs from 'fs'
import { getFolderPath } from '../utils'
import { FileMeta, ParsedFile } from '~~/types/types'
import { Errors } from '~~/types/enums'

export default async (req: IncomingMessage, res: ServerResponse) => {
  const options = {
    multiples: true,
    uploadDir: getFolderPath('public/images'),
  }
  const form = new formidable.IncomingForm(options)
  console.log(options)
  const handleFilesResult : any = await new Promise((resolve) => {
    form.parse(req, async (err : any, fields : any, files : any) => {
      if (err) {
        throw new Error(err)
      }
      const fileMetaArr : FileMeta[] = []
      Object.entries(files).forEach(async ([, fileContent]) => {
        try {
          const file = fileContent as ParsedFile
          const checkedFile = isFileValid(file)
          const fileName = `${file.newFilename}.${checkedFile.fileType}`
          const fileMeta : FileMeta = createFileMeta(
            file,
            checkedFile.fileType as string,
            fileName as string
          )
          if (fileMeta) {
            fs.renameSync(file.filepath, join(options.uploadDir, fileName));
            fileMetaArr.push(fileMeta)
          } else {
            fs.unlink(`${options.uploadDir}/${file.newFilename}`, (err) => {
              if (err) throw err;
          });
          }
        } catch (error) {
          resolve(error)
        }        
      })
      resolve(fileMetaArr)
    });
  })
  console.log(handleFilesResult)
  if (handleFilesResult instanceof Error) {
    return {
      error: handleFilesResult
    }
  }
  return {
    fileMetaArray: handleFilesResult
  }
}

const isFileValid = (file : ParsedFile) => {
  const type = file.mimetype.split("/").pop() as string
  const validTypes = ['.jpg', '.jpeg', '.png', '.pdf']
  if (validTypes.includes(type)) {
    throw new Error(Errors.BE_ERROR_FILE_BOUNCE_UNSUPPORTED)
  }
  if (file.size > 5000000) {
    throw new Error(Errors.BE_ERROR_FILE_BOUNCE_TOO_LARGE)
  }
  return {
    fileType: type,
    valid: true
  }
}

const createFileMeta = (file : ParsedFile, fileType : string, fileName : string) => {
  return {
    id: file.newFilename,
    fileName: fileName,
    fileType: fileType,
    title: file.originalFilename,
    uploadDate: Date.now()
  }
}