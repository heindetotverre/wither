import { defineNuxtPlugin } from '#app'
import urql from '@urql/vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(urql, {
    url: 'http://localhost:4000/gql'
  })
})