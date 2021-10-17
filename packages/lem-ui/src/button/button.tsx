/* eslint-disable @typescript-eslint/restrict-template-expressions */
import classNames from 'classnames'
import React from 'react'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> &
  BaseButtonProps
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> &
  BaseButtonProps

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

interface BaseButtonProps {
  btnType?: ButtonType
  className?: string
  disabled?: boolean
  size?: ButtonSize
  children: React.ReactNode
  href?: string
}

const Button: React.FC<ButtonProps> = function Button(props) {
  const { btnType, disabled, size, className, href, children } = props
  const classes = classNames('lem-btn', className, {
    [`lem-btn-${btnType}`]: btnType,
    [`lem-btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  })

  if (btnType === ButtonType.Link && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
}

export default Button
