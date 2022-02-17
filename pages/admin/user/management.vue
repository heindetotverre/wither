<template>
  <div>
    <div v-for="(entry, index) of Object.entries(user)" :key="index">{{ entry }}</div>
    <button @click="deleteUser(user.id)">Delete user</button>
    <button @click="editUser(user.id)">Edit user</button>
    <div v-if="response">{{ response }}</div>
  </div>
</template>
<script setup lang="ts">
import { adminStore } from '~~/store/admin'
import { AdminPath } from '~~/types/enums'

definePageMeta({
  layout: 'admin'
})

const user = computed(() => adminStore.get.getUser()),
  response = ref()

const deleteUser = async (userId: string) => {
  response.value = await adminStore.do.deleteUser(userId)
}
const editUser = (userId: string) => {
  useRouter().push(`/${AdminPath.Admin}/${AdminPath.Users}/${AdminPath.Edit}?userid=${userId}`)
}
</script>