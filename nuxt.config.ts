import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  serverMiddleware: [
    { path: '/api', handler: '~/server/api/auth.ts' }
  ]
})
