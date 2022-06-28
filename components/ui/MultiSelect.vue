<script setup lang="ts">
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
    values = props.value as string[]
    currentValue.value = props.value.join(',')
  })

  watch(() => props.value, () => {
    values = props.value as string[]
    currentValue.value = props.value.join('')
  })

  const currentValue = ref(),
    hasFocus = ref(false),
    multiSelect = ref()

  let values: string[] = []

  const checkForValue = (option: string) => {
    return !!values.includes(option)
  }

  const handleClickOutside = (event: Event) => {
    if (multiSelect.value && !multiSelect.value.contains(event.target)) {
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
    values.includes(option)
      ? values = values.filter(v => v !== option)
      : values.push(option)

    currentValue.value = values.join(', ')
    emits('input', values)
  }
</script>

<template>
  <div :class="domclass" v-if="visible" ref="multiSelect">
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
    <ul v-if="hasFocus">
      <li v-for="(option, index) of options" :key="index">
        <UiCheckbox
          :id="`multiselect_${id}_${index}`"
          :name="`multiselect_${name}`"
          :value="checkForValue(option as string)"
          type="checkbox"
          :label="(option as string)"
          @input="selectOption(option as string)"
        />
      </li>
    </ul>
  </div>
</template>