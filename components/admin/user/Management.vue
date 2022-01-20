<template>
  <div v-for="(user, index) of userInfo"
    :key="index">
    {{ user }}
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })

  const userInfo = ref(
    Object.entries(props.user)
  )
</script>