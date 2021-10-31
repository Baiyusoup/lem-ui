import React from 'react'
import FormStoreContext from './FormStoreContext'
import FormOptionsContext, { IFormOptions } from './FormOptionsContext'
import useFieldChange from './hooks/useFieldChange'
import { getPropName, getValueFromEvent } from './util'

export interface FormFieldProps extends IFormOptions {
  className?: string
  label?: string
  name?: string
  valueProp?: string | ((type: any) => string)
  valueGetter?: (...args: any[]) => any
  suffix?: React.ReactNode
  children?: React.ReactNode
}

const classes = {
  field: 'lem-form-field ',
  inline: 'lem-form-field--inline ',
  compact: 'lem-form-field--compact ',
  required: 'lem-form-field--required ',
  error: 'lem-form-field--error ',

  header: 'lem-form-field__header',
  container: 'lem-form-field__container',
  control: 'lem-form-field__control',
  message: 'lem-form-field__message',
  footer: 'lem-form-field__footer',
}

const FormField: React.FC<FormFieldProps> = ({
  className,
  label,
  name,
  valueProp = 'value',
  valueGetter = getValueFromEvent,
  suffix,
  children,
  ...restProps
}) => {
  const store = React.useContext(FormStoreContext)
  const options = React.useContext(FormOptionsContext)
  const [value, setValue] = React.useState(
    name && store ? store.get(name) : undefined
  )
  const [error, setError] = React.useState(
    name && store ? store.error(name) : undefined
  )

  const onChange = React.useCallback(
    (...args: any[]) => name && store && store.set(name, valueGetter(...args)),
    [name, store, valueGetter]
  )

  useFieldChange(store, name, () => {
    setValue(store!.get(name))
    setError(store!.error(name!))
  })

  let child: any = children

  if (name && store && React.isValidElement(child)) {
    const prop = getPropName(valueProp, child && child.type)
    const childProps = { [prop]: value, onChange }
    child = React.cloneElement(child, childProps)
  }

  const { inline, compact, required, labelWidth, gutter, errorClassName } = {
    ...options,
    ...restProps,
  }

  const classNames = [
    classes.field,
    inline ? classes.inline : '',
    compact ? classes.compact : '',
    required ? classes.required : '',
    error ? classes.error : '',
    className ? className : '',
    error ? errorClassName : '',
  ].join('')

  const headerStyle = {
    width: labelWidth,
    marginRight: gutter,
  }

  return (
    <div className={classNames}>
      {label !== undefined && (
        <label className={classes.header} style={headerStyle}>
          {label}
        </label>
      )}
      <div className={classes.container}>
        <div className={classes.control + (label ? '' : ' lem-no-label')}>
          {child}
        </div>
        {error && <div className={classes.message}>{error}</div>}
      </div>
      {suffix !== undefined && <div className={classes.footer}>{suffix}</div>}
    </div>
  )
}

export default FormField
