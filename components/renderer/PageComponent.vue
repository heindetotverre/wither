<script lang="ts" setup>
  import { contentStore } from '~~/store/content'
  import { Mode } from '~~/types/enums'
  import { ContentField, FormField } from '~~/types/types'

  const emits = defineEmits([
    'triggerFieldsToFill'
  ])

  const props = defineProps({
    mode: {
      type: Number,
      required: true
    },
    pageId: {
      type: String,
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

  const content = computed(() => contentStore.get.createdFields(props.id, props.slug, props.pageId) as FormField[])

  const setFields = (fieldsFromComponent: ContentField[]) => {
    if (props.mode === Mode.Back && !Object.keys(content.value).length) {
      contentStore.do.registerFields(fieldsFromComponent, props.id, props.slug, props.pageId)
    }
  }

  const { dynamicComponent } = useComponentResolvement()
</script>

<template>
  <component
    :content="content"
    :is="dynamicComponent(name)"
    @click="emits('triggerFieldsToFill')"
    @setFields="setFields($event)"
  />
  <div v-if="props.mode === Mode.Back">Backend of {{ id }} component</div>
</template>
