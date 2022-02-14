<template>
  <div>
    <p>Edit user info</p>
    <RendererForm
      :formName="updateUserInfoFormName"
      :formFields="updateUserInfoForm"
      @submit="editUser($event, updateUserInfoFormName)"
    />
    <p>Edit credentials</p>
    <RendererForm
      :formName="updateUserCredentialsName"
      :formFields="updateUserCredentials"
      @submit="editUser($event, updateUserCredentialsName)"
    />
    <NuxtLink :to="`/${AdminSearch.Admin}`">Cancel</NuxtLink>
    <div v-if="response">{{ response }}</div>
  </div>
</template>
<script lang="ts" setup>
import { adminStore } from '~~/store/admin'
import { formStore } from '~~/store/forms'
import { FormField, Forms, User } from '~~/types'
import { AdminSearch } from '~~/types/enums'

const response = ref(),
  updateUserInfoForm = ref(formStore.state.forms.updateUserInfo as FormField[]),
  updateUserCredentials = ref(formStore.state.forms.updateUserCredentials as FormField[]),
  updateUserInfoFormName: keyof Forms = 'updateUserInfo',
  updateUserCredentialsName: keyof Forms = 'updateUserCredentials'

const editUser = async (formSubmitEvent: User, formName: keyof Forms) => {
  response.value = await adminStore.do.updateUserInfo(formSubmitEvent)
  formStore.do.updateAllFormValues(formName, 'clear')
  if (!response.value.errors) {
    useRouter().push(`${AdminSearch.Admin}`)
  }
}

onBeforeMount(() => {
  parseUrl()
})

const parseUrl = () => {
  const query = useRoute().query
  if (query) {
    const user = adminStore.get.getUser()
    formStore.do.setFormValuesBasedOnQuery(updateUserInfoFormName, user)
  }
}


</script>