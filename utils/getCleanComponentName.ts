export const getCleanComponentName = (componentName : string) => {
  if (componentName.includes('_')) {
    return resolveComponent(`${componentName.split('_')[0]}`)
  } else {
    return resolveComponent(`${componentName}`)
  }
}