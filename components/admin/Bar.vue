<template>
  <div>
    <NuxtLink :to="!urlPath.includes('admin')
    ? '/admin'
    : '/'">
      {{
        !urlPath.includes('admin')
          ? 'Go to to admin'
          : 'Go to website'
      }}
    </NuxtLink>
    <span v-if="urlPath.includes('admin')">
      <span v-if="user?.firstName">Hi {{ user?.firstName }}</span>
      <NuxtLink :to="`/${AdminPath.Admin}`">Go to your dashboard</NuxtLink>
      <NuxtLink
        :to="`/${AdminPath.Admin}/${AdminPath.Pages}/${AdminPath.Management}`"
      >Manage your pages</NuxtLink>
      <NuxtLink
        :to="`/${AdminPath.Admin}/${AdminPath.Users}/${AdminPath.Management}`"
      >Manage your account</NuxtLink>
    </span>
    <button @click="logout()">Log out</button>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { AdminPath } from '~~/types/enums'
import { authStore } from '~~/store/auth'
import { User } from '~~/types/types'

const props = defineProps({
  user: {
    type: Object as PropType<User>
  }
})

const logout = async () => {
  await authStore.do.logout()
}

const urlPath = useRoute().path
</script>