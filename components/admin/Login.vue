<template>
  <div>
    <div>
      <p>Login section</p>
      <div v-if="formRenderer === 'login'">
        <RendererForm
          :formFields="loginForm"
          @submit="handleAuth($event, 'login')"/>
        <p>Not a member yet?</p>
        <button @click="formRenderer = 'register'">Register yourself</button>
      </div>
      <div v-if="formRenderer === 'register'">
        <RendererForm
          :formFields="registerForm"
          @submit="handleAuth($event, 'register')"/>
        <p>Already a member?</p>
        <button @click="formRenderer = 'login'">Go to login</button>
      </div>
      <div v-if="response">{{ response }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import formFieldsIndex from '~~/server/resources/formFieldsIndex.json'
  import { createId } from '~~/utils'
  import { store } from '~~/store'
  import { User, FormField } from '~~/types'

  const response = ref()
  const formRenderer = ref('login')
  const loginForm = ref([
    {
      ...formFieldsIndex.find(field => field.class === 'EmailInput'),
      label: 'email',
      id: createId('login')
    },
    {
      ...formFieldsIndex.find(field => field.class === 'PasswordInput'),
      label: 'password',
      id: createId('login')
    },
    {
      ...formFieldsIndex.find(field => field.class === 'Button'),
      label: 'Login',
      id: createId('login')
    }
  ] as Array<FormField>)
  const registerForm = ref([
    {
      ...formFieldsIndex.find(field => field.class === 'TextInput'),
      label: 'firstname',
      key: 'FirstName',
      id: createId('register')
    },
    {
      ...formFieldsIndex.find(field => field.class === 'TextInput'),
      label: 'lastname',
      key: 'LastLame',
      id: createId('register')
    },
    {
      ...formFieldsIndex.find(field => field.class === 'EmailInput'),
      label: 'email',
      id: createId('register')
    },
    {
      ...formFieldsIndex.find(field => field.class === 'PasswordInput'),
      label: 'password',
      id: createId('register')
    },
    {
      ...formFieldsIndex.find(field => field.class === 'PasswordInput'),
      label: 'password again',
      key: 'PasswordCheck',
      id: createId('register')
    },
    {
      ...formFieldsIndex.find(field => field.class === 'Button'),
      label: 'Register',
      key: 'Button',
      id: createId('register')
    }
  ] as Array<FormField>)

  const handleAuth = async (event: User, authMethod : string) => {
    const router = useRouter()
    response.value  = authMethod === 'login'
      ? await store.do.login(event)
      : await store.do.register(event)
    router.push('/admin')
  }
</script>