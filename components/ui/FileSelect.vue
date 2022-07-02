<script setup lang="ts">
  import { Errors, EventTypes } from '~~/types/enums' 
  import shareableProps from "./shareableProps"
  import shareableEmits from "./shareableEmits"
  import LazyFileUpload from "./FileUpload.vue"
  import LazyUiSelect from "./Select.vue"
  import LazyUiButton from "./Button.vue"
  import { fileStore } from '~~/store/files'

  const props = defineProps({...shareableProps,
      value: {
        type: [String],
        default: ''
      }
    }),
    emits = defineEmits(shareableEmits),
    renderUpload = ref(false),
    files = computed(() => fileStore.get.getFiles())

  onBeforeMount(async () => {
    await fileStore.get.fetchAllFileMeta()
  })

  const onInput = (event : { eventType: string, eventData: any | null }) => {
    emits(event.eventType, event.eventData?.fileName)
  }

</script>

<template>
  <div class="input__wrapper">
    <slot name="label" />
    <LazyUiSelect
      v-if="!renderUpload"
      :domclass="[props.domclass, props.elementName].join(' ')"
      :is="'LazyUiSelect'"
      :autocomplete="props.autocomplete"
      :elementName="props.elementName"
      :id="`FileSelect_${props.id}`"
      :label="$content(`global.forms.labels.selectImage`)"
      name="FileSelect"
      type="select"
      :options="files"
      :value="props.value"
      :validation="props.validation"
      :visible="props.visible"
      @onBlur="onInput({ eventType: EventTypes.BLUR, eventData: null })"
      @focus="onInput({ eventType: EventTypes.FOCUS, eventData: null })"
      @input="onInput({ eventType: EventTypes.INPUT, eventData: $event })" />
    <LazyUiButton
      class="m-t-1"
      :label="!renderUpload
      ? $content('global.forms.buttons.fileUpload')
      : $content('global.forms.buttons.fileSelect')"
      @click="renderUpload = !renderUpload"/>
    <LazyFileUpload v-if="renderUpload"
      :id="`FileUpload_${props.id}`"
      elementName="LazyFileUpload"
      :label="$content('global.forms.labels.fileUpload')"
      name="FileUpload"
      type="file"
      :validation="props.validation"
      />
  </div>
</template>