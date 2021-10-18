/* eslint-disable import/no-unresolved */
import React from 'react'
import classNames from 'classnames'
import { ConfigContext } from '../config-provider'

export interface BasicProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string
  isVertical?: boolean
}

export interface GeneratorProps {
  suffixCls: string
  tagName: 'header' | 'main' | 'footer' | 'section'
  displayName: string
}

interface BasicPropsWithTagName extends BasicProps {
  tagName: 'header' | 'footer' | 'main' | 'section'
}

// 适配器模式 ？？
function generator({ suffixCls, tagName, displayName }: GeneratorProps) {
  return (BasicComponent: any) => {
    const Adapter: React.FC<BasicProps> = (props) => {
      const { getPrefixCls } = React.useContext(ConfigContext)
      const { prefixCls: customizePrefixCls } = props
      const prefixCls = getPrefixCls(suffixCls, customizePrefixCls)

      return (
        <BasicComponent prefixCls={prefixCls} tagName={tagName} {...props} />
      )
    }
    Adapter.displayName = displayName
    return Adapter
  }
}

const Basic = (props: BasicPropsWithTagName) => {
  const { prefixCls, className, tagName, children, ...resetProps } = props
  const classNameString = classNames(prefixCls, className)
  return React.createElement(
    tagName,
    { className: classNameString, ...resetProps },
    children
  )
}

const BasicLayout: React.FC<BasicPropsWithTagName> = (props) => {
  const {
    prefixCls,
    className,
    tagName: Tag,
    isVertical,
    children,
    ...resetProps
  } = props
  const classNameString = classNames(prefixCls, className, {
    'is-vertical': isVertical,
  })
  return (
    <Tag className={classNameString} {...resetProps}>
      {children}
    </Tag>
  )
}

const Layout = generator({
  suffixCls: 'layout',
  tagName: 'section',
  displayName: 'Layout',
})(BasicLayout)

const Header = generator({
  suffixCls: 'layout-header',
  tagName: 'header',
  displayName: 'Header',
})(Basic)

const Content = generator({
  suffixCls: 'layout-content',
  tagName: 'main',
  displayName: 'Content',
})(Basic)

const Footer = generator({
  suffixCls: 'layout-footer',
  tagName: 'footer',
  displayName: 'Footer',
})(Basic)

export { Header, Content, Footer }

export default Layout
