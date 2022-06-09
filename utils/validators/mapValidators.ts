import validators from '~~/utils/validators'
import { Validators } from '~~/types/types'

export const mapValidators = (validatorName : keyof Validators) => {
  return validators[validatorName]
}