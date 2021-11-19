import classNames from 'classnames';
import React, { useState } from 'react';

export interface AsideProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  collapsedWidth?: string;
  triggerLIcon?: React.ReactNode;
  triggerRIcon?: React.ReactNode;
  onCollapse?: (collapsed: boolean) => void;
}

const Aside: React.FC<AsideProps> = ({
  children,
  className,
  collapsed = false,
  collapsible = false,
  collapsedWidth = '46px',
  width = '200px',
  triggerLIcon,
  triggerRIcon,
  style,
  onCollapse,
  ...props
}) => {
  const [collapse, setCollapse] = useState(collapsed);
  const rawWidth = collapse ? collapsedWidth : width;
  const classNameString = classNames('lem-layout-sider', className);

  const handle: React.MouseEventHandler = () => {
    setCollapse(!collapse);
    onCollapse?.(collapse);
  };

  const lIcon = triggerLIcon || '<';
  const rIcon = triggerRIcon || '>';

  const triggerStyle = {
    width: rawWidth,
  };

  const wrapStyle = {
    ...style,
    ...triggerStyle,
  };

  return (
    <aside className={classNameString} style={wrapStyle} {...props}>
      <div className="lem-layout-sider_inner">{children}</div>
      {collapsible && (
        <div onClick={handle} style={triggerStyle} className="lem-layout-sider-trigger">
          {collapse ? rIcon : lIcon}
        </div>
      )}
    </aside>
  );
};

Aside.displayName = 'Aside';

export default Aside;
