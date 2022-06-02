<script setup lang="ts">
  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
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
    'click'
  ])

  const isDisabled = ref(true)

  onMounted(() => {
    isDisabled.value = props.disabled
  })

  watch(() => props.disabled, () => {
    isDisabled.value = props.disabled
  })

  const handleClick = () => {
    emits('click')
  }
</script>

<template>
  <div v-if="visible">
    <button @click.prevent="handleClick()" :disabled="isDisabled">{{ label }}</button>
  </div>
</template>