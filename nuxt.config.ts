import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  serverMiddleware: [
    { path: '/auth', handler: '~/server/auth/index.ts' }
  ],
  meta: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  components: {
    global: true,
    dirs: ['~/components'],
  }
})
