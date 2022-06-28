<script setup lang="ts">
  import shareableProps from "./shareableProps"
  import shareableEmits from "./shareableEmits"

  const props = defineProps({...shareableProps,
      value: {
        type: [String, Number],
        default: ''
      }
    }),
    emits = defineEmits(shareableEmits)

  onMounted(() => {
    currentValue.value = props.value
  })

  watch(() => props.value, () => {
    currentValue.value = props.value
  })

  const currentValue = ref(),
    hasFocus = ref(false),
    select = ref()

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

    <ul v-if="hasFocus">
      <li
        v-for="(option, index) of options"
        class="select__option"
        :key="index"
        @click.stop.prevent="selectOption(option as string)"
      >{{ option }}</li>
      <span @click.stop.prevent="selectOption('clear')">clear</span>
    </ul>
  </div>
</template>