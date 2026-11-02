import { useMemo, useState } from 'react';
import { usePageStore } from '../../../stores/page/usePageStore';
import { classNames, renderReactNodeOrFunctionP1 } from '../../helpers';
import { useSyncedState } from '../../hooks/useSyncedState';
import { NavigateBeforeIcon, NavigateNextIcon } from '../../server';
import { MobileMenuBottom, MobileMenuTop, renderMenuItems } from '../HorizontalMenu/MenuParts';
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

  const [open, setOpen] = useSyncedState(isOpen);
  const screen = usePageStore((store) => store.viewPort.screen);
  const isSmallScreen = screen === 'sm';

  // Collapse on medium screens and expand on large ones whenever the breakpoint changes. Done during
  // render (not in effects) so the new state is applied before the first paint at that breakpoint.
  // (null: also applied on mount, like the previous effects)
  const [lastScreen, setLastScreen] = useState<string | null>(null);
  if (lastScreen !== screen) {
    setLastScreen(screen);
    if (screen === 'md') {
      setOpen(false);
    } else if (screen === 'lg' || screen === 'hg') {
      setOpen(true);
    }
  }

  const items = useMemo(
    () =>
      isSmallScreen
        ? renderMenuItems(menu, { type: 'horizontal', isSmallScreen: true })
        : renderMenuItems(menu, { type: 'vertical', open }),
    [menu, open, isSmallScreen],
  );

  const handleCollapse = () => {
    if (onToggle) {
      onToggle(!open);
    } else {
      setOpen(!open);
    }
  };

  // Same element tree on every screen size: only the header changes. The page (children) always sits in
  // the second slot, so crossing the mobile breakpoint no longer unmounts and remounts the whole page.
  return (
    <div
      className={classNames(
        'ht-100 wh-100',
        isSmallScreen ? 'jk-horizontal-menu-layout-container' : 'jk-vertical-menu-layout-container',
        { collapsed: !isSmallScreen && !open, 'viewport-pending': !screen },
      )}
    >
      {isSmallScreen ? (
        <header className="jk-menu wh-100 jk-top-horizontal-menu sticky-top">
          <MobileMenuTop
            menu={menu}
            rightMobile={rightMobile}
            centerMobile={centerMobile}
            drawerMenuMobile={drawerMenuMobile}
            onBack={onBack}
          />
        </header>
      ) : (
        <header className="jk-menu ht-100">
          <section className="jk-menu-content ht-100">
            <div className="jk-row right jk-menu-collapse-section">
              <div className="jk-row jk-menu-collapse" onClick={handleCollapse}>
                {open ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
              </div>
            </div>
            <div className="flex-2">{renderReactNodeOrFunctionP1(topSection, { isOpen: open })}</div>
            <div className={classNames('jk-menu-items jk-col gap nowrap flex-8', { stretch: open })}>
              {items}
              <div className="jk-menu-item extra" />
            </div>
            <div>{renderReactNodeOrFunctionP1(bottomSection, { isOpen: open })}</div>
          </section>
        </header>
      )}
      <section className="jk-menu-main-layout">{children}</section>
      {isSmallScreen && <MobileMenuBottom items={items} />}
    </div>
  );
}
