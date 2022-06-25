// ui
import { DefineComponent } from "nuxt/dist/app/compat/capi"
import LazyUiButton from "~~/components/ui/Button.vue"
import LazyUiCheckbox from "~~/components/ui/Checkbox.vue"
import LazyUiContentSelect from "~~/components/ui/ContentSelect.vue"
import LazyUiFileUpload from "~~/components/ui/FileUpload.vue"
import LazyUiInput from "~~/components/ui/Input.vue"
import LazyUiMultiSelect from "~~/components/ui/MultiSelect.vue"
import LazyUiSelect from "~~/components/ui/Select.vue"

//theme
import * as snippets from "~~/theme/components/index"

import { sanitzeComponentName } from "~~/utils"

const useComponentResolvement = () => {
  const dynamicComponent = (componentName : string) => {
    const cleanComponentName = sanitzeComponentName(componentName)
    if (cleanComponentName === 'UiInput') {
      return LazyUiInput
    }

    if (cleanComponentName === 'UiButton') {
      return LazyUiButton
    }

    if (cleanComponentName === 'UiCheckbox') {
      return LazyUiCheckbox
    }

    if (cleanComponentName === 'UiContentSelect') {
      return LazyUiContentSelect
    }

    if (cleanComponentName === 'UiFileUpload') {
      return LazyUiFileUpload
    }

    if (cleanComponentName === 'UiMultiSelect') {
      return LazyUiMultiSelect
    }

    if (cleanComponentName === 'UiSelect') {
      return LazyUiSelect
    }

    const [, themeComponent] = Object.entries(snippets).find(([key, value]) => {
      if (key === sanitzeComponentName(componentName)) {
        return value
      }
    }) as [string, DefineComponent]
    return themeComponent
  }

  return {
    dynamicComponent
  }
}

export default useComponentResolvement