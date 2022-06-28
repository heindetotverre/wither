import { Errors } from "~~/types/enums"

// ui
import { DefineComponent } from "nuxt/dist/app/compat/capi"
import LazyUiButton from "~~/components/ui/Button.vue"
import LazyUiCheckbox from "~~/components/ui/Checkbox.vue"
import LazyUiContentSelect from "~~/components/ui/ContentSelect.vue"
import LazyUiFileUSelect from "~~/components/ui/FileSelect.vue"
import LazyUiInput from "~~/components/ui/Input.vue"
import LazyUiMultiSelect from "~~/components/ui/MultiSelect.vue"
import LazyUiSelect from "~~/components/ui/Select.vue"

//theme
import * as themeComponents from "~~/theme/components/index"

import { sanitzeComponentName } from "~~/utils"

const useComponentResolvement = () => {
  const dynamicComponent = (componentName : string) => {
    try {
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
  
      if (cleanComponentName === 'UiFileSelect') {
        return LazyUiFileUSelect
      }
  
      if (cleanComponentName === 'UiMultiSelect') {
        return LazyUiMultiSelect
      }
  
      if (cleanComponentName === 'UiSelect') {
        return LazyUiSelect
      }
  
      const [, themeComponent] = Object.entries(themeComponents).find(([key, value]) => {
        if (key === sanitzeComponentName(componentName)) {
          return value
        }
      }) as [string, DefineComponent]
      return themeComponent
    } catch (error) {
      console.log(`${Errors.FE_ERROR_COMPONENT_NOTFOUND} ${componentName}. Error: ${error}`)
    }
  }

  return {
    dynamicComponent
  }
}

export default useComponentResolvement