<script setup lang="ts">
  import { frontStore } from '~~/store/front'
  import { authStore } from '~~/store/auth'
  import { Mode } from '~~/types/enums'
  import LazyRendererPageComponent from "~~/components/renderer/PageComponent.vue"

  const props = defineProps({
    path: {
      type: String,
      required: true
    }
  })

  const isLoggedIn = computed(() => authStore.get.getTokenState()),
    is404 = ref(false),
    noHomePage = ref(false),
    slug = `/${props.path || ''}`

  const page = await frontStore.get.fetchSinglePage(slug)

  is404.value = !!(!page?.id && props.path !== '')
  noHomePage.value = (!page?.id && props.path === '')

  if (props.path === '/' && !page && !isLoggedIn.value) {
    useRouter().push('/admin/login')
  }
</script>

<template>
  <NuxtLayout name="page" :page="page">
    <template v-if="is404" #404>This is a 404 layout template</template>
    <div v-if="!noHomePage && !is404">
      <LazyRendererPageComponent
        v-for="(component, index) in page?.pageComponents"
        :key="index"
        :mode="Mode.Front"
        :pageId="(page?.id as string)"
        :slug="slug"
        :name="component"
        :id="component"
      />
    </div>
    <div v-if="noHomePage">
      <p>No Homepage yet, go and <a href="/admin/page/create">create one</a></p>
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
  @import "~~/theme/resources/theme.scss";
</style>