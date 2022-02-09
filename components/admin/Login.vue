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
      <div v-if="response">{{ response.error ? response.error.message : response }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { authStore } from '~~/store/auth'
import { formStore } from '~~/store/forms'
import { UserForm, FormField, LoginForm } from '~~/types'

const response = ref()
const formRenderer = ref('login')
const loginForm = ref(formStore.state.forms.login as Array<FormField>)
const registerForm = ref(formStore.state.forms.register as Array<FormField>)

const handleLogin = async (event: LoginForm) => {
  response.value = await authStore.do.login(event)
  if (!response.value.error) {
    useRouter().push('/')
  }
}

const handleRegister = async (event: UserForm) => {
  response.value = await authStore.do.register(event)
  if (!response.value.error) {
    useRouter().push('/')
  }
}
</script>