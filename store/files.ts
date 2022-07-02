import { reactive, readonly, } from "vue"
import { FileMeta } from '~~/types/types'
import { Errors } from "~~/types/enums"

// externals
const initialState = {
  fileMeta: [] as FileMeta[],
}

const state = reactive({
  ...initialState
})

const deleteFileMeta = async (id: string) => {
  try {
    const { data } = await useAsyncData('deleteFileMeta', async () => GqlDeleteFileMeta({ id: id }))
    if (data.value.deleteFileMeta) {
      state.fileMeta = state.fileMeta.filter(fileMeta => {
        return fileMeta.id !== id
      })
    }
    return data.value
  } catch (error) {
    console.log(`${Errors.GQL_ERROR_DELETE_FILE_META}: ${id} | ${error}`)
  }
}

const fetchSingleFileMeta = async (id : string) => {
  try {
    const { data } = await useAsyncData('fetchSingleFileMeta', async () => GqlFetchSingleFileMeta({ id: id }))
    const fileMeta = data.value.getSingleFileMeta as FileMeta
    if (fileMeta) {
      state.fileMeta.push(fileMeta)
    } else {
      throw new Error
    }
    return fileMeta
  } catch (error) {
    console.log(`${Errors.GQL_ERROR_GET_SINGLE_FILE_META}: ${id} | ${error}`)
  }
}

const fetchAllFileMeta = async () => {
  try {
    const { data } = await useAsyncData('fetchAllFileMeta', async () => GqlFetchAllFileMeta())
    const fileMetaArray = data.value.getAllFileMeta as FileMeta[]
    if (fileMetaArray?.length) {
      state.fileMeta = fileMetaArray
    } else {
      throw new Error
    }
  } catch (error) {
    console.log(`${Errors.GQL_ERROR_GET_ALL_FILE_META} | ${error}`)
  }
}

const getFiles = () => state.fileMeta

const setFiles = async (form : FormData) => {
  try {
    const options = {
      method: 'POST',
      body: form
    }
    const { data } = await useAsyncData('setFiles', () => $fetch('/setfiles', options)) as any
    const createdFileMetaArray = data.value.fileMetaArray
    if (createdFileMetaArray.length) {
      await logFileMeta(createdFileMetaArray)
    } else {
      throw new Error
    }
  } catch (error) {
    console.log(`${Errors.FE_ERROR_SET_FILES} | ${error}`)
  }
}

export const fileStore = readonly({
  state: state,
  do: {
    deleteFileMeta,
    setFiles
  },
  get: {
    getFiles,
    fetchAllFileMeta,
    fetchSingleFileMeta
  },
})

const logFileMeta = async (createdFileMetaArray : FileMeta[]) => {
  createdFileMetaArray.forEach(async (createdFileMeta : FileMeta) => {
    const loggedFileMeta = await setFileMeta(createdFileMeta) as FileMeta
    state.fileMeta.push(loggedFileMeta)
  })
}

const setFileMeta = async (fileMeta : FileMeta) => {
  try {
    const { data } = await useAsyncData('setFileMeta', async () => GqlCreateFileMeta({ input: fileMeta }))
    const createdFileMeta = data.value.createFileMeta as FileMeta
    if (createdFileMeta) {
      return createdFileMeta
    } else {
      throw new Error
    }
  } catch (error) {
    console.log(`${Errors.GQL_ERROR_SET_FILE_META}: ${fileMeta.title} | ${error}`)
  }
}