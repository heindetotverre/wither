import { defineNuxtPlugin } from '#app'
import urql from '@urql/vue'

const port = 4000
const url = 'gql'
const host = 'localhost'
const graphQlUrl = `http://${host}:${port}/${url}`

console.log(`===> graphql client url: ${graphQlUrl} <===`)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(urql, {
    url: graphQlUrl
  })
})