import { DynamicForm } from '~~/types/types'

export const sanitzeComponentContent = (content: DynamicForm) => {
  delete content.__typename
  delete content.formInfo.__typename
  content.fields.forEach(f => {
    delete f.__typename
    delete f.validation.__typename
  })
  return content
}