<template>
  <div>
    <NuxtLink to="/admin/create-page" >Create a page</NuxtLink>
    <ul>
      <li v-for="(page) of flattenPages"
        :key="page">
        <p>Page Name: {{ page.name }}</p>
        <p>Page Slug: {{ page.slug }}</p>
        <p>Page MetaData: {{ page.meta }}</p>
        <p>Page Components: {{ page.components }}</p>
        <p>Menu level depth: {{ page.level }}</p>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import pagesIndex from '~~/server/resources/pagesIndex.json'
  import { flattenObject } from '~~/utils/index'

  const pages = ref(pagesIndex)

  const flattenPages = flattenObject(pages.value)
</script>