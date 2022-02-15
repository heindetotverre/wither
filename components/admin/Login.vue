<template>
  <div>
    <div>
      <p>Login section</p>
      <div v-if="formRenderer === 'login'">
        <RendererForm
          :formName="formStore.state.forms.login.formInfo.name"
          :formFields="loginForm"
          @submit="handleLogin($event)"
        />
        <p>Not a member yet?</p>
        <button @click="formRenderer = 'register'">Register yourself</button>
      </div>
      <div v-if="formRenderer === 'register'">
        <RendererForm
          :formName="formStore.state.forms.register.formInfo.name"
          :formFields="registerForm"
          @submit="handleRegister($event)"
        />
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
import { User } from '~~/types'

const response = ref(),
  formRenderer = ref('login'),
  loginForm = ref(formStore.get.getLoginForm()),
  registerForm = ref(formStore.get.getRegisterForm())

const handleLogin = async (event: User) => {
  response.value = await authStore.do.login(event)
  if (!response.value.error) {
    useRouter().push('/')
  }
}

const handleRegister = async (event: User) => {
  response.value = await authStore.do.register(event)
  if (!response.value.error) {
    useRouter().push('/')
  }
}
</script>