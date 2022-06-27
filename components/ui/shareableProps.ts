export default {
  disabled: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    required: true
  },
  autocomplete: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: 'test'
  },
  type: {
    type: String,
    default: 'text'
  },
  options: {
    type: Array,
    default: []
  },
  value: {
    type: String,
    default: ''
  },
  domclass: {
    type: String,
    default: ''
  },
  validation: {
    type: Object,
    required: true
  },
  visible: {
    type: Boolean,
    default: true
  }
}