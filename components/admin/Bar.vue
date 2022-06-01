<template>
  <div>
    <div v-if="!isFront()">
      <NuxtLink :to="`/`">Go to website</NuxtLink>
      <span v-if="user?.firstName">Hi {{ user?.firstName }}</span>
      <NuxtLink :to="`/${AdminPath.Admin}`">Go to your dashboard</NuxtLink>
      <NuxtLink
        :to="`/${AdminPath.Admin}/${AdminPath.Pages}/${AdminPath.Management}`"
      >Manage your pages</NuxtLink>
      <NuxtLink
        :to="`/${AdminPath.Admin}/${AdminPath.Users}/${AdminPath.Management}`"
      >Manage your account</NuxtLink>
    </div>
    <div v-else>
      <NuxtLink :to="`/${AdminPath.Admin}`">Go to admin</NuxtLink>
      <NuxtLink
        v-if="currentPage.id"
        :to="`/${AdminPath.Admin}/${AdminPath.Pages}/${AdminPath.Create}?pageid=${currentPage?.id}`"
      >Edit this page</NuxtLink>
    </div>
    <button @click="logout()">Log out</button>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { AdminPath } from '~~/types/enums'
import { authStore } from '~~/store/auth'
import { User } from '~~/types/types'
import { frontStore } from '~~/store/front'
import { isFront } from '~~/utils/index'

const props = defineProps({
  user: {
    type: Object as PropType<User>
  }
})

const currentPage = computed(() => frontStore.get.getCurrentPage)

const logout = async () => {
  await authStore.do.logout()
  useRouter().push('/')
}
</script>