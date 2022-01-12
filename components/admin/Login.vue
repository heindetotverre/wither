<template>
  <div>
    <div>
      <p>Login section</p>
      <div v-if="renderer === 'login'">
        <RendererForm
          :formFields="loginForm"
          @submit="handleAuth($event, 'login')"/>
        <p>Not a member yet?</p>
        <button @click="renderer = 'register'">Register yourself</button>
      </div>
      <div v-if="renderer === 'register'">
        <RendererForm
          :formFields="registerForm"
          @submit="handleAuth($event, 'register')"/>
        <p>Already a member?</p>
        <button @click="renderer = 'login'">Go to login</button>
      </div>
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
  const registerForm = ref([
    {
      ...formFieldsIndex.find(field => field.type === 'TextInput'),
      label: 'firstname',
      key: 'First name',
      id: createId('register')
    },
    {
      ...formFieldsIndex.find(field => field.type === 'TextInput'),
      label: 'lastname',
      key: 'Last name',
      id: createId('register')
    },
    {
      ...formFieldsIndex.find(field => field.type === 'TextInput'),
      label: 'email',
      key: 'Email',
      id: createId('register')
    },
    {
      ...formFieldsIndex.find(field => field.type === 'TextInput'),
      label: 'password',
      key: 'Password',
      id: createId('register')
    },
    {
      ...formFieldsIndex.find(field => field.type === 'TextInput'),
      label: 'password again',
      key: 'PasswordAgain',
      id: createId('register')
    },
    {
      ...formFieldsIndex.find(field => field.type === 'Button'),
      label: 'Register',
      key: 'Button',
      id: createId('register')
    }
  ])
  const renderer = ref('login')

  const handleAuth = async (event: Event, authMethod : string) => {
    const router = useRouter()
    authMethod === 'login'
      ? await store.do.login(event)
      : await store.do.register(event)

    router.push('/admin')
  }
</script>