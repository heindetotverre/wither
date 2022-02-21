<template>
  <div>
    <component :is="getCleanComponentName(name)" @setFields="setFields($event)" :content="content"></component>
    <div v-if="props.mode === Mode.Back">Backend of {{ id }} component</div>
  </div>
</template>
<script lang="ts" setup>
import { contentStore } from '~~/store/content'
import { Mode } from '~~/types/enums'
import { ContentField, FormField } from '~~/types/types'

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

const content = computed(() => contentStore.get.createdFields(props.id, props.slug) as FormField[])

const getCleanComponentName = (componentId: string) => {
  return componentId.split('_')[0]
}

const setFields = (fieldsFromComponent: ContentField[]) => {
  if (props.mode === Mode.Back && !Object.keys(content.value).length) {
    contentStore.do.registerFields(fieldsFromComponent, props.id, props.slug)
  }
}

</script>