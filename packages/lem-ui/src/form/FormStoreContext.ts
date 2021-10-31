import React from 'react'
import FormStore from './FormStore'
const FormStoreContext = React.createContext<FormStore<any> | undefined>(
  undefined
)

export default FormStoreContext
