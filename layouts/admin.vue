<script setup lang="ts">
  import { adminStore } from '~~/store/admin'
  import { authStore } from '~~/store/auth'

  const tokenId = useCookie<Record<string, any>>('witherLoginToken'),
    isLoggedIn = computed(() => authStore.get.getTokenState()),
    user = computed(() => adminStore.get.getUser())

  await authStore.do.setTokenState(tokenId.value?.id)

  if (isLoggedIn.value) {
    await adminStore.get.fetchAdmin()
  }
</script>

<template>
  <div class="admin">
    <Html :lang="'en-GB'">
      <Head>
        <Title>Admin</Title>
        <Meta name="description" :content="`Admin section`" />
      </Head>
    </Html>

    <AdminBar :user="user" />

    <UtilsAnimation
      :animateTargets="['height', 'width']"
    >
      <slot />
    </UtilsAnimation>
  </div>
</template>

<style lang="scss">
  @import "~~/assets/scss/wither/admin.scss";
</style>