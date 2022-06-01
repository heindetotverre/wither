import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  serverMiddleware: [
    { path: '/setcookie', handler: '~/server/auth/setCookie.ts' }
  ],
  meta: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  components: {
    global: true,
    dirs: ['~/components'],
  },
  modules: ['nuxt-graphql-client'],
  runtimeConfig: {
    public: {
      GQL_HOST: 'http://localhost:4000/'
    }
  }
})
