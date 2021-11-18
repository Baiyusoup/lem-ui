import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import MenuContext from './MenuContext';
import { MenuItemProps } from './MenuItem';

export interface SubMenuProps extends React.HTMLAttributes<HTMLLIElement> {
  index?: string;
  title: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, children, ...props }) => {
  const context = useContext(MenuContext);
  const { mode, currentSubMenuOpenKey } = context;
  const [subMenuStatus, setSubMenuStatus] = useState(currentSubMenuOpenKey === index);

  const subMenuClassName = classNames('lem-menu-submenu', className, {
    'lem-menu-submenu-vertical': mode === 'vertical',
    'lem-menu-submenu-horizontal': mode === 'horizontal',
    'lem-menu-submenu-open': subMenuStatus,
  });

  const menuItemClassName = classNames('lem-menu lem-menu-sub', {
    'lem-menu-vertical': mode === 'vertical',
    'lem-menu-hidden': !subMenuStatus,
  });

  const handleClick = () => {
    setSubMenuStatus(!subMenuStatus);
  };

  const renderChildren = () => {
    const childComponent = React.Children.map(children, (child) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === 'MenuItem') {
        return childElement;
      } else {
        return null;
      }
    });
    return <ul className={menuItemClassName}>{childComponent}</ul>;
  };

  return (
    <li className={subMenuClassName} {...props}>
      <div onClick={handleClick} className="lem-menu-submenu-title">
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
