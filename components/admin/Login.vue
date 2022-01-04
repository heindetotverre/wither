<template>
  <div>
    <div>
      <p>Login section</p>
      <RendererForm
        :formFields="loginForm"
        @submit="handleAuth($event)"/>
    </div>
  </div>
</template>
<script setup lang="ts">
  import formFieldsIndex from '~~/server/resources/formFieldsIndex.json'
  import { createId } from '~~/utils'
  import { store } from '~~/store'

  const loginForm = ref([
    {
      ...formFieldsIndex.find(field => field.type === 'TextInput'),
      label: 'email',
      key: 'Email',
      id: createId('login')
    },
    {
      ...formFieldsIndex.find(field => field.type === 'TextInput'),
      label: 'password',
      key: 'Password',
      id: createId('login')
    },
    {
      ...formFieldsIndex.find(field => field.type === 'Button'),
      label: 'Login',
      key: 'Button',
      id: createId('login')
    }
  ])

  const handleAuth = async (event: Event) => {
    const router = useRouter()
    await store.do.login(event)
    router.push('/admin')
  }
</script>