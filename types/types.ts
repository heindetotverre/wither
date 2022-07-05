import { Component } from "nuxt/dist/app/compat/capi"

interface ContentField {
  default?: string,
  label?: string,
  name: string,
  type: string,
  children?: ContentField[]
}

interface DynamicForm {
  pageInfo: {
    id: string,
    name: string,
    slug: string,
    __typename?: string
  },
  fields: FormField[],
  __typename?: string
}

interface ImageMeta {
  fileName: string,
  id: string,
  uploadDate: number
}

interface Form {
  pageInfo: {
    name: keyof Forms,
    multipart: boolean,
    parts: string[]
  },
  fields: FormField[]
}

interface FormEvent {
  name: keyof Forms,
  key: string,
  property: keyof FormField
  value?: any
}

interface FormField {
  autocomplete?: string,
  component: string,
  disabled?: boolean,
  domclass?: string,
  elementName: string,
  formPart?: string,
  id: string,
  key: string,
  label: string,
  options?: string[],
  type: string,
  required?: boolean,
  validation: {
    validator: keyof Validators,
    validated: boolean,
    validationMessage: string,
    __typename?: string
  },
  value: any,
  visible?: boolean,
  __typename?: string
}
interface Forms {
  createPage: Form,
  login: Form,
  register: Form,
  updateUserInfo: Form,
  updateUserCredentials: Form
}

interface Page {
  author: string,
  description: string,
  id: string,
  isInMenu: boolean,
  keywords: string,
  name: string,
  pageComponents: string[],
  pageMenuParent: string,
  pageMenuOrder: number,
  slug: string,
  title: string
}

interface ParsedFile {
  newFilename: string,
  originalFilename: string,
  filepath: string,
  mimetype: string,
  size: number
}

interface Token {
  id: string,
  user: string,
  group: string,
  created: number
}

interface User {
  group: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  passwordCheck?: string,
  id: string,
  __typename?: string
}

interface Validators {
  email: Validator,
  notempty: Validator,
  slug: Validator,
  novalidator: Validator
}

interface Validator {
  (input: string): boolean
}

export {
  ContentField,
  DynamicForm,
  Forms,
  Form,
  FormEvent,
  FormField,
  ImageMeta,
  Page,
  ParsedFile,
  User,
  Token,
  Validators
}