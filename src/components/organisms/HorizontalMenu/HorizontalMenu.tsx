import { useMemo } from 'react';
import { usePageStore } from '../../../stores/page/usePageStore';
import { classNames, renderReactNodeOrFunction } from '../../helpers';
import { MobileMenuBottom, MobileMenuTop, renderMenuItems } from './MenuParts';
import type { HorizontalMenuProps } from './types';

export function HorizontalMenu(props: HorizontalMenuProps) {
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

  const isSmallScreen = usePageStore((store) => store.viewPort.isSmallScreen);

  const items = useMemo(() => renderMenuItems(menu, { type: 'horizontal', isSmallScreen }), [menu, isSmallScreen]);

  // the page (children) always sits in the second slot, so switching to/from mobile never remounts it
  return (
    <div className={classNames('jk-horizontal-menu-layout-container ht-100 wh-100', className)}>
      <header className="jk-menu wh-100 jk-top-horizontal-menu sticky-top">
        {isSmallScreen ? (
          <MobileMenuTop
            menu={menu}
            rightMobile={rightMobile}
            centerMobile={centerMobile}
            drawerMenuMobile={drawerMenuMobile}
            onBack={onBack}
          />
        ) : (
          <section className="jk-row nowrap jk-menu-content wh-100 pn-re">
            <div className="jk-menu-left-section jk-row stretch left nowrap">{renderReactNodeOrFunction(leftSection)}</div>
            <div className="jk-menu-items flex-1 jk-row gap left nowrap">{items}</div>
            <div className="jk-menu-right-section jk-row stretch right nowrap">{renderReactNodeOrFunction(rightSection)}</div>
          </section>
        )}
      </header>
      <section className="jk-menu-main-layout">{children}</section>
      {isSmallScreen && <MobileMenuBottom items={items} />}
    </div>
  );
}
