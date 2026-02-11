import { Children, useEffect } from 'react';
import { usePageStore } from '../../../stores/page/usePageStore';
import { classNames, renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../helpers';
import { useSyncedState } from '../../hooks/useSyncedState';
import { NavigateBeforeIcon, NavigateNextIcon } from '../../server';
import { HorizontalMenu } from '../HorizontalMenu/HorizontalMenu';
import type { VerticalMenuProps } from './types';

export function VerticalMenu(props: VerticalMenuProps) {
  
  const {
    isOpen = true,
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
  
  const [ open, setOpen ] = useSyncedState(isOpen);
  const { isSmallScreen, isMediumScreen, isLargeScreen, isHugeScreen } = usePageStore(store => store.viewPort);
  
  useEffect(() => {
    if (isMediumScreen) {
      setOpen(false);
    }
  }, [ isMediumScreen, setOpen ]);
  useEffect(() => {
    if (isLargeScreen || isHugeScreen) {
      setOpen(true);
    }
  }, [ isLargeScreen, isHugeScreen, setOpen ]);
  
  const menus = [];
  for (let i = 0; i < menu.length; i++) {
    const { selected, icon, label, tooltipLabel, onClick, menuItemWrapper } = menu[i]!;
    const menuItem = (
      <div
        className={classNames('jk-menu-item jk-pg-xsm jk-br-ie cr-pr jk-row gap left', {
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
        <div className="jk-menu-item-icon jk-row">
          {renderReactNodeOrFunction(icon)}
        </div>
        <div className="jk-menu-item-label">
          {renderReactNodeOrFunction(label)}
        </div>
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
  
  return isSmallScreen ? (
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
    <div className={classNames('jk-vertical-menu-layout-container ht-100 wh-100', { collapsed: !open })}>
      <header className="jk-menu ht-100">
        <section className="jk-menu-content ht-100">
          <div className="jk-row right jk-menu-collapse-section">
            <div className="jk-row jk-menu-collapse" onClick={handleCollapse}>
              {open ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
            </div>
          </div>
          <div className="flex-2">
            {typeof topSection === 'function' ? topSection({ isOpen: open }) : topSection}
          </div>
          <div className={classNames('jk-menu-items jk-col gap nowrap flex-8', { stretch: open })}>
            {Children.toArray(menus)}
            <div className="jk-menu-item extra" />
          </div>
          <div>
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
