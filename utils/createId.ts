export const createId = (idPrefix: string) => {
  return `${idPrefix ? idPrefix : ''}_${Math.random().toString(16).slice(2)}`
}