<template>
  <div>
    <p>Login section</p>
    <button @click="handleAuth()">Login</button>
  </div>
</template>
<script setup lang="ts">

  const handleAuth = async () => {
    const result = await $fetch('/api/auth')
    console.log(result)
  }
</script>