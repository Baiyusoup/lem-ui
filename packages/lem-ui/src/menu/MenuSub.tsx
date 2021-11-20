import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { AnimateHeight } from './AnimateHeight';
import MenuContext from './MenuContext';
import { MenuItemProps } from './MenuItem';

export interface SubMenuProps extends React.HTMLAttributes<HTMLLIElement> {
  index?: string;
  title: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, children, ...props }) => {
  const context = useContext(MenuContext);
  const { mode, currentSubMenuOpenKey } = context;
  const [isExpand, setIsExpand] = useState(currentSubMenuOpenKey === index);

  const subMenuClassName = classNames('lem-menu-submenu', className, {
    'lem-menu-submenu--vertical': mode === 'vertical',
    'lem-menu-submenu--open': isExpand,
    'lem-menu-submenu--close': !isExpand,
  });

  const menuItemClassName = classNames('lem-menu lem-menu-submenu__inner');

  const handleClick = () => {
    setIsExpand(!isExpand);
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
    return (
      <AnimateHeight duration={200} height={isExpand ? 'auto' : 0}>
        <ul className={menuItemClassName}>{childComponent}</ul>;
      </AnimateHeight>
    );
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
