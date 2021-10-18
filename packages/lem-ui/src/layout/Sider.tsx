import classNames from 'classnames'
import React, { useEffect, useState } from 'react'

export interface AsideProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string
  collapsible?: boolean
  collapsed?: boolean
  collapsedWidth?: string
  onCollapse?: (collapsed: boolean) => void
}

const Aside: React.FC<AsideProps> = ({
  children,
  className,
  width = '200px',
  collapsed = false,
  collapsible = false,
  collapsedWidth = '80px',
  onCollapse,
  ...props
}) => {
  const [collapse, setCollapse] = useState(collapsed)
  const rawwidth = collapse ? collapsedWidth : width
  const classNameString = classNames('lem-layout-sider', className)

  const styles = {
    width: rawwidth,
  }

  useEffect(() => {
    setCollapse(collapsed)
  }, [collapsed])

  console.log(collapse)

  const handlerCollapse: React.MouseEventHandler = () => {
    onCollapse && onCollapse(!collapse)
  }

  return (
    <aside className={classNameString} style={styles} {...props}>
      <div className="lem-layout-sider-children">{children}</div>
      {collapsible && (
        <div
          onClick={handlerCollapse}
          style={{ width: rawwidth }}
          className="lem-layout-sider-trigger"
        >
          {collapse ? '>' : '<'}
        </div>
      )}
    </aside>
  )
}

Aside.displayName = 'Aside'

export default Aside
