<template>
  <div>
    <p>Page with components</p>
    <p>{{ Object.keys(page).length ? page : '404' }}</p>
    <component
      v-for="component in page.components"
      :is="component">
      <slot></slot>
    </component>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    page: {
      type: Object,
      default: {}
    }
  })
</script>