<template>
  <div v-if="props.mode === Mode.Front">
    <div>
      <h1>{{ content.title }}</h1>
      <h2>{{ content.subTitle }}</h2>
      <!-- <a :href="content.link.url">{{ content.link.text }}</a> -->
    </div>
    <div>
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
]

</script>