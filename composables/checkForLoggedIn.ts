import { useState } from '#app'

export default () => {
  return useState<boolean>('userIsLoggedIn', () => {
    
    return false
  })
}