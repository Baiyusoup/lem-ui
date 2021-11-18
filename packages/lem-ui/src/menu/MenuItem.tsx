import React, { useContext } from 'react';
import classNames from 'classnames';
import MenuContext from './MenuContext';

export interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  index?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ index, className, children, ...props }) => {
  const context = useContext(MenuContext);
  const classNameString = classNames('lem-menu-item', className, {
    'lem-menu-item-selected': context.index === index,
  });

  const handleClick: React.MouseEventHandler = () => {
    if (context.onSelect && typeof index === 'number') {
      context.onSelect(index);
    }
  };

  return (
    <li onClick={handleClick} className={classNameString} {...props}>
      {children}
    </li>
  );
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
