// Thank https://github.com/varHarrie/react-hero/tree/master/packages/form
import React, { FormEvent } from 'react'
import FormStore from './FormStore'
import FormStoreContext from './FormStoreContext'
import FormOptionsContext, { IFormOptions } from './FormOptionsContext'

export interface InternalFormProps extends IFormOptions {
  store: FormStore<Record<string, unknown>>
  className?: string
  children?: React.ReactNode
  onSubmit?: (e: React.FormEvent) => void
}

const Form: React.FC<InternalFormProps> = ({
  className = '',
  children,
  store,
  onSubmit,
  ...options
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit?.(e)
  }
  return (
    <FormStoreContext.Provider value={store}>
      <FormOptionsContext.Provider value={options}>
        <form className={`lem-form ${className}`} onSubmit={handleSubmit}>
          {children}
        </form>
      </FormOptionsContext.Provider>
    </FormStoreContext.Provider>
  )
}

export default Form
