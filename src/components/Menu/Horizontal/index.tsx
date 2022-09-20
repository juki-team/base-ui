import React, { PropsWithChildren, ReactNode } from 'react';
import { classNames, renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { NONE } from '../../../types';
import { Drawer, DrawerActionsType } from '../../index';
import { HorizontalMenuProps } from '../types';

export const HorizontalMenu = ({
  className = '',
  leftSection,
  rightSection,
  children,
  menu,
  rightMobile,
  leftMobile,
  centerMobile,
}: PropsWithChildren<HorizontalMenuProps>) => {
  
  const menus = [];
  for (let i = 0; i < menu.length; i++) {
    const menuItem = (
      <div
        className={classNames('jk-menu-item jk-row gap nowrap', {
          'selected-up': menu[i - 1]?.selected,
          'selected-down': menu[i + 1]?.selected,
          selected: menu[i].selected,
        })}
        onClick={() => menu[i].onClick?.()}
        key={i}
      >
        {menu[i].icon && <div className="jk-menu-item-icon">{renderReactNodeOrFunction(menu[i].icon)}</div>}
        <div className="jk-menu-item-label">{renderReactNodeOrFunction(menu[i].label)}</div>
      </div>
    );
    if (menu[i].menuItemWrapper) {
      menus.push(renderReactNodeOrFunctionP1(menu[i].menuItemWrapper, menuItem));
    } else {
      menus.push(menuItem);
    }
  }
  
  return (
    <div className={classNames('jk-horizontal-menu-layout-container', className)}>
      <header className={classNames('jk-menu jk-top-horizontal-menu')}>
        <section className="jk-row nowrap jk-menu-content screen md lg hg">
          <div className={classNames('jk-menu-left-section jk-row left nowrap')}>
            {renderReactNodeOrFunction(leftSection)}
          </div>
          <div className="jk-menu-items jk-row left gap nowrap">
            {menus}
          </div>
          <div className={classNames('jk-menu-right-section jk-row right nowrap')}>
            {renderReactNodeOrFunction(rightSection)}
          </div>
        </section>
        <section className="jk-row nowrap block jk-menu-content space-between screen sm">
          <div className={classNames('jk-horizontal-menu-mobile-right jk-row left')}>
            {leftMobile && (
              <Drawer
                content={props => renderReactNodeOrFunctionP1(leftMobile.content, props)}
                position="left"
                closeIcon={false}
                triggerOn={typeof leftMobile.children === 'function' ? NONE : undefined}
                closeOnOutside
              >
                {(props: DrawerActionsType): ReactNode => renderReactNodeOrFunctionP1(leftMobile.children, props)}
              </Drawer>
            )}
          </div>
          <div className={classNames('jk-horizontal-menu-mobile-right jk-row')}>
            {centerMobile && (
              <Drawer
                content={props => renderReactNodeOrFunctionP1(centerMobile.content, props)}
                position="top"
                closeIcon={false}
                triggerOn={typeof centerMobile.children === 'function' ? NONE : undefined}
                closeOnOutside
              >
                {(props: DrawerActionsType): ReactNode => renderReactNodeOrFunctionP1(centerMobile.children, props)}
              </Drawer>
            )}
          </div>
          <div className={classNames('jk-horizontal-menu-mobile-right jk-row right')}>
            {rightMobile && (
              <Drawer
                content={props => renderReactNodeOrFunctionP1(rightMobile.content, props)}
                position="right"
                closeIcon={false}
                triggerOn={typeof rightMobile.children === 'function' ? NONE : undefined}
                closeOnOutside
              >
                {(props: DrawerActionsType): ReactNode => renderReactNodeOrFunctionP1(rightMobile.children, props)}
              </Drawer>
            )}
          </div>
        </section>
      </header>
      <section className="jk-menu-main-layout">
        {children}
      </section>
      <header className={classNames('jk-menu jk-mobile-bottom-horizontal-menu')}>
        <section className="jk-row jk-menu-content">
          <div className="jk-menu-items jk-row left gap">
            {menus}
          </div>
        </section>
      </header>
    </div>
  );
};
