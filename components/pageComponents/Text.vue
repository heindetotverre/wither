<template>
  <div v-if="props.mode === Mode.Front">
    <p>{{ content.text }}</p>
  </div>
  <div v-else>Backend of {{ id }} component</div>
</template>
<script setup lang="ts">
import { contentStore } from '~~/store/content'
import { Mode } from '~~/types/enums'

const props = defineProps({
  mode: {
    type: Number,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

onMounted(() => {
  content.value = contentStore.get.createdFields(props.id, props.slug)
  if (props.mode === Mode.Back) {
    if (!Object.keys(content.value).length) {
      contentStore.do.registerFields(fields, props.id, props.slug)
    }
  }
})

const content = ref({}) as any

const fields = [
  {
    name: 'text',
    type: 'text',
    label: 'Enter the text',
    default: 'This is a text'
  }
]

</script>