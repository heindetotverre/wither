<script setup lang="ts">
  import shareableProps from "./shareableProps"
  import shareableEmits from "./shareableEmits"
  import { imageStore } from "~~/store/images";

  const props = defineProps({...shareableProps,
      value: {
        type: [String, Number],
        default: ''
      }
    }),
    emits = defineEmits(shareableEmits),
    isLoading = ref()

  onMounted(() => {
    currentValue.value = props.value
  })

  watch(() => props.value, () => {
    currentValue.value = props.value
  })

  const currentValue = ref(),
    hasFocus = ref(false),
    select = ref()

  const deleteImage = async (image : any) => {
    isLoading.value = true
    await imageStore.do.deleteImage(image.id)
    currentValue.value = ''
    isLoading.value = false
  }

  const handleClickOutside = (event: Event) => {
    if (select.value && !select.value.contains(event.target)) {
      document.body.removeEventListener('click', handleClickOutside)
      hasFocus.value = false
      emits('blur')
    }
  }

  const onFocus = () => {
    document.body.addEventListener('click', handleClickOutside)
    hasFocus.value = true
    emits('focus')
  }

  const selectOption = (option: string) => {
    currentValue.value = option === 'clear'
      ? currentValue.value
      : option
    emits('input', currentValue.value)
    hasFocus.value = false
  }
</script>

<template>
  <div :class="[domclass, 'select']" v-if="visible" ref="select">
    <slot name="label" />
    <input
      :id="id"
      :autocomplete="autocomplete"
      :class="`input__el input__el--${type}`"
      :value="currentValue"
      :type="type"
      :disabled="disabled"
      @focus="onFocus()"
    />
    <div v-if="isLoading" class="loader">LOADER!!!!</div>
    <ul v-if="hasFocus">
      <li
        v-for="(option, index) of options"
        class="select__option"
        :key="index"
        @click.stop.prevent="selectOption(option as string)"
      > 
        <div v-if="props.elementName === 'image-input'">
          <span>{{ option }}</span>
          <a @click.stop.prevent="deleteImage(option)">delete image</a>
        </div>
         <span v-else>{{ option }}</span>
      </li>
      <span @click.stop.prevent="selectOption('clear')">clear</span>
    </ul>
  </div>
</template>