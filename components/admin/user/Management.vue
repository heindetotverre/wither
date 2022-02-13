<template>
  <div v-for="(entry, index) of Object.entries(user)" :key="index">{{ entry }}</div>
  <button @click="deleteUser(user.id)">Delete user</button>
  <button @click="editUser(user.id)">Edit user</button>
  <div v-if="response">{{ response }}</div>
</template>
<script setup lang="ts">
import { adminStore } from '~~/store/admin'
import { AdminSearch } from '~~/types/enums'

const user = computed(() => adminStore.get.getUser),
  response = ref()

const deleteUser = async (userId: string) => {
  response.value = await adminStore.do.deleteUser(userId)
}
const editUser = (userId: string) => {
  useRouter().push(`/${AdminSearch.Admin}/${AdminSearch.UserEdit}?userid=${userId}`)
}
</script>