import * as fs from 'fs'
import { resolve } from 'path'

const env = process.env.NODE_ENV

const rootDir = resolve('.');

const imageFolder = `${rootDir}/public/images`

console.log(imageFolder)

export default async () => {
  const files = fs.readdirSync(imageFolder, {withFileTypes: true})
    .filter(item => !item.isDirectory())
    .map(item => item.name)

  return files
}