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

<template>
  <div class="admin-bar full-width p-1">
    <div class="admin-bar__front" v-if="!isFront()">
      <NuxtLink :to="`/`">Go to website</NuxtLink>
      <div class="admin-bar__personalia" v-if="user?.firstName">Hi {{ user?.firstName }}</div>
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

<style lang="scss" scoped>
  .admin-bar {
    @include box-shadow-1;
    align-items: baseline;
    display: flex;
    background-color: $feather-grey;
    justify-content: space-between;

    &__front {
      display: flex;
    }

    &__personalia {
      margin: 0 2rem;
    }
  }
</style>