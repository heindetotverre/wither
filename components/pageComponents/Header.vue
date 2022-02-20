<template>
  <div>
    <div>
      <h1>{{ content.title }}</h1>
      <h2>{{ content.subTitle }}</h2>
      <a :href="content['link.url']">{{ content['link.text'] }}</a>
    </div>
    <div>
      <img :src="content.image" />
    </div>
  </div>
</template>
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
    name: 'subTitle',
    type: 'text',
    label: 'Enter the sub title',
    default: 'This is a sub title'
  },
  {
    name: 'image',
    type: 'image',
    label: 'Upload the image',
    default: '/dummy.jpg'
  },
  {
    name: 'link',
    type: 'group',
    children: [
      {
        name: 'link.url',
        type: 'text',
        label: 'Enter the link url',
        default: '#'
      },
      {
        name: 'link.text',
        type: 'text',
        label: 'Enter the link text',
        default: 'This is a link'
      }
    ]
  }
])
</script>