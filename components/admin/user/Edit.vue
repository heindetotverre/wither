<template>
  <div>
    <p>Edit user info</p>
    <RendererForm
      :formName="'updateUserInfo'"
      :formFields="updateUserInfoForm"
      @submit="editUser($event, 'info')"
    />
    <p>Edit credentials</p>
    <RendererForm
      :formName="'updateUserCredentials'"
      :formFields="updateUserCredentials"
      @submit="editUser($event, 'credentials')"
    />
    <NuxtLink :to="`/${AdminSearch.Admin}`">Cancel</NuxtLink>
  </div>
</template>
<script lang="ts" setup>
import { adminStore } from '~~/store/admin'
import { formStore } from '~~/store/forms'
import { FormField, User } from '~~/types'
import { AdminSearch } from '~~/types/enums'

const response = ref(),
  updateUserInfoForm = ref(formStore.state.forms.updateUserInfo as FormField[]),
  updateUserCredentials = ref(formStore.state.forms.updateUserCredentials as FormField[])

const editUser = async (formSubmitEvent: User, method: string) => {
  response.value = method === 'info'
    ? await adminStore.do.updateUserInfo(formSubmitEvent)
    : await adminStore.do.updateUserCredentials(formSubmitEvent)
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
    const user = adminStore.get.getUser
    formStore.do.setFormValuesBasedOnQuery('updateUserInfo', user)
  }
}


</script>