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
    <div class="auth__landing">
      <div class="auth__form center--absolute b-r-t-1 b-r-b-3 p-3">
        <UtilsAnimation
          :animateTargets="['height', 'width']"
        >
          <p>Authentication</p>
          <div
            class="login"
            v-if="formRenderer === Auth.Login"
          >
            <RendererForm :form="loginForm" @submit="auth(Auth.Login, $event)" />
            <p>Not a member yet?</p>
            <button class="m-t-1" @click="switchAuthMethod()">Register yourself</button>
          </div>
          <div
            class="register"
            v-if="formRenderer === Auth.Register"
          >
            <RendererForm :form="registerForm" @submit="auth(Auth.Register, $event)" />
            <p>Already a member?</p>
            <button class="m-t-1" @click="switchAuthMethod()">Go to login</button>
          </div>
        </UtilsAnimation>
      </div>
      <div v-if="response">{{ response.error ? response.error.message : response }}</div>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  &__landing {
    height: 100vh;
    width: 100vw;

    .login {
      width: 300px;
    }

    .register {
      width: 600px;
    }
  }

  &__form {
    @include box-shadow-1;
    background-color: $feather-grey;
  }
}
</style>