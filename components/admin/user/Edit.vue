<template>
  <div>
    <p>Edit user info</p>
    <RendererForm
      :formName="formStore.state.forms.updateUserInfo.formInfo.name"
      :formFields="updateUserInfoForm"
      @submit="editUser($event, formStore.state.forms.updateUserInfo.formInfo.name)"
    />
    <p>Edit credentials</p>
    <RendererForm
      :formName="formStore.state.forms.updateUserCredentials.formInfo.name"
      :formFields="updateUserCredentials"
      @submit="editUser($event, formStore.state.forms.updateUserCredentials.formInfo.name)"
    />
    <NuxtLink :to="`/${AdminPath.Admin}`">Cancel</NuxtLink>
    <div v-if="response">{{ response }}</div>
  </div>
</template>
<script lang="ts" setup>
import { adminStore } from '~~/store/admin'
import { formStore } from '~~/store/forms'
import { Forms, User } from '~~/types'
import { AdminPath } from '~~/types/enums'

const response = ref(),
  updateUserInfoForm = ref(formStore.get.getUpdateUserInfoForm()),
  updateUserCredentials = ref(formStore.get.getUpdateUserCredentialsForm())

const editUser = async (formSubmitEvent: User, formName: keyof Forms) => {
  response.value = await adminStore.do.updateUserInfo(formSubmitEvent)
  formStore.do.updateAllFormValues(formName, 'clear')
  if (!response.value.errors) {
    useRouter().push(`${AdminPath.Admin}`)
  }
}

onBeforeMount(() => {
  parseUrl()
})

const parseUrl = () => {
  const query = useRoute().query
  if (query) {
    const user = adminStore.get.getUser()
    formStore.do.setFormValuesBasedOnQuery(formStore.state.forms.updateUserInfo.formInfo.name, user)
  }
}


</script>