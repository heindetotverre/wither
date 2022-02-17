<template>
  <div v-if="props.mode === Mode.Front">
    <div>
      <h3>{{ content.title }}</h3>
    </div>
    <p>{{ content.text }}</p>
    <div v-if="content.image">
      <img :src="content.image" />
    </div>
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
  data: {
    type: Object,
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

const emits = defineEmits([
  'sendId'
])

onMounted(() => {
  props.mode === Mode.Back
    ? contentStore.do.registerFields(fields, props.id)
    : content.value = contentStore.get.createdFields(props.id, props.data.id)

  emits('sendId', props.id)
})

const content = ref()

const fields = [
  {
    name: 'title',
    type: 'text',
    label: 'Enter the title',
    default: 'This is a title'
  },
  {
    name: 'text',
    type: 'text',
    label: 'Enter the text',
    default: 'This is a text'
  },
  {
    name: 'image',
    type: 'image',
    label: 'Upload the image',
    default: '/dummy.jpg'
  }
]

</script>