const validators = {
  slug: (input: string) => {
    return !!(input.charAt(0) === '/')
  }
}

export default validators