<script setup lang="ts">
  import { authStore } from '~~/store/auth'
  import { formStore } from '~~/store/forms'
  import { User } from '~~/types/types'
  import { Auth, FormNames } from '~~/types/enums'
import { vShow } from 'vue'
import { V_ON_WITH_KEYS } from '@vue/compiler-dom'

  const response = ref(),
    formRenderer = ref(Auth.Login),
    loginForm = ref(formStore.get.getLoginForm()),
    registerForm = ref(formStore.get.getRegisterForm())


  const auth = async (method: Auth, event: User) => {
    const authResult = await authStore.do[method](event) as any
    if (!authResult?.response?.errors) {
      useRouter().push('/')
    } else {
      if (method === Auth.Login && authResult?.response?.errors.find((error : any) => error.message.includes('User not found'))) {
        formStore.do.updateAllFormValues(FormNames.LOGIN, 'clear')
      }
    }
    response.value = authResult
  }

  const switchAuthMethod = () => {
    formRenderer.value = formRenderer.value === Auth.Login
      ? Auth.Register
      : Auth.Login

    response.value = ''
  }
</script>

<template>
  <div class="login__landing">
    <p>Login section</p>
    <div
      v-if="formRenderer === Auth.Login"
      class="p-2 login__form center--absolute"
    >
      <RendererForm :form="loginForm" @submit="auth(Auth.Login, $event)" />
      <p>Not a member yet?</p>
      <button @click="switchAuthMethod()">Register yourself</button>
    </div>
    <div
      v-if="formRenderer === Auth.Register"
      class="p-2 login__form center--absolute"
    >
      <RendererForm :form="registerForm" @submit="auth(Auth.Register, $event)" />
      <p>Already a member?</p>
      <button @click="switchAuthMethod()">Go to login</button>
    </div>
    <div v-if="response">{{ response.error ? response.error.message : response }}</div>
  </div>
</template>

<style lang="less" scoped>
.login {
  &__landing {
    height: 100vh;
    width: 100vw;
  }

  &__form {
    width: 30rem;
  }
}
</style>