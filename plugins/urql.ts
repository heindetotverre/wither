import { env } from 'process';
import { defineNuxtPlugin } from '#app'
import urql from '@urql/vue'

const port = process.env.DOKKU_PROXY_PORT || 4000
const url = process.env.MONGO_URL_SUFFIX || 'gql'
const host = process.env.HOSTNAME || 'localhost'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(urql, {
    url: `http://${host}:${port}/${url}`
  })
})