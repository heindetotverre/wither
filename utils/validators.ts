const validators = {
  email: (input: string) => {
    return !!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input)
  },
  notempty: (input: string) => {
    return !!input
  },
  slug: (input: string) => {
    if (input) {
      return !!(input.charAt(0) === '/')
    } else {
      return false
    }
  },
  novalidator: (input: string) => {
    return true
  }
}

export default validators