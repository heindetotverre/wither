<template>
  <div>
    <p>Login section</p>
    <RendererForm
      :formFields="form"
      @submit="handleAuth($event)"/>
  </div>
</template>
<script setup lang="ts">
  import formFieldsIndex from '~~/server/resources/formFieldsIndex.json'

  const form = ref([
    {
      ...formFieldsIndex.find(field => field.type === 'TextInput'),
      label: 'email',
      key: 'Email'
    },
    {
      ...formFieldsIndex.find(field => field.type === 'TextInput'),
      label: 'password',
      key: 'Password'
    },
    {
      ...formFieldsIndex.find(field => field.type === 'Button'),
      label: 'Login',
      key: 'Button'
    }
  ])

  const handleAuth = async (event: Event) => {
    const result = await $fetch('/api/auth')
    console.log(event, result)
  }
</script>