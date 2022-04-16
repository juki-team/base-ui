import React, { PropsWithChildren, useEffect, useState } from 'react';
import { VerticalMenuProps } from '../index';
import { DoubleArrowIcon, HorizontalMenu, T } from '../../index';
import { classNames, renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../../helpers';

export const VerticalMenu = ({
  isOpen,
  onToggle,
  topSection,
  bottomSection,
  children,
  menu,
  rightMobile,
  centerMobile,
  leftMobile,
}: PropsWithChildren<VerticalMenuProps>) => {
  
  const [open, setOpen] = useState<boolean>(isOpen || false);
  useEffect(() => {
    if (isOpen !== undefined) {
      setOpen(isOpen);
    }
  }, [isOpen]);
  
  const menus = [];
  for (let i = 0; i < menu.length; i++) {
    menus.push(
      <div
        className={classNames('jk-menu-item', {
          'selected-up': menu[i - 1]?.selected,
          'selected-down': menu[i + 1]?.selected,
          selected: menu[i].selected,
        })}
        onClick={() => menu[i].onClick(open)}
        key={i}
      >
        <div className="jk-menu-item-icon">{renderReactNodeOrFunction(menu[i].icon)}</div>
        <div className="jk-menu-item-label">{renderReactNodeOrFunction(menu[i].label)}</div>
      </div>,
    );
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
      <div className="screen md lg hg jk-vertical-menu-layout-container">
        <header className={classNames('jk-menu', { collapsed: !open })}>
          <section className="jk-menu-content">
            <div className={classNames('jk-menu-top-section')}>
              {typeof topSection === 'function' ? topSection({ isOpen: open }) : topSection}
            </div>
            <div className="jk-menu-items">
              <div className={classNames('jk-menu-item extra', { 'selected-down': menu[0]?.selected })} />
              {menus}
              <div className={classNames('jk-menu-item extra', { 'selected-up': menu[menu.length - 1]?.selected })} />
            </div>
            <div className={classNames('jk-menu-bottom-section')}>
              {typeof bottomSection === 'function' ? bottomSection({ isOpen: open }) : bottomSection}
            </div>
            <div className="jk-menu-collapse" onClick={handleCollapse}>
              <DoubleArrowIcon /><label><T>collapse sidebar</T></label>
            </div>
          </section>
        </header>
        <section className="jk-menu-main-layout jk-with-scroll">
          {children}
        </section>
      </div>
      <HorizontalMenu
        className="screen sm"
        menu={menu}
        left={() => renderReactNodeOrFunctionP1(topSection, { isOpen: open })}
        right={() => renderReactNodeOrFunctionP1(bottomSection, { isOpen: open })}
        rightMobile={rightMobile}
        centerMobile={centerMobile}
        leftMobile={leftMobile}
      >
        {children}
      </HorizontalMenu>
    </>
  );
};