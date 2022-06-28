<script lang="ts" setup>
  import { formStore } from '~~/store/forms'
  import { changeArrayPos, createId, sanitzeComponentName } from '~~/utils'
  import { Mode, Sort } from '~~/types/enums'
  import LazyRendererForm from "~~/components/renderer/Form.vue"
  import shareableProps from "./shareableProps"
  import shareableEmits from "./shareableEmits"

  const props = defineProps({...shareableProps, 
      value: {
        type: Array,
        required: true
      }
    }),
    emits = defineEmits(shareableEmits)

  onMounted(() => {
    componentList.value = props.value as string[]
  })

  watch(() => props.value, () => {
    componentList.value = props.value as string[]
  })

  const isComponentListOpen = ref(false),
    contentSelect = ref(),
    activeComponent = ref(),
    componentList = ref<string[]>([]),
    contentFormToFill = ref()

  const addComponent = (component: string) => {
    componentList.value.push(component)
    isComponentListOpen.value = false
    emits('input', componentList.value)
  }

  const getSlug = () => {
    return formStore.get.getSpecificFormValue('createPage', 'slug') || 'noSlugCreatedYet'
  }

  const handleClickOutside = (event: Event) => {
    if (contentSelect.value && !contentSelect.value.contains(event.target)) {
      document.body.removeEventListener('click', handleClickOutside)
      activeComponent.value = null
      isComponentListOpen.value = false
    }
  }

  const openComponents = () => {
    document.body.addEventListener('click', handleClickOutside)
    isComponentListOpen.value = true
  }

  const triggerFieldsToFill = (id: string) => {
    document.body.addEventListener('click', handleClickOutside)
    activeComponent.value = id
    contentFormToFill.value = formStore.get.getDynamicFormById(id)
  }

  const removeComponent = (component: string) => {
    componentList.value = componentList.value.filter(c => c !== component)
    contentFormToFill.value = null
    emits('input', componentList.value)
  }

  const sortComponent = (component: string, direction: number) => {
    componentList.value = changeArrayPos(componentList.value, component, direction)
  }
</script>

<template>
  <div ref="contentSelect">
    <div v-for="(component, index) in componentList" :key="index">
      <button @click.prevent="removeComponent(component)">Remove component</button>
      <button
        :disabled="componentList.indexOf(component) === 0"
        @click.prevent="sortComponent(component, Sort.Up)"
      >Move component up</button>
      <button
        :disabled="componentList.indexOf(component) === componentList.length - 1"
        @click.prevent="sortComponent(component, Sort.Down)"
      >Move component down</button>
      <RendererPageComponent
        :mode="Mode.Back"
        :slug="getSlug()"
        :name="component"
        :id="component"
        @triggerFieldsToFill="triggerFieldsToFill(component)"
      />
      <div v-if="activeComponent === component">
        <LazyRendererForm :form="contentFormToFill" />
      </div>
    </div>
    <button @click.prevent="openComponents()">Add component</button>
    <ul v-if="isComponentListOpen">
      <li
        v-for="(component, index) of options"
        :key="index"
        @click="addComponent(createId(component as string))"
      >{{ sanitzeComponentName(component as string, { replace: 'Lazy' }) }}</li>
    </ul>
  </div>
</template>