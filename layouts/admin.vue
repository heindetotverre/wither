<template>
  <div>
    <Html :lang="'en-GB'">
      <Head>
        <Title>Admin</Title>
        <Meta name="description" :content="`Admin section`" />
      </Head>
    </Html>

    <AdminBar :user="user" />

    <slot />
  </div>
</template>
<script setup lang="ts">
import { gqlStore } from '~~/store/graphql'
import { adminStore } from '~~/store/admin'
import { authStore } from '~~/store/auth'

const tokenId = useCookie<Record<string, any>>('witherLoginToken'),
  isLoggedIn = computed(() => authStore.get.getTokenState()),
  user = computed(() => adminStore.get.getUser())

await gqlStore.do.setClient()
await authStore.do.setTokenState(tokenId.value?.id)

if (isLoggedIn.value) {
  await adminStore.get.fetchAdmin()
}

</script>
<style lang="less">
@import "~~/assets/less/wither/admin.less";
</style>