import React from 'react'

export interface IFormOptions {
  inline?: boolean
  compact?: boolean
  required?: boolean
  labelWidth?: number
  gutter?: number
  errorClassName?: string
}

const FormOptionsContext = React.createContext<IFormOptions>({})

export default FormOptionsContext
