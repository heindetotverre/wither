<script setup lang="ts">
  import { adminStore } from '~~/store/admin'
  import LazyAdminBar from "~~/components/admin/Bar.vue"

  const user = computed(() => adminStore.get.getUser())

  await adminStore.get.fetchAdmin()
</script>

<template>
  <div class="admin">
    <Html :lang="'en-GB'">
      <Head>
        <Title>Admin</Title>
        <Meta name="description" :content="`Admin section`" />
      </Head>
    </Html>

    <LazyAdminBar :user="user" />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .admin {
    @include spread
  }
</style>