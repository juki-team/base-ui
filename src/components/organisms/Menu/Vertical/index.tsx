import React, { Children, PropsWithChildren } from 'react';
import { classNames, renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../../../helpers';
import { useHandleState, useJukiUI } from '../../../../hooks';
import { NavigateBeforeIcon, NavigateNextIcon } from '../../../atoms';
import { HorizontalMenu } from '../Horizontal';
import { VerticalMenuProps } from '../types';

export const VerticalMenu = (props: PropsWithChildren<VerticalMenuProps>) => {
  
  const {
    isOpen,
    onToggle,
    topSection,
    bottomSection,
    children,
    menu,
    rightMobile,
    centerMobile,
    drawerMenuMobile,
  } = props;
  
  const [ open, setOpen ] = useHandleState(true, isOpen);
  const { viewPortSize } = useJukiUI();
  const menus = [];
  for (let i = 0; i < menu.length; i++) {
    const { selected, icon, label, onClick, menuItemWrapper } = menu[i];
    const menuItem = (
      <div
        className={classNames('jk-menu-item', {
          'selected-up': menu[i - 1]?.selected,
          'selected-down': menu[i + 1]?.selected,
          selected: selected,
        })}
        onClick={() => onClick?.(open)}
        key={i}
      >
        <div className="jk-menu-item-icon">{renderReactNodeOrFunction(icon)}</div>
        <div className="jk-menu-item-label">{renderReactNodeOrFunction(label)}</div>
      </div>
    );
    if (menuItemWrapper) {
      menus.push(renderReactNodeOrFunctionP1(menuItemWrapper, {
        selected,
        icon,
        label,
        onClick,
        children: menuItem,
        index: i,
        isOpenVerticalMenu: open,
      }));
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
  
  return viewPortSize === 'sm' ? (
    <HorizontalMenu
      menu={menu}
      leftSection={() => renderReactNodeOrFunctionP1(topSection, { isOpen: open })}
      rightSection={() => renderReactNodeOrFunctionP1(bottomSection, { isOpen: open })}
      rightMobile={rightMobile}
      centerMobile={centerMobile}
      drawerMenuMobile={drawerMenuMobile}
    >
      {children}
    </HorizontalMenu>
  ) : (
    <div className={classNames('jk-vertical-menu-layout-container', { collapsed: !open })}>
      <header className={classNames('jk-menu')}>
        <section className="jk-menu-content">
          <div className="jk-row right jk-menu-collapse-section">
            <div className="jk-row jk-menu-collapse" onClick={handleCollapse}>
              {open ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
            </div>
          </div>
          <div className={classNames('jk-menu-top-section')}>
            {typeof topSection === 'function' ? topSection({ isOpen: open }) : topSection}
          </div>
          <div className="jk-menu-items">
            <div className={classNames('jk-menu-item extra', { 'selected-down': menu[0]?.selected })} />
            {Children.toArray(menus)}
            <div
              className={classNames('jk-menu-item extra', { 'selected-up': menu[menu.length - 1]?.selected })}
            />
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
  );
};
