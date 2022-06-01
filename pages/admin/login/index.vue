<template>
  <div>
    <p>Login section</p>
    <div v-if="formRenderer === Auth.Login">
      <RendererForm :form="loginForm" @submit="auth(Auth.Login, $event)" />
      <p>Not a member yet?</p>
      <button @click="formRenderer = Auth.Register">Register yourself</button>
    </div>
    <div v-if="formRenderer === Auth.Register">
      <RendererForm :form="registerForm" @submit="auth(Auth.Register, $event)" />
      <p>Already a member?</p>
      <button @click="formRenderer = Auth.Login">Go to login</button>
    </div>
    <div v-if="response">{{ response.error ? response.error.message : response }}</div>
  </div>
</template>
<script setup lang="ts">
import { authStore } from '~~/store/auth'
import { formStore } from '~~/store/forms'
import { User } from '~~/types/types'
import { Auth, FormNames } from '~~/types/enums'

const response = ref(),
  formRenderer = ref(Auth.Login),
  loginForm = ref(formStore.get.getLoginForm()),
  registerForm = ref(formStore.get.getRegisterForm())


const auth = async (method: Auth, event: User) => {
  const authResult = await authStore.do[method](event) as any
  if (!authResult.error && !(authResult instanceof Error)) {
    useRouter().push('/')
  } else {
    if (method === Auth.Login && authResult?.error?.message.includes('User not found')) {
      formStore.do.updateAllFormValues(FormNames.LOGIN, 'clear')
    }
  }
  response.value = authResult
}
</script>