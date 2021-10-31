import React from 'react'
import FormStoreContext from './FormStoreContext'
import useFieldChange from './hooks/useFieldChange'
import { getPropName, getValueFromEvent } from './util'

export interface FormItemProps {
  name?: string
  valueProp?: string | ((type: any) => string)
  valueGetter?: (...args: any[]) => any
  children?: React.ReactNode
}

const FormItem: React.FC<FormItemProps> = ({
  name,
  valueProp = 'value',
  valueGetter = getValueFromEvent,
  children,
}) => {
  const store = React.useContext(FormStoreContext)
  const [value, setValue] = React.useState(
    name && store ? store.get(name) : undefined
  )

  const onChange = React.useCallback(
    (...args: any[]) => name && store && store.set(name, valueGetter(...args)),
    [name, store, valueGetter]
  )

  useFieldChange(store, name, () => {
    setValue(store!.get(name))
  })

  let child: any = children

  if (name && store && React.isValidElement(child)) {
    const prop = getPropName(valueProp, child && child.type)
    const childProps = { [prop]: value, onChange }
    child = React.cloneElement(child, childProps)
  }

  return child
}

export default FormItem
