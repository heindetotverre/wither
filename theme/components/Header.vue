<script setup lang="ts">
  const props = defineProps({
    content: {
      type: Object,
      required: true
    }
  })

  const emits = defineEmits([
    'setFields',
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
      label: 'Select an image',
      default: 'dummy.png'
    },
    {
      name: 'link',
      type: 'group',
      children: [
        {
          name: 'url',
          type: 'text',
          label: 'Enter the link url',
          default: '#'
        },
        {
          name: 'text',
          type: 'text',
          label: 'Enter the link text',
          default: 'This is a link'
        }
      ]
    }
  ])
</script>

<template>
  <div>
    <div>
      <h1>{{ content.title }}</h1>
      <h2>{{ content.subTitle }}</h2>
      <a :href="content.url">{{ content.text }}</a>
    </div>
    <div>
      <img :src="`/images/${content.image}`" />
    </div>
  </div>
</template>