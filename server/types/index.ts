interface ImageData {
  fileName : string,
  id : string,
  uploadDate: number,
  img?: {
    contentType: string,
    data: Buffer
  }
}

export {
  ImageData
}