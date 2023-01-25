import React, { Children, PropsWithChildren } from 'react';
import { classNames, renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useHandleState } from '../../../hooks';
import { HorizontalMenu, NavigateBeforeIcon, NavigateNextIcon } from '../../index';
import { VerticalMenuProps } from '../index';

export const VerticalMenu = ({
  isOpen,
  onToggle,
  topSection,
  bottomSection,
  children,
  menu,
  rightMobile,
  centerMobile,
  drawerMenuMobile,
}: PropsWithChildren<VerticalMenuProps>) => {
  
  const [open, setOpen] = useHandleState(false, isOpen);
  
  const menus = [];
  for (let i = 0; i < menu.length; i++) {
    const menuItem = (
      <div
        className={classNames('jk-menu-item', {
          'selected-up': menu[i - 1]?.selected,
          'selected-down': menu[i + 1]?.selected,
          selected: menu[i].selected,
        })}
        onClick={() => menu[i].onClick?.(open)}
        key={i}
      >
        <div className="jk-menu-item-icon">{renderReactNodeOrFunction(menu[i].icon)}</div>
        <div className="jk-menu-item-label">{renderReactNodeOrFunction(menu[i].label)}</div>
      </div>
    );
    if (menu[i].menuItemWrapper) {
      menus.push(renderReactNodeOrFunctionP1(menu[i].menuItemWrapper, menuItem));
    } else {
      menus.push(menuItem);
    }
  }
  
  const handleCollapse = () => {
    if (onToggle) {
      onToggle?.(!open);
    } else {
      setOpen(!open);
    }
  };
  
  return (
    <>
      <div className={classNames('screen md lg hg jk-vertical-menu-layout-container', { collapsed: !open })}>
        <header className={classNames('jk-menu')}>
          <section className="jk-menu-content">
            <div className="jk-row jk-menu-collapse elevation-2" onClick={handleCollapse}>
              {open ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
            </div>
            <div className={classNames('jk-menu-top-section')}>
              {typeof topSection === 'function' ? topSection({ isOpen: open }) : topSection}
            </div>
            <div className="jk-menu-items">
              <div className={classNames('jk-menu-item extra', { 'selected-down': menu[0]?.selected })} />
              {Children.toArray(menus)}
              <div className={classNames('jk-menu-item extra', { 'selected-up': menu[menu.length - 1]?.selected })} />
            </div>
            <div className={classNames('jk-menu-bottom-section')}>
              {typeof bottomSection === 'function' ? bottomSection({ isOpen: open }) : bottomSection}
            </div>
          </section>
        </header>
        <section className="jk-menu-main-layout">
          {children}
        </section>
      </div>
      <HorizontalMenu
        className="screen sm"
        menu={menu}
        leftSection={() => renderReactNodeOrFunctionP1(topSection, { isOpen: open })}
        rightSection={() => renderReactNodeOrFunctionP1(bottomSection, { isOpen: open })}
        rightMobile={rightMobile}
        centerMobile={centerMobile}
        drawerMenuMobile={drawerMenuMobile}
      >
        {children}
      </HorizontalMenu>
    </>
  );
};
