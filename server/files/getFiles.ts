import * as fs from 'fs'
import { getFolderPath } from '../utils'

export default async () => {
  const files = fs.readdirSync(getFolderPath('public/images'), {withFileTypes: true})
    .filter(item => !item.isDirectory())
    .map(item => item.name)

  return files
}