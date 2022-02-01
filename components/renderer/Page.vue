<template>
  <NuxtLayout name="page" :page="page">
    <template v-if="is404" #404>This is a 404 layout template</template>
  </NuxtLayout>

  <div v-if="!noHomePage">
    <p>Page with components: {{ page }}</p>
    <component v-for="component in page.components" :is="component">
      <slot></slot>
    </component>
  </div>
  <div v-else>
    <p>No Homepage yet, go and create one</p>
  </div>
</template>

<script setup lang="ts">
import { frontStore } from '~~/store/front'
import { authStore } from '~~/store/auth'

const props = defineProps({
  search: {
    type: String,
    required: true
  }
})

const isLoggedIn = computed(() => authStore.get.getTokenState())

const is404 = ref(false)
const noHomePage = ref(false)

await frontStore.get.fetchSinglePage(`/${props.search ? props.search : ''}`)

const page = frontStore.get.getCurrentPage

is404.value = !!(page.name === '404' && props.search !== '')
noHomePage.value = !!(page.name === '404' && props.search === '')

if (props.search === '' && page.name === '404' && !isLoggedIn.value) {
  useRouter().push('/admin')
}

</script>