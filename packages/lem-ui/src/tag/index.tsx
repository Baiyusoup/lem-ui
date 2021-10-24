import React from 'react'
import classNames from 'classnames'

const presetColor = ['success', 'warning', 'error', 'default']

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon?: React.ReactNode
  color?: string
}

const InternalTag: React.ForwardRefRenderFunction<HTMLSpanElement, TagProps> = (
  // eslint-disable-next-line react/prop-types
  { icon, color = 'default', className, style, children, ...reset },
  ref
) => {
  const iconNode = icon || null
  const tagRef = ref || React.createRef<HTMLSpanElement>()
  const isPresetColor = presetColor.includes(color)
  const tagStyle = {
    backgroundColor: color && !isPresetColor ? color : undefined,
    ...style,
  }

  const tagClassName = classNames('lem-tag', className, {
    [`lem-tag-${color}`]: color && isPresetColor,
    'lem-tag-has-color': color && !isPresetColor,
  })

  return (
    <span {...reset} ref={tagRef} className={tagClassName} style={tagStyle}>
      {iconNode}
      <span>{children}</span>
    </span>
  )
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(InternalTag)
Tag.displayName = 'Tag'

export default Tag
