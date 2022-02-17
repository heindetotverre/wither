<template>
  <div>
    <p>Login section</p>
    <div v-if="formRenderer === Auth.Login">
      <RendererForm
        :formName="formStore.state.forms.login.formInfo.name"
        :formFields="loginForm"
        @submit="auth(Auth.Login, $event)"
      />
      <p>Not a member yet?</p>
      <button @click="formRenderer = Auth.Register">Register yourself</button>
    </div>
    <div v-if="formRenderer === Auth.Register">
      <RendererForm
        :formName="formStore.state.forms.register.formInfo.name"
        :formFields="registerForm"
        @submit="auth(Auth.Register, $event)"
      />
      <p>Already a member?</p>
      <button @click="formRenderer = Auth.Login">Go to login</button>
    </div>
    <div v-if="response">{{ response.error ? response.error.message : response }}</div>
  </div>
</template>
<script setup lang="ts">
import { generalStore } from '~~/store'
import { authStore } from '~~/store/auth'
import { formStore } from '~~/store/forms'
import { User } from '~~/types/types'
import { AdminPath, Auth } from '~~/types/enums'

const response = ref(),
  formRenderer = ref(Auth.Login),
  loginForm = ref(formStore.get.getLoginForm()),
  registerForm = ref(formStore.get.getRegisterForm())

await generalStore.do.setClient()

const auth = async (method: Auth, event: User) => {
  const result = await authStore.do[method](event)
  if (!result.error && !(result instanceof Error)) {
    useRouter().push(`/${AdminPath.Admin}`)
  } else {
    response.value = result
  }
}
</script>