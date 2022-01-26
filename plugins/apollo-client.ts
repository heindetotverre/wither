import { defineNuxtPlugin } from "#app"
import { ApolloClient, InMemoryCache } from "@apollo/client/core"

export default defineNuxtPlugin((nuxtApp) => {
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'mongod//127.0.0.1:27017/db'
  })
  nuxtApp.vueApp.provide('apolloClient', apolloClient)
})