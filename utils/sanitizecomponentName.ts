export const sanitzeComponentName = (componentName: string, config: { replace : string } | void) => {
  if (config?.replace) {
    return componentName?.replace(config.replace, '')
  }
  if (componentName.includes('_')) {
    const sanitizedName = componentName.split('_')[0]
    return sanitizedName
  }
  return componentName
}