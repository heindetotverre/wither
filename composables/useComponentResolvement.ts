const useComponentResolvement = () => {
  const dynamicComponent = (componentName : string, lazy = false) => {
    if (componentName.includes('_')) {
      return resolveComponent(`${lazy ? 'Lazy' : ''}${componentName.split('_')[0]}`)
    } else {
      return resolveComponent(`${lazy ? 'Lazy' : ''}${componentName}`)
    }
  }

  return {
    dynamicComponent
  }
}

export default useComponentResolvement