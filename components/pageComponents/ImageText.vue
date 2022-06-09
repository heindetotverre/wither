<script setup lang="ts">
  const props = defineProps({
    content: {
      type: Object,
      required: true
    }
  })

  const emits = defineEmits([
    'setFields'
  ])

  emits('setFields', [
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
      default: '/dummy.png'
    }
  ])
</script>

<template>
  <div>
    <div>
      <h3>{{ content.title }}</h3>
    </div>
    <p>{{ content.text }}</p>
    <div>
      <img :src="content.image" />
    </div>
  </div>
</template>
