import { motion } from 'motion/react';
import React, { ReactNode, useId } from 'react';
import { classNames, renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { DrawerActionsType, NONE } from '../../../types';
import { Button } from '../../atoms';
import { Drawer } from '../../molecules';
import { ArrowBackIcon, ViewHeadlineIcon } from '../../server';
import { HorizontalMenuProps } from './types';

export const HorizontalMenu = (props: HorizontalMenuProps) => {
  
  const {
    className = '',
    leftSection,
    rightSection,
    children,
    menu,
    rightMobile,
    drawerMenuMobile,
    centerMobile,
    onBack,
  } = props;
  
  const { viewPortSize } = useJukiUI();
  const withBottomMobileNav = viewPortSize === 'sm';
  const layoutId = useId();
  
  const menus = [];
  for (let i = 0; i < menu.length; i++) {
    const { selected, icon, label, onClick, menuItemWrapper } = menu[i];
    const menuItem = (
      <div
        className={classNames('jk-menu-item jk-pg-xsm jk-br-ie nowrap cr-pr', {
          'selected-up': !!menu[i - 1]?.selected,
          'selected-down': !!menu[i + 1]?.selected,
          'selected cr-pt': !!selected,
          'jk-row gap bc-pd cr-pt': !withBottomMobileNav,
          'jk-col flex-1 bottom': withBottomMobileNav,
        })}
        onClick={() => onClick?.()}
        key={i}
      >
        {icon && (
          <div className="jk-menu-item-icon jk-row" style={{ opacity: selected ? 0 : undefined }}>
            {renderReactNodeOrFunction(icon)}
          </div>
        )}
        <div className="jk-menu-item-label tx-t" style={{ opacity: selected ? 0 : undefined }}>
          {renderReactNodeOrFunction(label)}
        </div>
        {selected && (
          <motion.div
            className="jk-pg-xsm jk-br-ie bc-pl"
            style={{
              position: 'absolute',
              zIndex: 1,
            }}
            layoutId={layoutId}
          >
            <div
              className={classNames({
                'jk-row gap nowrap': !withBottomMobileNav,
                'jk-col flex-1 bottom': withBottomMobileNav,
              })}
            >
              {icon && <div className="jk-row jk-menu-item-icon">{renderReactNodeOrFunction(icon)}</div>}
              <div className="jk-menu-item-label tx-t">{renderReactNodeOrFunction(label)}</div>
            </div>
          </motion.div>
        )}
        {/*{selected && (*/}
        {/*  <motion.div*/}
        {/*    className="selected-tab-tick"*/}
        {/*    layoutId={layoutId}*/}
        {/*  />*/}
        {/*)}*/}
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
        isOpenVerticalMenu: null,
      }, i));
    } else {
      menus.push(menuItem);
    }
  }
  
  const drawerProps = {
    isOpen: false,
    onOpen: () => null,
    onClose: () => null,
    toggle: () => null,
  };
  
  return (
    <div className={classNames('jk-horizontal-menu-layout-container', className)}>
      <header className="jk-menu jk-top-horizontal-menu sticky-top">
        {!withBottomMobileNav && (
          <section className="jk-row nowrap jk-menu-content bc-pd cr-pt">
            <div className="jk-menu-left-section jk-row stretch left nowrap">
              {renderReactNodeOrFunction(leftSection)}
            </div>
            <div className="jk-menu-items jk-row gap left nowrap">
              {React.Children.toArray(menus)}
            </div>
            <div className="jk-menu-right-section jk-row stretch right nowrap">
              {renderReactNodeOrFunction(rightSection)}
            </div>
          </section>
        )}
        {withBottomMobileNav && (
          <section className="jk-row nowrap block jk-menu-content bc-pd cr-pt space-between elevation-1">
            <div className="jk-horizontal-menu-mobile-left jk-row stretch left">
              {!!drawerMenuMobile ? (
                <Drawer
                  content={props => renderReactNodeOrFunctionP1(drawerMenuMobile, { ...props, menu })}
                  position="left"
                  triggerOn={NONE}
                  closeOnOutside
                >
                  {({ onOpen }) => {
                    return (
                      <div className="jk-row sides-mobile-padding">
                        <Button size="small" onClick={onOpen} icon={<ViewHeadlineIcon />}>
                          {/*<div className="jk-row nowrap"><T>menu</T>{isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}*/}
                          {/*</div>*/}
                        </Button>
                      </div>
                    );
                  }}
                </Drawer>
              ) : onBack && (
                <div className="jk-row sides-mobile-padding">
                  <Button
                    size="small"
                    onClick={onBack}
                    icon={<ArrowBackIcon />}
                  />
                </div>
              )}
            </div>
            <div className="jk-horizontal-menu-mobile-center jk-row stretch">
              {!!centerMobile && (
                centerMobile.content ? (
                  <Drawer
                    content={props => renderReactNodeOrFunctionP1(centerMobile.content, props)}
                    position="top"
                    closeOnOutside
                  >
                    {(props: DrawerActionsType): ReactNode => renderReactNodeOrFunctionP1(centerMobile.children, props)}
                  </Drawer>
                ) : (
                  renderReactNodeOrFunctionP1(centerMobile.children, drawerProps)
                )
              )}
            </div>
            <div className="jk-horizontal-menu-mobile-right jk-row stretch right">
              {!!rightMobile && (
                rightMobile.content ? (
                  <Drawer
                    content={props => renderReactNodeOrFunctionP1(rightMobile.content, props)}
                    position="right"
                    closeOnOutside
                  >
                    {(props: DrawerActionsType): ReactNode => (
                      <div className="jk-row sides-mobile-padding stretch">
                        {renderReactNodeOrFunctionP1(rightMobile.children, props)}
                      </div>
                    )}
                  </Drawer>
                ) : (
                  <div className="jk-row sides-mobile-padding stretch">
                    {renderReactNodeOrFunctionP1(rightMobile.children, drawerProps)}
                  </div>
                )
              )}
            </div>
          </section>
        )}
      </header>
      <section className="jk-menu-main-layout">
        {children}
      </section>
      {withBottomMobileNav && (
        <section className="jk-row nowrap jk-bottom-horizontal-menu elevation-1">
          <div
            className={classNames('jk-menu-items jk-row gap nowrap', {
              left: !withBottomMobileNav,
              extend: withBottomMobileNav,
            })}
          >
            {React.Children.toArray(menus)}
          </div>
        </section>
      )}
    </div>
  );
};
