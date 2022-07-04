import { reactive, readonly, } from "vue"
import { ImageMeta } from '~~/types/types'
import { Errors } from "~~/types/enums"

// externals
const initialState = {
  imageMeta: [] as ImageMeta[],
}

const state = reactive({
  ...initialState
})

const deleteImage = async (imageId : string) => {
  try {
    const { data } = await useAsyncData('setImages', () => $fetch(`/deleteimages/${imageId}`)) as any
    const deletedImage = data.value
    if (deletedImage) {
      state.imageMeta = state.imageMeta.filter(image => image.id !== imageId)
      return imageId
    } else {
      throw new Error
    }
  } catch (error) {
    console.log(`${Errors.FE_ERROR_DELETE_IMAGES} | ${error}`)
  }
}

const fetchSingleImageMeta = async (id : string) => {
  try {
    const { data } = await useAsyncData('fetchSingleImageMeta', async () => GqlFetchSingleImageMeta({ id: id }))
    const ImageMeta = data.value.getSingleImageMeta as ImageMeta
    if (ImageMeta) {
      state.imageMeta.push(ImageMeta)
    } else {
      throw new Error
    }
    return ImageMeta
  } catch (error) {
    console.log(`${Errors.GQL_ERROR_GET_SINGLE_IMAGE_META}: ${id} | ${error}`)
  }
}

const fetchAllImageMeta = async () => {
  try {
    const { data } = await useAsyncData('fetchAllImageMeta', async () => GqlFetchAllImageMeta())
    const ImageMetaArray = data.value.getAllImageMeta as ImageMeta[]
    if (ImageMetaArray?.length) {
      state.imageMeta = ImageMetaArray
    } else {
      throw new Error
    }
  } catch (error) {
    console.log(`${Errors.GQL_ERROR_GET_ALL_IMAGE_META} | ${error}`)
  }
}

const getImages = () => state.imageMeta

const setImages = async (form : FormData) => {
  try {
    const options = {
      method: 'POST',
      body: form
    }
    const { data } = await useAsyncData('setImages', () => $fetch('/setimages', options)) as any
    const createdImageMetaArray = data.value
    if (createdImageMetaArray?.length) {
      state.imageMeta = state.imageMeta.concat(createdImageMetaArray)
    } else {
      throw new Error
    }
  } catch (error) {
    console.log(`${Errors.FE_ERROR_SET_IMAGES} | ${error}`)
  }
}

export const imageStore = readonly({
  state: state,
  do: {
    deleteImage,
    setImages
  },
  get: {
    getImages,
    fetchAllImageMeta,
    fetchSingleImageMeta
  }
})