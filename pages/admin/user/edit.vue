<script lang="ts" setup>
  import { adminStore } from '~~/store/admin'
  import { formStore } from '~~/store/forms'
  import { Forms, User } from '~~/types/types'
  import { AdminPath } from '~~/types/enums'
  import LazyRendererForm from "~~/components/renderer/Form.vue"


  definePageMeta({
    layout: 'admin'
  })

  const response = ref(),
    updateUserInfoForm = ref(formStore.get.getUpdateUserInfoForm()),
    updateUserCredentials = ref(formStore.get.getUpdateUserCredentialsForm())

  const editUser = async (formSubmitEvent: User, formName: keyof Forms) => {
    response.value = await adminStore.do.updateUserInfo(formSubmitEvent)
    formStore.do.updateAllFormValues(formName, 'clear')
    if (!response.value.errors) {
      useRouter().push(`/${AdminPath.Admin}/${AdminPath.Users}/${AdminPath.Management}`)
    }
  }

  onBeforeMount(() => {
    parseUrl()
  })

  const parseUrl = () => {
    const query = useRoute().query
    if (query) {
      const user = adminStore.get.getUser()
      formStore.do.setFormValuesBasedOnQuery(updateUserInfoForm.value.pageInfo.name, user)
    }
  }
</script>

<template>
  <div>
    <p>Edit user info</p>
    <LazyRendererForm
      :form="updateUserInfoForm"
      @submit="editUser($event, updateUserInfoForm.pageInfo.name)"
    />
    <p>Edit credentials</p>
    <LazyRendererForm
      :form="updateUserCredentials"
      @submit="editUser($event, updateUserCredentials.pageInfo.name)"
    />
    <NuxtLink :to="`/${AdminPath.Admin}`">Cancel</NuxtLink>
    <div v-if="response">{{ response }}</div>
  </div>
</template>