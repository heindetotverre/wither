import { fileURLToPath } from 'url';
import * as fs from 'fs'
import path from 'path'

const env = process.env.NODE_ENV

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imageFolder = path.join(__dirname, env === 'development' ? '../../public/images' : '../../images');

export default async () => {
  const files = fs.readdirSync(imageFolder, {withFileTypes: true})
    .filter(item => !item.isDirectory())
    .map(item => item.name)

  return files
}