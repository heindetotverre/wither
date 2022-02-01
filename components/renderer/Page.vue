<template>
  <NuxtLayout name="page" :page="page">
    <template v-if="is404" #404>This is a 404 layout template</template>
  </NuxtLayout>

  <div v-if="!noHomePage && !is404">
    <p>Page with components: {{ page }}</p>
    <component v-for="component in page.components" :is="component">
      <slot></slot>
    </component>
  </div>
  <div v-if="noHomePage">
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

is404.value = !!(!page && props.search !== '')
noHomePage.value = (!page && props.search === '')

if (props.search === '' && !page && !isLoggedIn.value) {
  useRouter().push('/admin')
}

</script>