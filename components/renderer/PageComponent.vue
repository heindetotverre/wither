<template>
  <div v-if="props.mode === Mode.Front">
    <component :is="getCleanComponentName(name)" @setFields="setFields($event)" :content="content"></component>
  </div>
  <div v-else>Backend of {{ id }} component</div>
</template>
<script lang="ts" setup>
import { contentStore } from '~~/store/content'
import { Mode } from '~~/types/enums'
import { ContentField } from '~~/types/types';

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
      contentStore.do.registerFields(fields.value, props.id, props.slug)
    }
  }
})

const content = ref<any>({}),
  fields = ref<ContentField[]>([])

const getCleanComponentName = (componentId: string) => {
  return componentId.split('_')[0]
}

const setFields = (fieldsFromComponent: ContentField[]) => {
  fields.value = fieldsFromComponent
}

</script>