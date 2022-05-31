import { env } from 'process';
import { defineNuxtPlugin } from '#app'
import urql from '@urql/vue'

const port = env.DOKKU_PROXY_PORT || 4000
const url = env.MONGO_URL_SUFFIX || 'gql'
const host = env.HOSTNAME || 'localhost'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(urql, {
    url: `http://${host}:${port}/${url}`
  })
})