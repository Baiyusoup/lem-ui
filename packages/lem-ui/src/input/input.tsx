/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React, { createRef } from 'react'
import classNames from 'classnames'
import { IconType } from '@/utils/type'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  prefix?: IconType
  suffix?: IconType
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>
}

const InternalInput: React.ForwardRefRenderFunction<HTMLElement, InputProps> = (
  {
    prefix,
    suffix,
    className,
    style,
    onPressEnter,
    onChange,
    children,
    ...rest
  },
  ref
) => {
  const onlyInput = prefix === undefined && suffix === undefined
  const inputRef = (ref as any) || createRef<HTMLInputElement>()

  const handleKeyup: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      onPressEnter?.(e)
    }
  }

  const renderBasicInput = () => {
    return (
      <input
        className={classNames('lem-input', onlyInput ? className : {})}
        style={onlyInput ? style : undefined}
        ref={inputRef}
        type="text"
        onKeyUp={handleKeyup}
        onChange={onChange}
        {...rest}
      />
    )
  }

  if (onlyInput) {
    return renderBasicInput()
  }

  const Icon = (prefix ? prefix : suffix) as IconType
  return (
    <span
      className={classNames('lem-input-affix-wrapper', className)}
      style={style}
    >
      {prefix ? (
        <span className="lem-input-prefix">
          <Icon />
        </span>
      ) : null}
      {children}
      {renderBasicInput()}
      {suffix ? (
        <span className="lem-input-suffix">
          <Icon />
        </span>
      ) : null}
    </span>
  )
}

const Input = React.forwardRef<HTMLElement, InputProps>(InternalInput)

export default Input
