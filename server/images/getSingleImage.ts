import { Errors } from '~~/types/enums'
import Image from '~~/server/utils/getImageModel'

export default defineEventHandler(async (event) => {
  try {
    const fileId = event.req.url?.replace('/', '') as string
    const image = await getImage(fileId)
    if (image) {
      return image.img.data
    } else {
      console.log(`${Errors.GQL_ERROR_GET_SINGLE_IMAGE_META} ${image.id}`)
    }
  } catch (error) {
    console.log(`${Errors.GQL_ERROR_GET_SINGLE_IMAGE_META} ${error}`)
  }
})

const getImage = async (fileId : string) => {
  const image = await Image.findOne({ id: fileId })
  if (image) {
    return image
  } else {
    throw new Error
  }
}