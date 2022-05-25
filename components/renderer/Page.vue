<template>
  <NuxtLayout name="page" :page="page">
    <template v-if="is404" #404>This is a 404 layout template</template>
  </NuxtLayout>

  <div v-if="!noHomePage && !is404">
    <RendererPageComponent
      v-for="(component, index) in page.pageComponents"
      :key="index"
      :mode="Mode.Front"
      :slug="slug"
      :name="component"
      :id="component"
    />
  </div>
  <div v-if="noHomePage">
    <p>No Homepage yet, go and create one</p>
  </div>
</template>

<script setup lang="ts">
import { frontStore } from '~~/store/front'
import { authStore } from '~~/store/auth'
import { Mode } from '~~/types/enums'

const props = defineProps({
  path: {
    type: String,
    required: true
  }
})

const isLoggedIn = computed(() => authStore.get.getTokenState()),
  is404 = ref(false),
  noHomePage = ref(false),
  slug = `/${props.path ? props.path : ''}`

await frontStore.get.fetchSinglePage(slug)

const page = frontStore.get.getCurrentPage

is404.value = !!(!page && props.path !== '')
noHomePage.value = (!page && props.path === '')

if (props.path === '' && !page && !isLoggedIn.value) {
  useRouter().push('/admin/login')
}
</script>
<style less>
@import "~~/assets/less/wither/front.less";
</style>