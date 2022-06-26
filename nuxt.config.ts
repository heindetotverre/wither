import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  serverMiddleware: [
    { path: '/saveimages', handler: '~/server/images/uploadImages.ts' }
  ],
  meta: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  modules: ['nuxt-graphql-client'],
  runtimeConfig: {
    public: {
      GQL_HOST: process.env.GQL_HOST
    }
  },
  css: ['~/assets/scss/wither/main.scss'],
  vite: {
    css: {
        preprocessorOptions: {
            scss: {
                  additionalData: [
                    `@import "~/assets/scss/wither/global.scss";`
                  ]
              },
          },
      },
  },
})
