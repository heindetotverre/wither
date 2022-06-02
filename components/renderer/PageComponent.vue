<script lang="ts" setup>
  import { contentStore } from '~~/store/content'
  import { Mode } from '~~/types/enums'
  import { ContentField, FormField } from '~~/types/types'
  import { getCleanComponentName } from '~~/utils'

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

  const setFields = (fieldsFromComponent: ContentField[]) => {
    if (props.mode === Mode.Back && !Object.keys(content.value).length) {
      contentStore.do.registerFields(fieldsFromComponent, props.id, props.slug)
    }
  }
</script>

<template>
  <div>
    <component
      :content="content"
      :is="getCleanComponentName(name)"
      @setFields="setFields($event)"
    />
    <div v-if="props.mode === Mode.Back">Backend of {{ id }} component</div>
  </div>
</template>
