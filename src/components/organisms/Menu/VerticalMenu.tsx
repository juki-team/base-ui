import React, { Children } from 'react';
import { classNames, renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useHandleState, useJukiUI } from '../../../hooks';
import { NavigateBeforeIcon, NavigateNextIcon } from '../../server';
import { HorizontalMenu } from './HorizontalMenu';
import { VerticalMenuProps } from './types';

export const VerticalMenu = (props: VerticalMenuProps) => {
  
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
    onBack,
  } = props;
  
  const [ _open, setOpen ] = useHandleState(true, isOpen);
  const { viewPortSize } = useJukiUI();
  const isAlwaysClosed = viewPortSize === 'md';
  const open = isAlwaysClosed ? false : _open;
  
  const menus = [];
  for (let i = 0; i < menu.length; i++) {
    const { selected, icon, label, tooltipLabel, onClick, menuItemWrapper } = menu[i];
    const menuItemContent = (
      <div
        className={classNames('jk-menu-item', {
          'selected-up': !!menu[i - 1]?.selected,
          'selected-down': !!menu[i + 1]?.selected,
          selected: !!selected,
        })}
        onClick={() => onClick?.(open)}
        key={i}
        data-tooltip-id="jk-tooltip"
        data-tooltip-content={!open ? tooltipLabel : ''}
        data-tooltip-place="right"
      >
        <div className="jk-menu-item-icon">{renderReactNodeOrFunction(icon)}</div>
        <div className="jk-menu-item-label">{renderReactNodeOrFunction(label)}</div>
      </div>
    );
    // const menuItem = open ? menuItemContent : (
    //   <Popover
    //     content={<div className="tt-ce jk-pg-sm">{renderReactNodeOrFunction(label)}</div>}
    //     placement="right"
    //     showPopperArrow
    //     key={i}
    //   >
    //     {menuItemContent}
    //   </Popover>
    // );
    const menuItem = menuItemContent;
    if (menuItemWrapper) {
      menus.push(renderReactNodeOrFunctionP1(menuItemWrapper, {
        selected,
        icon,
        label,
        onClick,
        children: menuItem,
        index: i,
        isOpenVerticalMenu: open,
      }, i));
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
      onBack={onBack}
    >
      {children}
    </HorizontalMenu>
  ) : (
    <div className={classNames('jk-vertical-menu-layout-container', { collapsed: !open })}>
      <header className={classNames('jk-menu')}>
        <section className="jk-menu-content">
          {!isAlwaysClosed && (
            <div className="jk-row right jk-menu-collapse-section">
              <div className="jk-row jk-menu-collapse" onClick={handleCollapse}>
                {open ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
              </div>
            </div>
          )}
          <div className={classNames('jk-menu-top-section', { 'selected-down': !!menu[0]?.selected })}>
            {typeof topSection === 'function' ? topSection({ isOpen: open }) : topSection}
          </div>
          <div className="jk-menu-items">
            {Children.toArray(menus)}
            <div className={classNames('jk-menu-item extra', { 'selected-up': !!menu[menu.length - 1]?.selected })} />
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
