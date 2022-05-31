import { defineNuxtPlugin } from '#app'
import urql from '@urql/vue'

const graphQlUrl = `http://server.heindetotverre.com/gql`

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(urql, {
    url: graphQlUrl
  })
})
