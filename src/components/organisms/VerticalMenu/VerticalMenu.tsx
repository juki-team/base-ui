import { motion } from 'motion/react';
import { Children, useId } from 'react';
import { classNames, renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useHandleState } from '../../hooks/useHandleState';
import { useJukiUI } from '../../hooks/useJukiUI';
import { NavigateBeforeIcon, NavigateNextIcon } from '../../server';
import { HorizontalMenu } from '../HorizontalMenu/HorizontalMenu';
import type { VerticalMenuProps } from './types';

export function VerticalMenu(props: VerticalMenuProps) {
  
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
  const layoutId = useId();
  
  const menus = [];
  for (let i = 0; i < menu.length; i++) {
    const { selected, icon, label, tooltipLabel, onClick, menuItemWrapper } = menu[i]!;
    const menuItem = (
      <div
        className={classNames('jk-menu-item jk-pg-xsm jk-br-ie bc-pd cr-pt cr-pr jk-row gap left', {
          selected: !!selected,
        })}
        style={{
          margin: open ? '0 var(--pad-xt)' : undefined,
        }}
        onClick={() => onClick?.(open)}
        key={i}
        data-tooltip-id="jk-tooltip"
        data-tooltip-content={!open ? tooltipLabel : ''}
        data-tooltip-place="right"
      >
        <div className="jk-menu-item-icon jk-row" style={{ opacity: selected ? 0 : undefined }}>
          {renderReactNodeOrFunction(icon)}
        </div>
        <div className="jk-menu-item-label" style={{ opacity: selected ? 0 : undefined }}>
          {renderReactNodeOrFunction(label)}
        </div>
        {!!selected && (
          <motion.div
            className="jk-pg-xsm jk-br-ie bc-pl wh-100 ht-100"
            style={{
              position: 'absolute',
              zIndex: 1,
              top: 0,
              left: 0,
            }}
            layoutId={layoutId}
          >
            <div className="jk-row gap left">
              {icon && <div className="jk-menu-item-icon jk-row">{renderReactNodeOrFunction(icon)}</div>}
              <div className="jk-menu-item-label">{renderReactNodeOrFunction(label)}</div>
            </div>
          </motion.div>
        )}
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
        <section className="jk-menu-content bc-pd cr-pt">
          {!isAlwaysClosed && (
            <div className="jk-row right jk-menu-collapse-section bc-pd cr-pt">
              <div className="jk-row jk-menu-collapse" onClick={handleCollapse}>
                {open ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
              </div>
            </div>
          )}
          <div className={classNames('jk-menu-top-section bc-pd cr-pt', { 'selected-down': !!menu[0]?.selected })}>
            {typeof topSection === 'function' ? topSection({ isOpen: open }) : topSection}
          </div>
          <div className={classNames('jk-menu-items jk-col gap nowrap', { stretch: open })}>
            {Children.toArray(menus)}
            <div className={classNames('jk-menu-item extra bc-pd cr-pt', { 'selected-up': !!menu[menu.length - 1]?.selected })} />
          </div>
          <div className={classNames('jk-menu-bottom-section bc-pd cr-pt')}>
            {typeof bottomSection === 'function' ? bottomSection({ isOpen: open }) : bottomSection}
          </div>
        </section>
      </header>
      <section className="jk-menu-main-layout">
        {children}
      </section>
    </div>
  );
}
