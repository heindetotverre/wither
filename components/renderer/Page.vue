<template>
  <NuxtLayout name="page" :page="page">
    <template v-if="is404" #404>This is a 404 layout template</template>
  </NuxtLayout>

  <div v-if="!noHomePage && !is404">
    <component v-for="component in page.pageComponents" :is="component">
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
  path: {
    type: String,
    required: true
  }
})

const isLoggedIn = computed(() => authStore.get.getTokenState()),
  is404 = ref(false),
  noHomePage = ref(false)

await frontStore.get.fetchSinglePage(`/${props.path ? props.path : ''}`)

const page = frontStore.get.getCurrentPage

is404.value = !!(!page && props.path !== '')
noHomePage.value = (!page && props.path === '')

if (props.path === '' && !page && !isLoggedIn.value) {
  useRouter().push('/admin')
}

</script>