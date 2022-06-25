export const sanitzeComponentName = (componentName: string) => {
  if (componentName.includes('_')) {
    const sanitizedName = componentName.split('_')[0]
    return sanitizedName
  }
  return componentName
}