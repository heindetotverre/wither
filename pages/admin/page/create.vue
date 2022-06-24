<script setup lang="ts">
  import { formStore } from '~~/store/forms'
  import { adminStore } from '~~/store/admin'
  import { FormEvent, Page } from '~~/types/types'
  import { AdminPath } from '~~/types/enums'

  definePageMeta({
    layout: 'admin'
  })

  const response = ref(),
    createPageForm = ref(formStore.get.getCreatePageForm()),
    formName = createPageForm.value.formInfo.name,
    query = useRoute().query

  onBeforeMount(() => {
    setFormValues()
  })

  const checkValuesAndSetForm = () => {
    const fieldsToUpdate = createPageForm.value.fields.filter(f => f.key === 'isInMenu' || f.key === 'pageMenuParent')
    fieldsToUpdate.forEach(field => {
      onInput({ name: formName, key: field.key, property: 'value', value: field.value })
    })
  }

  const createPage = async (formSubmitEvent: Page) => {
    response.value = await adminStore.do.setPage(formSubmitEvent)
    if (response.value?.createPage) {
      useRouter().push(`/admin/${AdminPath.Pages}/${AdminPath.Management}`)
    }
  }

  const onInput = (event: FormEvent) => {
    if (event.key === 'isInMenu') {
      formStore.do.updateSpecificFormValues({ name: formName, key: 'pageMenuParent', property: 'visible', value: true })
    }
    if (event.key === 'pageMenuParent' && event.value !== '') {
      formStore.do.updateSpecificFormValues({ name: formName, key: 'pageMenuOrder', property: 'visible', value: true })
    }
    if (event.key === 'isInMenu' && !event.value) {
      formStore.do.updateSpecificFormValues({ name: formName, key: 'pageMenuOrder', property: 'visible', value: false })
      formStore.do.updateSpecificFormValues({ name: formName, key: 'pageMenuParent', property: 'visible', value: false })
      formStore.do.updateSpecificFormValues({ name: formName, key: 'pageMenuOrder', property: 'value', value: 0 })
      formStore.do.updateSpecificFormValues({ name: formName, key: 'pageMenuParent', property: 'value', value: '' })
    }
  }

  const setFormValues = () => {
    if (Object.keys(query).length) {
      const page = adminStore.get.getPages().find(p => p.id === query.pageid)
      if (page) {
        formStore.do.setFormValuesBasedOnQuery('createPage', page)
      }
    }
    checkValuesAndSetForm()
  }
</script>

<template>
  <div class="page-create absolute--center b-r-t-1 b-r-b-3 p-3">
    <UtilsAnimation
      :animateTargets="['height']"
    >
      <div>
        <p>{{ Object.keys(query).length ? 'Edit page' : 'Create page' }}</p>
        <RendererMultiForm
          :form="createPageForm"
          @inputField="onInput($event)"
          @submit="createPage($event)"
        />
      </div>
      <NuxtLink :to="`/${AdminPath.Admin}/${AdminPath.Pages}/${AdminPath.Management}`">Cancel</NuxtLink>
      <div v-if="response">{{ response }}</div>
    </UtilsAnimation>
  </div>
</template>

<style lang="scss" scoped>
  .page-create {
      @include box-shadow-1;
      background-color: $feather-grey;
      max-height: 80vh;
      overflow: auto;
      width: 300px;

      @include breakpoint($m) {
        width: 600px;
      }

      @include breakpoint($l) {
        width: 900px;
      }
  }
</style>