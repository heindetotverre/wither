import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  serverMiddleware: [
    { path: '/api', handler: '~/server/api/auth.ts' },
    { path: '/favicon.ico', handler: '~/favicon.ico' }
  ],
  meta: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  }
})
