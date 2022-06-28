<script setup lang="ts">
  import { EventTypes } from '~~/types/enums' 
  import shareableProps from "./shareableProps"
  import shareableEmits from "./shareableEmits"
  import LazyFileUpload from "./FileUpload.vue"
  import LazyUiSelect from "./Select.vue"
  import LazyUiButton from "./Button.vue"

  const props = defineProps({...shareableProps,
      value: {
        type: [String],
        default: ''
      }
    }),
    emits = defineEmits(shareableEmits),
    renderUpload = ref(false),
    updatedOptions = ref()

  onBeforeMount(async () => {
    updatedOptions.value = await getImagePaths('initialImages')
  })

  const onInput = (config : any) => {
    emits(config.eventType, config.eventData)
  }

  const onFilesUploaded = async () => {
    updatedOptions.value = await getImagePaths('updatedImages')
  }

  const getImagePaths = async (cacheKey : string) => {
    const { data } = await useAsyncData(cacheKey, () => $fetch('/getimages'))
    return data.value
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
      :options="updatedOptions"
      :value="props.value"
      :validation="props.validation"
      :visible="props.visible"
      @onBlur="onInput({ eventType: EventTypes.BLUR })"
      @focus="onInput({ eventType: EventTypes.FOCUS })"
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
      @filesUploaded="onFilesUploaded()"
      />
  </div>
</template>