import classNames from 'classnames';
import React, { useState } from 'react';
import MenuContext, { IMenuContext } from './MenuContext';
import MenuItem, { MenuItemProps } from './MenuItem';
import SubMenu from './MenuSub';

type MenuMode = 'horizontal' | 'vertical';

interface BasicMenuProps {
  defaultIndex?: number;
  defaultOpenKey?: string;
  mode?: MenuMode;
  onSelect?: (selectedIndex: number) => void;
}

export type MenuProps = Partial<
  BasicMenuProps & Omit<React.AnchorHTMLAttributes<HTMLUListElement>, 'onSelect'>
>;

const InternalMenu: React.FC<MenuProps> = ({
  mode = 'horizontal',
  defaultIndex = 0,
  defaultOpenKey,
  className,
  children,
  onSelect,
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const classNameString = classNames('lem-menu', className, {
    'lem-menu--overflow': mode === 'horizontal',
    'lem-menu--vertical': mode === 'vertical',
    'lem-menu--horizontal': mode === 'horizontal',
  });

  const handleClick = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
    onSelect && onSelect(selectedIndex);
  };

  const activeIndexContext: IMenuContext = {
    mode,
    index: activeIndex,
    currentSubMenuOpenKey: defaultOpenKey,
    onSelect: handleClick,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // 自动给MenuItem添加index
        const existingIndex = childElement.props.index;
        return React.cloneElement(childElement, {
          index: existingIndex || index,
        });
      } else {
        // console.log('Warning: Menu has a child which is not a MenuItem');
        return null;
      }
    });
  };

  return (
    <ul className={classNameString} {...props}>
      <MenuContext.Provider value={activeIndexContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
};

interface MenuProp extends React.FC<MenuProps> {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
}

const Menu = InternalMenu as MenuProp;

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;

export default Menu;
