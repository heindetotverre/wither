<template>
  <div ref="contentSelect">
    <div v-for="(component, index) in componentList" :key="index">
      <button @click.prevent="removeComponent(component)">Remove component</button>
      <component
        :is="component"
        :mode="Mode.Back"
        :data="page"
        :id="createId(component, index)"
        :name="component"
        @click="triggerFieldsToFill(createId(component, index), component)"
        @sendId="triggerFieldsToFill($event, component)"
      >
        <slot></slot>
      </component>
      <div v-if="activeComponent === component">
        <RendererForm :form="contentFormToFill" />
      </div>
    </div>
    <button @click.prevent="openComponents()">Add component</button>
    <ul v-if="isComponentListOpen">
      <li
        v-for="(component, index) of options"
        :key="index"
        @click="addComponent(component as string)"
      >{{ component }}</li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { adminStore } from '~~/store/admin'
import { formStore } from '~~/store/forms';
import { Mode } from '~~/types/enums'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    required: true
  },
  autocomplete: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: 'test'
  },
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  options: {
    type: Array,
    default: []
  },
  value: {
    type: Array,
    default: ''
  },
  domclass: {
    type: String,
    default: ''
  },
  visible: {
    type: Boolean,
    default: true
  },
  validation: {
    type: Object
  }
})

const emits = defineEmits([
  'blur',
  'focus',
  'input'
])

const isComponentListOpen = ref(false),
  contentSelect = ref(),
  activeComponent = ref(),
  addContentForm = ref(),
  componentList = ref<string[]>([]),
  contentFormToFill = ref(),
  page = adminStore.get.getPages().filter(p => p.name === 'home')

const createId = (component: string, index: number) => {
  return `${component}_${index}`
}

const addComponent = (component: string) => {
  componentList.value.push(component)
  document.body.removeEventListener('click', handleClickOutside)
  isComponentListOpen.value = false
  addContentForm.value = true
}

const handleClickOutside = (event: Event) => {
  if (contentSelect.value && !contentSelect.value.contains(event.target)) {
    document.body.removeEventListener('click', handleClickOutside)
    isComponentListOpen.value = false
  }
}

const openComponents = () => {
  document.body.addEventListener('click', handleClickOutside)
  isComponentListOpen.value = true
}

const saveContent = () => {
  addContentForm.value = false
}

const triggerFieldsToFill = (event: string, component: string) => {
  activeComponent.value = component
  contentFormToFill.value = formStore.get.getDynamicFormByName(event)
}

const removeComponent = (component: string) => {
  componentList.value = componentList.value.filter(c => c !== component)
  contentFormToFill.value = false
}
</script>