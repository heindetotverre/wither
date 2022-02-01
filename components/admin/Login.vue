<template>
  <div>
    <div>
      <p>Login section</p>
      <div v-if="formRenderer === 'login'">
        <RendererForm :form="loginForm" @submit="handleLogin($event)" />
        <p>Not a member yet?</p>
        <button @click="formRenderer = 'register'">Register yourself</button>
      </div>
      <div v-if="formRenderer === 'register'">
        <RendererForm :form="registerForm" @submit="handleRegister($event)" />
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
import { authStore } from '~~/store/auth'
import { UserForm, FormField, LoginForm } from '~~/types'

const loginFormName = 'loginUser'
const registerFormName = 'registerUser'

const response = ref()
const formRenderer = ref('login')
const loginForm = ref([
  { ...formFieldsIndex.find(field => field.class === 'EmailInput'), label: 'email', id: createId(loginFormName), autocomplete: 'username' },
  { ...formFieldsIndex.find(field => field.class === 'PasswordInput'), label: 'password', id: createId(loginFormName), autocomplete: 'current-password' },
  { ...formFieldsIndex.find(field => field.class === 'Button'), label: 'Login', id: createId(loginFormName) }
] as Array<FormField>)
const registerForm = ref([
  { ...formFieldsIndex.find(field => field.class === 'TextInput'), label: 'firstname', key: 'firstName', id: createId(registerFormName) },
  { ...formFieldsIndex.find(field => field.class === 'TextInput'), label: 'lastname', key: 'lastLame', id: createId(registerFormName) },
  { ...formFieldsIndex.find(field => field.class === 'EmailInput'), label: 'email', id: createId(registerFormName), autocomplete: 'username' },
  { ...formFieldsIndex.find(field => field.class === 'PasswordInput'), label: 'password', id: createId(registerFormName), autocomplete: 'current-password' },
  { ...formFieldsIndex.find(field => field.class === 'PasswordInput'), label: 'password again', key: 'passwordCheck', id: createId(registerFormName), autocomplete: 'current-password' },
  { ...formFieldsIndex.find(field => field.class === 'Button'), label: 'Register', key: 'button', id: createId(registerFormName) }
] as Array<FormField>)

const handleLogin = async (event: LoginForm) => {
  response.value = await authStore.do.login(event)
  if (!response.value.error) {
    if (response.value.data.message) {
      useRouter().push('/')
    }
  }
}

const handleRegister = async (event: UserForm) => {
  response.value = await authStore.do.register(event)
  if (!response.value.error) {
    if (response.value.data.message) {
      useRouter().push('/')
    }
  }
}
</script>